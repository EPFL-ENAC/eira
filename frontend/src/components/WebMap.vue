<script setup lang="ts">
import { ref } from "vue";
import LayerSelector from "./LayerSelector.vue";
import MapLibreMap from "./MapLibreMap.vue";

const layerIds = ref<string[]>(["ponding-raster_1"]);
</script>

<template>
  <v-row>
    <v-col cols="3">
      <LayerSelector v-model="layerIds" />
    </v-col>
    <v-col>
      <MapLibreMap
        :center="[18.0735, -15.9582]"
        style-spec="https://raw.githubusercontent.com/EPFL-ENAC/EIRA-data/main/Data_vector_style/style_raster_background.json"
        :filter-pattern="/^.+_\d{1,2}$/"
        :filter-ids="layerIds"
      />
    </v-col>
  </v-row>
</template>
