<script setup lang="ts">
import MapLibreMap from "@/components/MapLibreMap.vue";
import type { LngLatBoundsLike } from "maplibre-gl";
import { computed } from "vue";

const layerIds = computed<string[]>(() => [
  "piezometer_locations",
  "piezometer_locations_labels",
  "data_extent",
  "approximate_development_limit",
  "background",
  "natural_earth",
]);

const styleSpec =
  "https://raw.githubusercontent.com/EPFL-ENAC/EIRA-data/main/Data_vector_style/style_raster_background.json";

const options = {
  licenseKey: "gplv3-license",
  scrollOverflow: false,
  normalScrollElements: ".maplibregl-map",
  paddingTop: "64px",
};

const mapBounds = [-15.84, 17.95, -16.08, 18.17] as LngLatBoundsLike;
</script>

<template>
  <full-page id="fullpage-wrapper" ref="fullpage" :options="options">
    <div class="section">
      <v-container>
        <v-row class="h-100">
          <v-col cols="4">
            <MapLibreMap
              ref="maplibreMap"
              :bounds="mapBounds"
              :style-spec="styleSpec"
              :filter-ids="layerIds"
              :popup-layer-ids="['piezometer_locations']"
              :zoom="11.5"
              :extended="false"
            />
          </v-col>
          <v-col class="h-100" cols="8">
            <v-card class="h-100">
              <v-card-title class="text-h3"> Nouakchott </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    Nouakchott is the capital and largest city of the Islamic
                    Republic of Mauritania and one of the hubs of the
                    Mauritanian economy
                  </v-list-item>
                  <v-list-item>
                    The city has rapidly expanded since the mid-1950s and
                    currently has an area of approximately 200 km2 and a
                    population of 1.1 million people
                  </v-list-item>
                  <v-list-item>
                    Nouakchott is largely flat with an average elevation of 7
                    meters above sea level, with several districts close to or
                    below sea level
                  </v-list-item>
                  <v-list-item>
                    Nouakchott has a hot desert climate with an average annual
                    temperature of 29°C and average annual rainfall of 105
                    mm/year
                  </v-list-item>
                  <v-list-item>
                    The city sits on sandy soil with a very shallow and saline
                    groundwater table Domestic water (180,000 m3/day) is
                    supplied through the Aftout Essahli conduit delivering
                    surficial water from the Senegal River and through the
                    pumping station in the quaternary freshwater aquifer of
                    El-Trarza (north of Nouakchott) There is a limited sewer
                    network in Nouakchott, only serving the oldest neighborhoods
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="section">Section 2</div>
    <div class="section">Section 3</div>
  </full-page>
</template>

<style scoped>
#fullpage-wrapper {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
}
.section {
  text-align: center;
  font-size: 3em;
  font-family: arial;
  max-height: 100%;
}
.v-container {
  height: 80vh;
}
</style>
