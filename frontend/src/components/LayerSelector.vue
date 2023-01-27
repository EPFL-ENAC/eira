<script setup lang="ts">
import type { SelectItemObject } from "@/utils/vuetify";
import { computed, ref, watch } from "vue";

export interface SelectableItem {
  title: string;
  value: string | string[];
}

export interface Props {
  modelValue?: string[];
  separator?: string;
  itemSeparator?: string;
  prefixes?: SelectableItem[];
  items?: SelectableItem[];
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  separator: "_",
  itemSeparator: ",",
  prefixes: () => [],
  items: () => [],
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const months: SelectItemObject[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((item, index) => ({
  title: item,
  value: (index + 1).toString(),
}));
const layers: SelectItemObject[] = props.prefixes.map((item) => ({
  title: item.title,
  value: Array.isArray(item.value)
    ? item.value.join(props.itemSeparator)
    : item.value,
}));
const items: SelectItemObject[] = props.items.map((item) => ({
  title: item.title,
  value: Array.isArray(item.value)
    ? item.value.join(props.itemSeparator)
    : item.value,
}));

const selectedMonths = ref<string[]>(
  months
    .map((item) => item.value)
    .filter((value) =>
      props.modelValue.some((modelValue) =>
        modelValue.endsWith(props.separator + value)
      )
    )
);
const selectedLayers = ref<string[]>(
  layers
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
    <v-card-title>Layers</v-card-title>
    <v-card-text>
      <v-select
        v-model="selectedMonths"
        chips
        closable-chips
        color="primary"
        label="Select month"
        :items="months"
        multiple
      />
      <v-select
        v-model="selectedLayers"
        chips
        closable-chips
        color="primary"
        label="Select layer"
        :items="layers"
        multiple
      />
      <v-checkbox
        v-for="(item, index) in items"
        :key="index"
        v-model="selectedItems"
        color="primary"
        density="compact"
        :label="item.title"
        :value="item.value"
      />
    </v-card-text>
  </v-card>
</template>
