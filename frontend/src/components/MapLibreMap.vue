<script setup lang="ts">
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "maplibre-gl/dist/maplibre-gl.css";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { area } from "@turf/turf";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  NavigationControl,
  Popup,
  ScaleControl,
  type IControl,
  type StyleSpecification,
} from "maplibre-gl";
import { onMounted, ref, watch } from "vue";

export interface Props {
  styleSpec: string | StyleSpecification;
  center?: [number, number];
  zoom?: number;
  aspectRatio?: number;
  minZoom?: number;
  maxZoom?: number;
  filterIds?: string[];
  popupLayerIds?: string[];
}
const props = withDefaults(defineProps<Props>(), {
  center: () => [0, 0],
  zoom: 10,
  aspectRatio: undefined,
  minZoom: undefined,
  maxZoom: undefined,
  filterIds: undefined,
  popupLayerIds: () => [],
});

const emit = defineEmits<{
  (e: "update:area", value: number): void;
}>();

const loading = ref(false);
let map: Map | undefined = undefined;

onMounted(() => {
  map = new Map({
    container: "maplibre-map",
    style: props.styleSpec,
    center: [props.center[1], props.center[0]],
    zoom: props.zoom,
  });
  map.addControl(new NavigationControl({}));
  map.addControl(new GeolocateControl({}));
  map.addControl(new ScaleControl({}));
  map.addControl(new FullscreenControl({}));
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
  });
  map.addControl(draw as unknown as IControl);

  map.once("load", () => {
    filterLayer(props.filterIds);
  });
  map.on("draw.create", updateArea);
  map.on("draw.delete", updateArea);
  map.on("draw.update", updateArea);

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
    const data = draw.getAll();
    const selectedArea = area(data);
    emit("update:area", selectedArea);
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
</script>

<template>
  <v-progress-linear v-if="loading" :active="loading" indeterminate />
  <v-responsive :aspect-ratio="aspectRatio" height="100%">
    <div id="maplibre-map" />
  </v-responsive>
</template>

<style scoped>
#maplibre-map {
  height: 100%;
}
</style>
