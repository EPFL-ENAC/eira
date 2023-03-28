<script setup lang="ts">
import WebMap from "@/components/WebMap.vue";
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>{{ $t("map.title") }}</h1>
      </v-col>
    </v-row>
    <WebMap />
  </v-container>
</template>
