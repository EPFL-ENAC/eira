<script setup lang="ts">
import LayerSelector, {
  type SelectableItem,
} from "@/components/LayerSelector.vue";
import MapLibreMap from "@/components/MapLibreMap.vue";
import { mdiTrashCan, mdiVectorPolygon } from "@mdi/js";
import { range } from "lodash";
import { computed, ref } from "vue";

const prefixes: SelectableItem[] = [
  {
    title: "ponding",
    value: ["ponding-raster", "ponding-vector"],
  },
  {
    title: "piezoElevRaster",
    value: "piezo-elev-raster",
  },
  {
    title: "piezoContour",
    value: [
      "piezo_contour",
      "text-piezo_contour",
      "text-piezo_highzoom_contour",
    ],
  },
];
const items: SelectableItem[] = [
  {
    title: "piezoLocations",
    value: ["piezometer_locations", "piezometer_locations_labels"],
  },
  {
    title: "cityLimit",
    value: "approximate_development_limit",
  },
  {
    title: "dataExtent",
    value: "data_extent",
  },
  {
    title: "topography",
    value: "topo_clipped",
  },
  // TODO remove test data
  {
    title: "test",
    value: "test_areas",
  },
];
const areaLayerIds = [
  "test_areas",
  ...range(12).map((i) => `ponding-vector_${i + 1}`),
];

const mapLibreMap = ref<InstanceType<typeof MapLibreMap>>();
const selectedlayerIds = ref<string[]>([
  "piezometer_locations",
  "piezometer_locations_labels",
  "data_extent",
  "approximate_development_limit",
  "test_areas", // TODO remove test data
]);

const layerIds = computed<string[]>(() => [
  ...selectedlayerIds.value,
  "background",
  "natural_earth",
]);

const area = ref(0);
const totalArea = ref(0);
</script>

<template>
  <v-row>
    <v-col cols="3">
      <v-row>
        <v-col>
          <LayerSelector
            v-model="selectedlayerIds"
            :items="items"
            :prefixes="prefixes"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-item>
              <v-card-title class="text-capitalize">
                {{ $t("tool", 2) }}
              </v-card-title>
            </v-card-item>
            <v-card-text v-if="totalArea > 0">
              <v-table density="compact">
                <thead>
                  <tr>
                    <th></th>
                    <th class="text-right">Surface [m²]</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-capitalize">{{ $t("area") }}</td>
                    <td class="text-right">
                      {{
                        area.toLocaleString($i18n.locale, {
                          maximumFractionDigits: 0,
                        })
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-capitalize">{{ $t("areaTotal") }}</td>
                    <td class="text-right">
                      {{
                        totalArea.toLocaleString($i18n.locale, {
                          maximumFractionDigits: 0,
                        })
                      }}
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :prepend-icon="mdiVectorPolygon"
                @click="mapLibreMap?.drawPolygon()"
              >
                {{ $t("draw.polygon") }}
              </v-btn>
              <v-btn
                :prepend-icon="mdiTrashCan"
                @click="mapLibreMap?.drawTrash()"
              >
                {{ $t("draw.trash") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="9">
      <MapLibreMap
        ref="mapLibreMap"
        :center="[18.0735, -15.9582]"
        style-spec="https://raw.githubusercontent.com/EPFL-ENAC/EIRA-data/main/Data_vector_style/style_raster_background.json"
        :filter-ids="layerIds"
        :popup-layer-ids="['piezometer_locations']"
        :area-layer-ids="areaLayerIds"
        :zoom="12"
        @update:area="area = $event"
        @update:total-area="totalArea = $event"
      />
    </v-col>
  </v-row>
</template>
