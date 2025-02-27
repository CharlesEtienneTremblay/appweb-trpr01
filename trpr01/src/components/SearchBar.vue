<script setup lang="ts">
import { ref } from "vue"
import { type Product } from "../scripts/types"

const emits = defineEmits(["update:shownProducts"])

const searchString = ref<string>()
</script>

<template>
  <label for="searchBar" class="label-form text-info fs-3"
    >Rechercher un produit</label
  >
  <input
    type="text"
    class="form-control bg-info"
    id="searchBar"
    v-model="searchString"
    @input="emits('update:shownProducts', searchString)"
  />
</template>

<style scoped></style>
