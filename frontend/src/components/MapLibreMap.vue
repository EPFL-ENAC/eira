<script setup lang="ts">
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import "maplibre-gl/dist/maplibre-gl.css";

import { geocoderApi } from "@/utils/geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";

import {
  area,
  bbox,
  intersect,
  union,
  type Feature,
  type MultiPolygon,
  type Polygon,
} from "@turf/turf";
import * as maplibregl from "maplibre-gl";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  NavigationControl,
  Popup,
  ScaleControl,
  setWorkerUrl,
  type IControl,
  type LngLatBoundsLike,
  type LngLatLike,
  type MapEventType,
  type StyleSpecification,
} from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { onMounted, ref, watch } from "vue";

// maplibre-gl 6 loads its worker from a separate file, Vite must give its URL.
setWorkerUrl(workerUrl);

// mapbox-gl-draw still uses the old mapboxgl-* class names, MapLibre removed them in v3.
// MapboxDraw.constants exists at run time but is not in @types/mapbox__mapbox-gl-draw.
const drawClasses = (
  MapboxDraw as unknown as { constants: { classes: Record<string, string> } }
).constants.classes;
drawClasses.CANVAS = "maplibregl-canvas";
drawClasses.CONTROL_BASE = "maplibregl-ctrl";
drawClasses.CONTROL_PREFIX = "maplibregl-ctrl-";
drawClasses.CONTROL_GROUP = "maplibregl-ctrl-group";
drawClasses.ATTRIBUTION = "maplibregl-ctrl-attrib";

defineExpose({ drawPolygon, drawTrash });

const mapContainer = ref<HTMLElement | null>(null);

const props = withDefaults(
  defineProps<{
    styleSpec: string | StyleSpecification;
    center?: [number, number];
    zoom?: number;
    aspectRatio?: number;
    minZoom?: number;
    maxZoom?: number;
    bounds?: LngLatBoundsLike;
    filterIds?: string[];
    popupLayerIds?: string[];
    areaLayerIds?: string[];
    extended?: boolean;
  }>(),
  {
    center: () => [0, 0],
    zoom: 10,
    aspectRatio: undefined,
    minZoom: undefined,
    maxZoom: undefined,
    filterIds: undefined,
    bounds: undefined,
    extended: true,
    popupLayerIds: () => [],
    areaLayerIds: () => [],
  }
);
const emit = defineEmits<{
  (e: "update:area", value: number): void;
  (e: "update:totalArea", value: number): void;
}>();

const loading = ref(false);
let map: Map | undefined = undefined;
let draw: MapboxDraw | undefined = undefined;

