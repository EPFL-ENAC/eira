<script setup lang="ts">
import { useTranslate } from "@/utils/translate";
import type { SelectItemObject } from "@/utils/vuetify";
import { range } from "lodash";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export interface SelectableItem {
  title: string;
  value: string | string[];
}

const props = withDefaults(
  defineProps<{
    modelValue?: string[];
    separator?: string;
    itemSeparator?: string;
    prefixes?: SelectableItem[];
    items?: SelectableItem[];
  }>(),
  {
    modelValue: () => [],
    separator: "_",
    itemSeparator: ",",
    prefixes: () => [],
    items: () => [],
  }
);
const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const { t } = useI18n();
const { to } = useTranslate();

const months = computed<SelectItemObject[]>(() =>
  range(1, 13).map((item) => ({
    title: t(`month.${item}`),
    value: item.toString(),
  }))
);
const layers = computed<(SelectItemObject & { subtitle?: string })[]>(() =>
  props.prefixes.map((item) => ({
    title: t(`layers.${item.title}`),
    subtitle: to(`layers.${item.title}-subtitle`),
    value: Array.isArray(item.value)
      ? item.value.join(props.itemSeparator)
      : item.value,
  }))
);
const items: SelectItemObject[] = props.items.map((item) => ({
  title: item.title,
  value: Array.isArray(item.value)
    ? item.value.join(props.itemSeparator)
    : item.value,
}));

const selectedMonths = ref<string[]>(
  months.value
    .map((item) => item.value)
    .filter((value) =>
      props.modelValue.some((modelValue) =>
        modelValue.endsWith(props.separator + value)
      )
    )
);
const selectedLayers = ref<string[]>(
  layers.value
    .map((item) => item.value)
    .filter((value) =>
      props.modelValue.some((modelValue) =>
        value
          .split(props.itemSeparator)
          .some((v) => modelValue.startsWith(v + props.separator))
      )
    )
);
const selectedItems = ref<string[]>(
  items
    .map((item) => item.value)
    .filter((value) =>
      props.modelValue.some((modelValue) =>
        value.split(props.itemSeparator).includes(modelValue)
      )
    )
);

const combinedNames = computed<string[]>(() => {
  return [
    ...selectedLayers.value
      .flatMap((layer) => layer.split(props.itemSeparator))
      .flatMap((layer) =>
        selectedMonths.value.map((month) => `${layer}_${month}`)
      ),
    ...selectedItems.value.flatMap((layer) => layer.split(props.itemSeparator)),
  ];
});

watch(combinedNames, (names) => emit("update:modelValue", names));
</script>

<template>
  <v-card min-width="256px">
    <v-card-title class="text-capitalize">{{ $t("layer", 2) }}</v-card-title>
    <v-card-text>
      <v-select
        v-model="selectedMonths"
        chips
        closable-chips
        color="primary"
        :label="$t('selectMonth')"
        :items="months"
        multiple
        variant="outlined"
      />
      <v-select
        v-model="selectedLayers"
        chips
        closable-chips
        color="primary"
        :label="$t('selectLayer')"
        :items="layers"
        multiple
        variant="outlined"
      >
        <!-- eslint-disable-next-line vue/no-template-shadow -->
        <template #item="{ item, props }">
          <v-list-item
            v-bind="props"
            :subtitle="item.raw.subtitle"
            lines="three"
            @click="props.onClick"
          />
        </template>
      </v-select>
      <v-checkbox
        v-for="(item, index) in items"
        :key="index"
        v-model="selectedItems"
        color="primary"
        density="compact"
        :value="item.value"
      >
        <!-- eslint-disable-next-line vue/no-template-shadow -->
        <template #label="{ props }">
          <v-list-item
            v-bind="props"
            :title="$t(`layers.${item.title}`)"
            :subtitle="to(`layers.${item.title}-subtitle`)"
          />
        </template>
      </v-checkbox>
    </v-card-text>
  </v-card>
</template>
