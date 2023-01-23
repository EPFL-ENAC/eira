<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";

import { Map, type StyleSpecification } from "maplibre-gl";
import { onMounted, ref } from "vue";

export interface Props {
  styleSpec: string | StyleSpecification;
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  aspectRatio?: number;
}

const props = withDefaults(defineProps<Props>(), {
  center: () => [0, 0],
  zoom: 8,
  minZoom: undefined,
  maxZoom: undefined,
  aspectRatio: 2,
});

const loading = ref(false);

onMounted(() => {
  new Map({
    container: "maplibre-map",
    style: props.styleSpec,
    center: [props.center[1], props.center[0]],
    zoom: props.zoom,
  });
});
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
