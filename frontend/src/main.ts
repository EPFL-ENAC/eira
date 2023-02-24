import App from "@/App.vue";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import router from "@/router";
import { LocalStorageKey } from "@/utils/localStorage";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createI18n, useI18n, type I18n } from "vue-i18n";

import "@/assets/main.css";

// Vuetify
import { mdiHome } from "@mdi/js";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import colors from "vuetify/lib/util/colors";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import "vuetify/styles";

const pinia = createPinia();
export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem(LocalStorageKey.Locale) ?? "en",
  fallbackLocale: "en",
  messages: {
    en: en,
    fr: fr,
  },
});

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.cyan.base,
          secondary: colors.amber.base,
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      home: mdiHome,
    },
    sets: {
      mdi,
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n: i18n as I18n, useI18n }),
  },
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(vuetify);
app.use(i18n);
app.mount("#app");
