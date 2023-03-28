<script setup lang="ts">
import { mdiClose } from "@mdi/js";
import { useI18n } from "vue-i18n";

const { te } = useI18n();

const emit = defineEmits<{
  (e: "click", value: boolean): void;
}>();

const linkItems: {
  key: string;
  items: { key: string; url?: string }[];
}[] = [
  {
    key: "partner",
    items: [
      {
        key: "pl-lch",
        url: "https://www.epfl.ch/labs/lch",
      },

      {
        key: "perl",
        url: "https://www.epfl.ch/labs/perl",
      },
      {
        key: "crn",
        url: "https://crn.mr/fr",
      },
      {
        key: "cnre",
      },
      {
        key: "univ-nkc",
        url: "https://www.univ-nkc.mr",
      },
      {
        key: "exaf",
        url: "https://www.epfl.ch/research/domains/exaf",
      },
      {
        key: "lausanne",
        url: "https://www.lausanne.ch",
      },
    ],
  },
  {
    key: "people",
    items: [
      {
        key: "perona",
        url: "https://people.epfl.ch/paolo.perona",
      },
      {
        key: "grossiord",
        url: "https://people.epfl.ch/charlotte.grossiord",
      },
      {
        key: "dubois",
        url: "https://people.epfl.ch/emmanuel.dubois",
      },
      {
        key: "marshall",
        url: "https://people.epfl.ch/montana.marshall",
      },
      {
        key: "chenal",
        url: "https://people.epfl.ch/jerome.chenal",
      },
      {
        key: "cherif",
      },
      {
        key: "boukhreiss",
      },
    ],
  },
];
</script>

<template>
  <v-card class="text-justify" :title="$t('introduction.title')">
    <v-card-text>
      <p>{{ $t("introduction.body") }}</p>
      <br />
      <h3>{{ $t("introduction.description.title") }}</h3>
      <p>{{ $t("introduction.description.body") }}</p>
      <br />
      <h3>{{ $t("introduction.navigation.title") }}</h3>
      <p>{{ $t("introduction.navigation.body") }}</p>
      <br />
      <v-row>
        <v-col v-for="item in linkItems" :key="item.key">
          <v-card :title="$t(`introduction.${item.key}.title`)">
            <v-list dense>
              <v-list-item
                v-for="subItem in item.items"
                :key="subItem.key"
                :href="subItem.url"
                target="_blank"
                :title="$t(`introduction.${item.key}.${subItem.key}`)"
                :subtitle="
                  te(`introduction.${item.key}.${subItem.key}-subtitle`)
                    ? $t(`introduction.${item.key}.${subItem.key}-subtitle`)
                    : undefined
                "
              >
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <h3>{{ $t("introduction.contact.title") }}</h3>
      <p>
        Emmanuel Dubois <br />
        EPFL ENAC IIC PL-LCH / GC A3 505 <br />
        +41 21 693 51 88 <br />
        emmanuel.dubois@epfl.ch
      </p>
      <br />
      <h3>{{ $t("introduction.acknowledgement.title") }}</h3>
      <p>{{ $t("introduction.acknowledgement.body") }}</p>
      <br />
      <p>
        <a
          href="https://www.epfl.ch/about/overview/regulations-and-guidelines/disclaimer"
          target="_blank"
        >
          {{ $t("introduction.legalNotice") }}
        </a>
        <br />
        <a
          href="https://www.epfl.ch/about/presidency/presidents-team/legal-affairs/epfl-privacy-policy"
          target="_blank"
        >
          {{ $t("introduction.dataProtection") }}
        </a>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :prepend-icon="mdiClose"
        @click="emit('click', false)"
      >
        {{ $t("close") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
