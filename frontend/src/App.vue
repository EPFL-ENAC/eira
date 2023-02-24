<script setup lang="ts">
import { LocalStorageKey } from "@/utils/localStorage";
import { RouterView } from "vue-router";

function updateLocale(locale: string) {
  localStorage.setItem(LocalStorageKey.Locale, locale);
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-tabs>
        <v-tab to="/" prepend-icon="$home">
          <v-app-bar-title>EIRA</v-app-bar-title>
        </v-tab>
      </v-tabs>
      <v-spacer />
      <v-col cols="1">
        <v-select
          v-model="$i18n.locale"
          density="compact"
          hide-details
          :items="$i18n.availableLocales"
          variant="outlined"
          @update:model-value="updateLocale"
        />
      </v-col>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
