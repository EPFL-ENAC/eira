<script setup lang="ts">
import MapLibreMap from "./MapLibreMap.vue";
</script>

<template>
  <MapLibreMap
    :center="[18.0735, -15.9582]"
    style-spec="https://raw.githubusercontent.com/EPFL-ENAC/EIRA-data/main/Data_vector_style/style_raster_background.json"
  />
</template>
