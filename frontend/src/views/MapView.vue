<script setup lang="ts">
import WebMap from "@/components/WebMap.vue";

const logos: { img: string; url: string }[] = [
  {
    img: "EPFL_Logo_184X53.svg",
    url: "https://www.epfl.ch",
  },
];
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>{{ $t("map.title") }}</h1>
        <p class="text-subtitle-1">{{ $t("map.subtitle") }}</p>
      </v-col>
      <v-col
        v-for="logo in logos"
        :key="logo.img"
        class="d-flex align-center"
        cols="auto"
      >
        <a :href="logo.url" target="_blank">
          <v-img :src="logo.img" height="50px" width="100px" />
        </a>
      </v-col>
    </v-row>
    <WebMap />
  </v-container>
</template>
