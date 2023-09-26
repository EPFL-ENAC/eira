<script setup lang="ts">
import MapLibreMap from "@/components/MapLibreMap.vue";
import { mdiArrowDown } from "@mdi/js";
import type { LngLatBoundsLike } from "maplibre-gl";
import { computed } from "vue";
import type { VueMessageType } from "vue-i18n";

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
  // autoScrolling: false,
  responsiveWidth: 900,
  anchors: [
    "nouakchottMauritania",
    "floodingIssues",
    "hydrogeologicalContext",
    "floodingSchema",
    "projectDescription",
    "projectObjectives",
  ],

  navigation: true,
  navigationPosition: "right",
  normalScrollElements: ".maplibregl-map",
};

const colorsFloodingSchema = ["#5b9bd5", "#52cab8", "#49bf64", "#70ad47"];

const mapBounds = [-15.84, 17.95, -16.08, 18.17] as LngLatBoundsLike;
</script>

<template>
  <full-page id="fullpage-wrapper" ref="fullpage" :options="options">
    <div class="section">
      <v-container fluid>
        <v-row class="justify-center h-100 overflow-y-auto">
          <v-col
            cols="5"
            xl="6"
            class="align-center h-100 justify-space-around d-flex flex-column"
          >
            <v-img
              class="flex-1-1"
              :src="$t('story.nouakchottMauritania.map')"
              width="100%"
              max-height="60%"
            />
            <v-img
              class="flex-1-1"
              :src="$t('story.nouakchottMauritania.meteo')"
              width="100%"
              max-height="35%"
            />
            <p>{{ $t("story.nouakchottMauritania.source") }}</p>
          </v-col>
          <v-col class="h-100 align-center d-flex" cols="7" xl="5">
            <v-sheet class="pl-6 text-left overflow-y-auto">
              <div class="text-h3">
                {{ $t("story.nouakchottMauritania.title") }}
              </div>
              <div class="text-body-1 text-xxl-h6">
                <p
                  v-for="(paragraph, index) in $tm(
                    'story.nouakchottMauritania.paragraphs'
                  )"
                  :key="index"
                  class="pt-2 pt-lg-6 pt-xxl-8"
                >
                  {{ $rt(paragraph) }}
                </p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="section">
      <v-container fluid>
        <v-row class="justify-center h-100">
          <v-col
            cols="7"
            xl="6"
            class="align-center justify-center h-100 d-flex flex-column"
          >
            <v-row class="w-100 flex-2-1">
              <v-col cols="12" class="d-flex flex-column justify-center">
                <a
                  class="w-100 text-center"
                  target="_"
                  href="https://www.ateliers.org/media/workshop/documents/nouakchott_fr.pdf"
                  ><v-img
                    class="mb-2"
                    width="100%"
                    max-height="100%"
                    src="story/flooding_evolution.png"
                  />
                  Les Ateliers, 2014</a
                >
              </v-col>
            </v-row>
            <v-row class="w-100 flex-1-2">
              <v-col cols="12" lg="6" class="d-flex flex-column justify-center">
                <a
                  class="w-100 text-center"
                  target="_"
                  href="https://www.theguardian.com/global-development/2016/jul/25/the-best-solution-move-the-mauritanian-capital-water-on-the-rise-in-nouakchott"
                  ><v-img
                    class="mb-2"
                    src="story/the_guardian.png"
                    max-height="100%"
                    width="100%"
                  />
                  The Guardian, 2016
                </a>
              </v-col>
              <v-col cols="12" lg="6" class="d-flex flex-column justify-center">
                <v-img
                  class="mb-2"
                  src="story/flooding_photo.jpeg"
                  max-height="100%"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col class="h-100 align-center d-flex" cols="5" xl="6">
            <v-sheet class="pl-6 text-left overflow-y-auto">
              <div class="text-h3">
                {{ $t("story.floodingIssues.title") }}
              </div>
              <div class="text-body-1 text-xxl-h5">
                <p
                  v-for="(paragraph, index) in $tm(
                    'story.floodingIssues.paragraphs'
                  )"
                  :key="index"
                  class="pt-2 pt-lg-6 pt-xxl-8"
                >
                  {{ $rt(paragraph) }}
                </p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="section">
      <v-container fluid>
        <v-row class="justify-center h-100 overflow-y-auto">
          <v-col
            cols="7"
            xl="6"
            class="align-center h-100 justify-center d-flex flex-column"
          >
            <v-row class="w-100">
              <v-col class="d-flex flex-column justify-center align-center">
                <div
                  class="mb-2 d-flex align-center w-75 justify-center bg-blue h-25"
                  src="story/flooding_photo.jpeg"
                  max-height="100%"
                >
                  WIP Diagram
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="h-100 align-center d-flex" cols="5" xl="6">
            <v-sheet class="pl-6 text-left overflow-y-auto">
              <div class="text-h3">
                {{ $t("story.hydrogeologicalContext.title") }}
              </div>
              <div class="text-body-1 text-xxl-h5">
                <p
                  v-for="(paragraph, index) in $tm(
                    'story.hydrogeologicalContext.paragraphs'
                  )"
                  :key="index"
                  class="pt-2 pt-lg-6 pt-xxl-8"
                >
                  {{ $rt(paragraph) }}
                </p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="section">
      <v-container fluid>
        <v-row class="justify-center h-100 overflow-y-auto">
          <v-col
            cols="6"
            class="align-center h-100 justify-center d-flex flex-column"
          >
            <v-row class="w-100">
              <v-col
                class="d-flex flex-column justify-space-between align-center"
              >
                <v-carousel cycle height="35vh" show-arrows="hover">
                  <v-carousel-item
                    v-for="(item, index) in [2, 3]"
                    :key="index"
                    :src="'story/flooding_photo_' + item + '.JPG'"
                    cover
                  ></v-carousel-item>
                </v-carousel>
                <v-carousel cycle height="35vh" show-arrows="hover">
                  <v-carousel-item
                    v-for="(item, index) in [4, 5]"
                    :key="index"
                    :src="'story/flooding_photo_' + item + '.JPG'"
                    cover
                  ></v-carousel-item>
                </v-carousel>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="h-100 align-center d-flex flex-column" cols="6">
            <v-row>
              <v-col
                v-for="(paragraph, index) in $tm(
                  'story.floodingSchema.paragraphs.before'
                )"
                class="d-flex justify-center align-center"
                cols="6"
                :key="index"
              >
                <p
                  class="schema-text text-body-1 text-md-h6 text-lg-h5"
                  :style="{
                    color: 'white',
                    'background-color': colorsFloodingSchema[index],
                  }"
                >
                  {{ $rt(paragraph) }}
                </p>
              </v-col>
            </v-row>
            <v-row class="flex-0-1-50">
              <p class="text-h4 d-flex align-center">
                <v-icon
                  size="large"
                  color="black"
                  :icon="mdiArrowDown"
                ></v-icon>
                {{ $t("story.floodingSchema.title")
                }}<v-icon
                  size="large"
                  color="black"
                  :icon="mdiArrowDown"
                ></v-icon>
              </p>
            </v-row>
            <v-row>
              <v-col
                v-for="(paragraph, index) in $tm(
                  'story.floodingSchema.paragraphs.after'
                )"
                class="d-flex justify-center align-center"
                cols="6"
                :key="index"
              >
                <p
                  class="schema-text text-body-1 text-md-h6 text-lg-h5"
                  :style="{
                    color: 'white',
                    'background-color': colorsFloodingSchema[index],
                  }"
                >
                  {{ $rt(paragraph) }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="section">
      <v-container fluid>
        <v-row class="justify-center h-100 overflow-y-auto">
          <v-col
            cols="5"
            xl="6"
            class="align-center h-100 justify-space-around d-flex flex-column"
          >
            <v-img
              class="flex-1-1"
              src="story/depression_diagram.svg"
              width="100%"
              cover
            />
            <v-img
              class="flex-1-1"
              src="story/flooding_photo_6.JPG"
              width="100%"
              max-height="35%"
            />
          </v-col>
          <v-col class="h-100 align-center d-flex" cols="7" xl="5">
            <v-sheet class="pl-6 text-left overflow-y-auto">
              <div class="text-h3">
                {{ $t("story.projectDescription.title") }}
              </div>
              <div class="text-body-1 text-xxl-h6">
                <p
                  v-for="(paragraph, index) in $tm(
                    'story.projectDescription.paragraphs'
                  )"
                  :key="index"
                  class="pt-2 pt-lg-6 pt-xxl-8"
                >
                  {{ $rt(paragraph) }}
                </p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="section">
      <v-container class="d-flex flex-column" fluid>
        <div class="text-h3">{{ $t("story.projectObjectives.title") }}</div>
        <v-timeline class="flex-1 h-100" direction="horizontal">
          <v-timeline-item
            v-for="(paragraph, index) in $tm(
              'story.projectObjectives.paragraphs'
            )"
            :key="index"
            dot-color="purple-lighten-2"
            fill-dot
          >
            <v-card>
              <v-card-title class="bg-purple-lighten-2">
                <h2 class="font-weight-light">
                  {{
                    $rt(
                      $tm(
                        "story.projectObjectives.paragraphs_titles[" +
                          index +
                          "]"
                      ) as VueMessageType
                    )
                  }}
                </h2>
              </v-card-title>
              <v-card-text>
                {{ $rt(paragraph) }}
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </div>
    <div class="section">
      <v-container>
        <MapLibreMap
          ref="maplibreMap"
          :bounds="mapBounds"
          :style-spec="styleSpec"
          :filter-ids="layerIds"
          :popup-layer-ids="['piezometer_locations']"
          :zoom="11.5"
          :extended="false"
        />
      </v-container>
    </div>
  </full-page>
</template>

<style scoped>
#fullpage-wrapper {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
}

p.schema-text {
  padding: 1.5vw;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

div.schema-group {
  flex: 3 1;
}

.section .v-container {
  height: 80vh;
  padding: 0 10vw;
  padding-top: 64px;
}
</style>
