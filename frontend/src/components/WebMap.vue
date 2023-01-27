<script setup lang="ts">
import LayerSelector, {
  type SelectableItem,
} from "@/components/LayerSelector.vue";
import MapLibreMap from "@/components/MapLibreMap.vue";
import { round } from "lodash";
import { computed, ref } from "vue";

const prefixes: SelectableItem[] = [
  { title: "Ponding", value: "ponding-raster" },
  { title: "Piezometer elevation", value: "piezo-elev-raster" },
  {
    title: "Piezometer contours",
    value: ["piezo_contour", "text-piezo_contour"],
  },
];
const items: SelectableItem[] = [
  { title: "Piezometer location", value: "piezometer_locations" },
  {
    title: "Project extent",
    value: ["data_extent", "approximate_development_limit"],
  },
  {
    title: "Topography",
    value: "topo_clipped",
  },
  {
    title: "Hillshade",
    value: "hillshade",
  },
];

const selectedlayerIds = ref<string[]>([
  "piezometer_locations",
  "data_extent",
  "approximate_development_limit",
]);

const layerIds = computed<string[]>(() => [
  ...selectedlayerIds.value,
  "background",
  "natural_earth",
]);

const area = ref(0);
</script>

<template>
  <v-row class="h-100">
    <v-col cols="3">
      <LayerSelector
        v-model="selectedlayerIds"
        :items="items"
        :prefixes="prefixes"
      />
      <span>Area : {{ round(area, 2) }} [m²]</span>
    </v-col>
    <v-col>
      <MapLibreMap
        :center="[18.0735, -15.9582]"
        style-spec="https://raw.githubusercontent.com/EPFL-ENAC/EIRA-data/main/Data_vector_style/style_raster_background.json"
        :filter-ids="layerIds"
        :popup-layer-ids="['piezometer_locations']"
        @update:area="area = $event"
      />
    </v-col>
  </v-row>
</template>
