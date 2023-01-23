<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";

import {
  FullscreenControl,
  GeolocateControl,
  Map,
  NavigationControl,
  ScaleControl,
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
  filterPattern?: RegExp;
  filterIds?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  center: () => [0, 0],
  zoom: 10,
  aspectRatio: 2,
  minZoom: undefined,
  maxZoom: undefined,
  filterPattern: undefined,
  filterIds: () => [],
});

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

  map.once("load", () => {
    filterLayer(props.filterIds, props.filterPattern);
  });
});

watch(
  [() => props.filterIds, () => props.filterPattern],
  ([filterIds, filterPattern]) => filterLayer(filterIds, filterPattern)
);

function filterLayer(filterIds: string[], filterPattern?: RegExp) {
  if (map && filterPattern) {
    map
      .getStyle()
      .layers.filter((layer) => filterPattern.test(layer.id))
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
  <v-responsive :aspect-ratio="aspectRatio">
    <div id="maplibre-map" />
  </v-responsive>
</template>

<style scoped>
#maplibre-map {
  height: 100%;
}
</style>
