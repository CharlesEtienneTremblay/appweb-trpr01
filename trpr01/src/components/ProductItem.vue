<script setup lang="ts">
import { type Product } from "../scripts/types"

const props = defineProps<{
  product: Product
}>()
</script>
<template>
  <li class="list-group-item bg-dark text-light">
    {{ product.name }} ({{ product.id }})
  </li>
</template>
<style scoped></style>
