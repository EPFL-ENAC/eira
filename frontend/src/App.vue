<script setup lang="ts">
import IntroductionContent from "@/components/IntroductionContent.vue";
import { LocalStorageKey } from "@/utils/localStorage";
import { mdiHome, mdiInformationOutline } from "@mdi/js";
import { ref } from "vue";
import { RouterView } from "vue-router";

const introductionDialog = ref(false);

function updateLocale(locale: string) {
  localStorage.setItem(LocalStorageKey.Locale, locale);
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-tabs class="text-white">
        <v-tab to="/" :prepend-icon="mdiHome">
          <v-app-bar-title>EIRA</v-app-bar-title>
        </v-tab>
        <v-tab to="/story">{{ $t("tabs.story") }} </v-tab>
      </v-tabs>
      <v-spacer />
      <v-col class="text-white" cols="auto">
        <v-dialog v-model="introductionDialog" width="auto" scrollable>
          <template #activator="{ props }">
            <v-btn v-bind="props" :icon="mdiInformationOutline" />
          </template>
          <IntroductionContent @click="introductionDialog = $event" />
        </v-dialog>
      </v-col>
      <v-col class="text-white" cols="auto">
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