onMounted(() => {
  map = new Map({
    container: mapContainer.value as HTMLElement,
    center: props.bounds ? undefined : [props.center[1], props.center[0]],
    bounds: props.bounds,
    style: props.styleSpec,
    trackResize: true,
    zoom: props.zoom,
  });

  map.addControl(new NavigationControl({}));
  map.addControl(new ScaleControl({}));
  draw = new MapboxDraw({
    displayControlsDefault: false,
  });

  if (props.extended) {
    map.addControl(new GeolocateControl({}));
    map.addControl(new FullscreenControl({}));
    map.addControl(draw as unknown as IControl);
    map.addControl(
      new MaplibreGeocoder(geocoderApi, {
        maplibregl,
        showResultsWhileTyping: true,
      }),
      "top-left"
    );
  }

  map.once("load", () => {
    filterLayer(props.filterIds);
  });
  // The draw.* events are not in the typed MapLibre event list.
  map.on("draw.create" as keyof MapEventType, updateArea);
  map.on("draw.delete" as keyof MapEventType, updateArea);
  map.on("draw.update" as keyof MapEventType, updateArea);

  props.popupLayerIds.forEach((layerId) => {
    const popup = new Popup({
      closeButton: false,
      closeOnClick: false,
    });
    map?.on("mouseenter", layerId, function (e) {
      if (map) {
        map.getCanvas().style.cursor = "pointer";
        popup
          .setLngLat(e.lngLat)
          .setHTML(
            Object.entries(e.features?.at(0)?.properties ?? {})
              .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
              .join("<br>")
          )
          .addTo(map);
      }
    });
    map?.on("mouseleave", layerId, function () {
      if (map) {
        map.getCanvas().style.cursor = "";
      }
      popup.remove();
    });
  });

  function updateArea() {
    const { area, totalArea } = getArea();
    emit("update:area", area);
    emit("update:totalArea", totalArea);
  }

  function getArea(): {
    area: number;
    totalArea: number;
  } {
    if (!map) {
      return {
        area: 0,
        totalArea: 0,
      };
    }
    const selectedFeatures = draw?.getAll().features as Feature<
      Polygon | MultiPolygon
    >[];
    if (selectedFeatures.length === 0) {
      return {
        area: 0,
        totalArea: 0,
      };
    }

    const selectedFeature = selectedFeatures.reduce(
      (f1, f2) => union(f1, f2) as Feature<Polygon | MultiPolygon>
    );

    const totalArea = area(selectedFeature);

    if (props.areaLayerIds.length === 0) {
      return {
        area: 0,
        totalArea: totalArea,
      };
    }

    const boundingBox = bbox(selectedFeature);
    const southWest: LngLatLike = [boundingBox[0], boundingBox[1]];
    const northEast: LngLatLike = [boundingBox[2], boundingBox[3]];
    const features = map.queryRenderedFeatures(
      [map.project(southWest), map.project(northEast)],
      {
        layers: props.areaLayerIds,
      }
    ) as Feature<Polygon | MultiPolygon>[];

    if (features.length === 0) {
      return {
        area: 0,
        totalArea: totalArea,
      };
    }

    const feature = features.reduce(
      (f1, f2) => union(f1, f2) as Feature<Polygon | MultiPolygon>
    );
    const intersection = intersect(selectedFeature, feature);
    return {
      area: intersection ? area(intersection) : 0,
      totalArea: totalArea,
    };
  }
});

watch(
  () => props.filterIds,
  (filterIds) => filterLayer(filterIds)
);

function filterLayer(filterIds?: string[]) {
  if (filterIds) {
    map
      ?.getStyle()
      .layers.filter((layer) => !layer.id.startsWith("gl-draw"))
      .forEach((layer) => {
        map?.setLayoutProperty(
          layer.id,
          "visibility",
          filterIds.includes(layer.id) ? "visible" : "none"
        );
      });
  }
}
function drawPolygon() {
  draw?.changeMode("draw_polygon");
}
function drawTrash() {
  draw?.trash();
}
</script>

<template>
  <v-progress-linear v-if="loading" :active="loading" indeterminate />
  <v-responsive :aspect-ratio="aspectRatio" height="100%">
    <div ref="mapContainer" />
  </v-responsive>
</template>

<style scoped>
.maplibregl-map {
  height: 100%;
}
</style>

<style>
/* mapbox-gl-draw cursors, mapped to the maplibregl-* classes (from the MapLibre example) */
.maplibregl-map.mouse-pointer
  .maplibregl-canvas-container.maplibregl-interactive {
  cursor: pointer;
}
.maplibregl-map.mouse-move .maplibregl-canvas-container.maplibregl-interactive {
  cursor: move;
}
.maplibregl-map.mouse-add .maplibregl-canvas-container.maplibregl-interactive {
  cursor: crosshair;
}
.maplibregl-map.mouse-move.mode-direct_select
  .maplibregl-canvas-container.maplibregl-interactive {
  cursor: grab;
}
.maplibregl-map.mode-direct_select.feature-vertex.mouse-move
  .maplibregl-canvas-container.maplibregl-interactive {
  cursor: move;
}
.maplibregl-map.mode-direct_select.feature-midpoint.mouse-pointer
  .maplibregl-canvas-container.maplibregl-interactive {
  cursor: cell;
}
.maplibregl-map.mode-direct_select.feature-feature.mouse-move
  .maplibregl-canvas-container.maplibregl-interactive {
  cursor: move;
}
.maplibregl-map.mode-static.mouse-pointer
  .maplibregl-canvas-container.maplibregl-interactive {
  cursor: grab;
}
</style>
