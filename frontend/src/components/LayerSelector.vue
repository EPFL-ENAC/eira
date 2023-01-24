<script setup lang="ts">
import type { SelectItemObject } from "@/utils/vuetify";
import { computed, ref, watch } from "vue";

export interface Props {
  modelValue: string[];
  separator: string;
  prefixSeparator: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  separator: "_",
  prefixSeparator: ",",
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
const layers: SelectItemObject[] = [
  { title: "Ponding", value: "ponding-raster" },
  { title: "Piezometer elevation", value: "piezo-elev-raster" },
  {
    title: "Piezometer contours",
    value: ["piezo_contour", "text-piezo_contour"],
  },
].map((item) => ({
  title: item.title,
  value: Array.isArray(item.value)
    ? item.value.join(props.prefixSeparator)
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
          .split(props.prefixSeparator)
          .some((v) => modelValue.startsWith(v + props.separator))
      )
    )
);

const combinedNames = computed<string[]>(() => {
  return selectedLayers.value
    .flatMap((layer) => layer.split(props.prefixSeparator))
    .flatMap((layer) =>
      selectedMonths.value.map((month) => `${layer}_${month}`)
    );
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
        label="Select month"
        :items="months"
        multiple
      />
      <v-select
        v-model="selectedLayers"
        chips
        closable-chips
        label="Select layer"
        :items="layers"
        multiple
      />
    </v-card-text>
  </v-card>
</template>
