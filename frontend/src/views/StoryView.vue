<script setup lang="ts">
import MapLibreMap from "@/components/MapLibreMap.vue";
import { mdiArrowDown } from "@mdi/js";
import type { LngLatBoundsLike } from "maplibre-gl";
import { computed } from "vue";
import type { VueMessageType } from "vue-i18n";
import { useDisplay } from "vuetify";

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
  responsiveWidth: 960,
  anchors: [
    "nouakchottMauritania",
    "floodingIssues",
    "hydrogeologicalContext",
    "floodingSchema",
    "projectDescription",
    "projectObjectives",
    "firstFieldCampain",
    "groundwaterMonitoring",
    "transpirationMonitoring",
    "targetedTreeSpecies",
    "references",
  ],

  navigation: true,
  navigationPosition: "right",
  normalScrollElements: ".maplibregl-map",
};

const colorsFloodingSchema = ["#5b9bd5", "#52cab8", "#49bf64", "#70ad47"];

const mapBounds = [-15.84, 17.95, -16.08, 18.17] as LngLatBoundsLike;

const { smAndDown } = useDisplay();
</script>

<template>
  <full-page id="fullpage-wrapper" ref="fullpage" :options="options">
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <v-row class="justify-center h-100 overflow-y-auto">
          <v-col
            cols="12"
            md="5"
            xl="6"
            order="2"
            order-md="1"
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
          <v-col
            class="h-100 align-center d-flex"
            order="1"
            order-md="2"
            cols="12"
            md="7"
            xl="5"
          >
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
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <v-row class="justify-center h-100">
          <v-col
            cols="12"
            md="7"
            xl="6"
            order="2"
            order-md="1"
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
          <v-col
            class="h-100 align-center d-flex"
            cols="12"
            md="5"
            xl="6"
            order="1"
            order-md="2"
          >
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
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <v-row class="justify-center h-100 overflow-y-auto">
          <v-col
            cols="12"
            md="7"
            xl="6"
            order="2"
            order-md="1"
            class="align-center h-100 justify-center d-flex flex-column"
          >
            <v-row class="w-100">
              <v-col class="d-flex flex-column justify-center align-center">
                <div
                  class="mb-2 d-flex align-center w-75 justify-center bg-blue"
                  style="min-height: 200px; height: 25vh"
                  src="story/flooding_photo.jpeg"
                >
                  WIP Diagram
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="h-100 align-center d-flex"
            cols="12"
            md="5"
            xl="6"
            order="1"
            order-md="2"
          >
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
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <v-row class="justify-center h-100 overflow-y-auto">
          <v-col
            cols="12"
            md="6"
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
                <v-carousel
                  cycle
                  class="mt-5"
                  height="35vh"
                  show-arrows="hover"
                >
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
          <v-col class="h-100 align-center d-flex flex-column" cols="12" md="6">
            <v-row>
              <v-col
                v-for="(paragraph, index) in $tm(
                  'story.floodingSchema.paragraphs.before'
                )"
                :key="index"
                class="d-flex justify-center align-center"
                cols="6"
              >
                <p
                  class="schema-text text-body-1 text-md-h6 text-lg-h5"
                  :style="{
                    color: 'white',
                    'background-color': colorsFloodingSchema[index as number],
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
                :key="index"
                class="d-flex justify-center align-center"
                cols="6"
              >
                <p
                  class="schema-text text-body-1 text-md-h6 text-lg-h5"
                  :style="{
                    color: 'white',
                    'background-color': colorsFloodingSchema[index as number],
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
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <v-row class="justify-center h-100 overflow-y-auto">
          <v-col
            cols="12"
            md="5"
            xl="6"
            order="2"
            order-md="1"
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
          <v-col
            class="h-100 align-center d-flex"
            cols="12"
            md="7"
            xl="5"
            order="1"
            order-md="2"
          >
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
    <div class="section fp-auto-height-responsive">
      <v-container class="d-flex flex-column justify-space-between" fluid>
        <div class="text-h3">{{ $t("story.projectObjectives.title") }}</div>
        <v-timeline :direction="smAndDown ? 'vertical' : 'horizontal'">
          <v-timeline-item
            v-for="(paragraph, index) in $tm(
              'story.projectObjectives.paragraphs'
            )"
            :key="index"
            :dot-color="colorsFloodingSchema[index as number]"
          >
            <v-card>
              <v-card-title
                class="text-white text-h5 text-xl-h4 pa-4 pa-xxl-6 text-wrap text-break"
                :style="{
                  'background-color': colorsFloodingSchema[index as number],
                }"
              >
                {{
                  $rt(
                    $tm(
                      "story.projectObjectives.paragraphs_titles[" +
                        (index as number) +
                        "]"
                    ) as VueMessageType
                  )
                }}
              </v-card-title>
              <v-card-text class="pa-4 pa-xxl-6 text-h6">
                {{ $rt(paragraph) }}
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </div>
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <v-row class="justify-center h-100">
          <v-col
            cols="12"
            md="8"
            order="2"
            order-md="1"
            class="align-center h-100 d-flex flex-column"
          >
            <v-row class="w-100 h-100 d-flex">
              <v-col cols="6" class="d-flex flex-column justify-center h-50">
                <v-img src="story/first_field_campain_1.JPG" />
              </v-col>
              <v-col cols="6" class="d-flex flex-column justify-center h-50">
                <v-img src="story/first_field_campain_4.JPG" />
              </v-col>
              <v-col cols="6" class="d-flex flex-column justify-center h-50">
                <v-img src="story/first_field_campain_3.jpeg" />
              </v-col>
              <v-col cols="6" class="d-flex flex-column justify-center h-50">
                <v-img src="story/first_field_campain_2.jpeg" />
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="h-100 align-center d-flex"
            cols="12"
            md="4"
            order="1"
            order-md="2"
          >
            <v-sheet class="pl-6 text-left overflow-y-auto">
              <div class="text-h3">
                {{ $t("story.firstFieldCampain.title") }}
              </div>
              <div class="text-body-1 text-xxl-h5">
                <p
                  v-for="(paragraph, index) in $tm(
                    'story.firstFieldCampain.paragraphs'
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
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <v-row class="justify-center h-100">
          <v-col
            cols="12"
            md="7"
            order="2"
            order-md="1"
            class="align-center h-100 d-flex flex-column"
          >
            <v-container
              fluid
              class="pa-0"
              :style="smAndDown ? { height: '50vh' } : {}"
            >
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
          </v-col>
          <v-col class="h-100" cols="12" md="5" order="1" order-md="2">
            <v-sheet
              class="pl-md-6 h-100 text-left justify-space-between d-flex flex-column"
            >
              <div class="text-h3">
                {{ $t("story.groundwaterMonitoring.title") }}
              </div>
              <v-img
                width="100%"
                src="story/groundwater_monitoring_photo.jpeg"
              />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <v-row class="justify-center h-100">
          <v-col
            cols="12"
            md="9"
            order="2"
            order-md="1"
            class="align-center h-100 d-flex flex-column"
          >
            <v-row class="w-100 h-100 d-flex">
              <v-col
                cols="12"
                md="6"
                class="d-flex flex-column justify-center h-50"
              >
                <v-img src="story/transpiration_monitoring_diagram_1.jpg" />
              </v-col>
              <v-col
                cols="12"
                md="6"
                class="d-flex flex-column justify-center h-50"
              >
                <v-img src="story/transpiration_monitoring_photo_1.jpeg" />
              </v-col>
              <v-col
                cols="12"
                md="6"
                class="d-flex flex-column justify-center h-50"
              >
                <v-img src="story/transpiration_monitoring_diagram_2.png" />
              </v-col>

              <v-col
                cols="12"
                md="6"
                class="d-flex flex-column justify-center h-50"
              >
                <v-img src="story/transpiration_monitoring_photo_2.jpeg" />
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="h-100 align-center d-flex"
            cols="12"
            md="3"
            order="1"
            order-md="2"
          >
            <v-sheet class="pl-6 text-left overflow-y-auto">
              <div class="text-h3">
                {{ $t("story.transpirationMonitoring.title") }}
              </div>
              <div class="text-body-1 text-xxl-h5">
                <p
                  v-for="(paragraph, index) in $tm(
                    'story.transpirationMonitoring.paragraphs'
                  )"
                  :key="index"
                  class="pt-2 pt-lg-6 pt-xxl-8"
                >
                  {{ $rt(paragraph) }}
                </p>
                <p class="pt-2 pt-lg-6 pt-xxl-8">
                  Source:
                  <a href="https://www.ictinternational.com" target="_">
                    https://www.ictinternational.com
                  </a>
                </p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <div class="text-h3">{{ $t("story.targetedTreeSpecies.title") }}</div>

        <v-row class="justify-center h-100 align-center">
          <v-col
            cols="6"
            md=""
            class="d-flex flex-column justify-center align-center w-100 h-75"
          >
            <v-img width="100%" src="story/tree_Azadirachta_indica.jpeg" />
            <i class="text-h6">Azadirachta indica</i>
          </v-col>
          <v-col
            cols="6"
            md=""
            class="d-flex flex-column justify-center align-center w-100 h-75"
          >
            <v-img width="100%" src="story/tree_Casuarina_equisetifolia.jpeg" />
            <i class="text-h6">Casuarina equisetifolia</i>
          </v-col>
          <v-col
            cols="6"
            md=""
            class="d-flex flex-column justify-center align-center w-100 h-75"
          >
            <v-img
              width="100%"
              src="story/tree_Eucalyptus_camaldulensis.jpeg"
            />
            <i class="text-h6">Eucalyptus camaldulensis</i>
          </v-col>

          <v-col
            cols="6"
            md=""
            class="d-flex flex-column justify-center align-center w-100 h-75"
          >
            <v-img width="100%" src="story/tree_Phoenix_dactylifera.JPG" />
            <i class="text-h6">Phoenix dactylifera</i>
          </v-col>
          <v-col
            cols="6"
            md=""
            class="d-flex flex-column justify-center align-center w-100 h-75"
          >
            <v-img width="100%" src="story/tree_Tamarix_aphylla.jpeg" />
            <i class="text-h6">Tamarix aphylla</i>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="section fp-auto-height-responsive">
      <v-container fluid>
        <div class="text-h3">{{ $t("story.references") }}</div>
        <p class="text-h6 my-10">
          Mohamed, A.-S., Leduc, C., Marlin, C., Wagué, O., & Sidi Cheikh, M.-A.
          (2017). Impacts of climate change and anthropization on groundwater
          resources in the Nouakchott urban area (coastal Mauritania). Comptes
          Rendus Geoscience, 349(6–7), 280–289.
          <a href="https://doi.org/10.1016/j.crte.2017.09.011" target="_"
            >https://doi.org/10.1016/j.crte.2017.09.011</a
          >
        </p>
        <p class="text-h6 my-10">
          Smith, A. D. (2016, July 25). “The best solution? Move the Mauritanian
          capital”: water on the rise in Nouakchott. The Guardian.

          <a
            href="https://www.theguardian.com/global-development/2016/jul/25/the-best-solution-move-the-mauritanian-capital-water-on-the-rise-in-nouakchott"
            target="_"
            >https://www.theguardian.com/global-development/2016/jul/25/the-best-solution-move-the-mauritanian-capital-water-on-the-rise-in-nouakchott</a
          >
        </p>
      </v-container>
    </div>
  </full-page>
</template>

<style scoped>
.v-sheet {
  background: none;
}
.section:nth-child(2n) {
  background-color: #e5e6e552;
}

@media (max-width: 961px) {
  .section .text-h3 {
    padding-bottom: 0.6em;
  }
}
#fullpage-wrapper {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
}
.section .v-container {
  padding: 0 10vw;
  padding-top: calc(64px + 3em);
}

@media (min-width: 961px) {
  .section .v-container {
    height: 80vh;
    padding-top: 64px;
  }
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
</style>
