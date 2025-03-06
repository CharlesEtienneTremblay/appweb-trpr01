<script setup lang="ts">
import { ref } from "vue"

const emits = defineEmits(["update:shownProducts"])

const searchString = ref<string>()
</script>

<template>
  <label for="searchBar" class="label-form text-secondary fs-3"
    >Rechercher un produit</label
  >
  <input
    type="text"
    class="form-control bg-secondary mb-1"
    id="searchBar"
    v-model="searchString"
    @input="emits('update:shownProducts', searchString)"
  />
</template>

<style scoped></style>
