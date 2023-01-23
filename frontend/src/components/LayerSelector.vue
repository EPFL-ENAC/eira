<script setup lang="ts">
import { computed, ref, watch } from "vue";

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const months = [
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
  value: (index + 1).toString().padStart(2, "0"),
}));
const layers = [
  { title: "Pond", value: "pond" },
  { title: "Piezo Contour", value: "piezo_contours" },
];

const selectedMonths = ref<string[]>([]);
const selectedLayers = ref<string[]>([]);

const combinedNames = computed<string[]>(() => {
  return selectedLayers.value.flatMap((layer) =>
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
        label="Select month"
        :items="months"
        multiple
      />
      <v-select
        v-model="selectedLayers"
        label="Select layer"
        :items="layers"
        multiple
      />
    </v-card-text>
  </v-card>
</template>
