<script setup lang="ts">
import { type Product } from "../scripts/types"

const props = defineProps<{
  product: Product
}>()
</script>
<template>
  <li class="text-light">
    {{ product.id }}
  </li>
</template>
<style scoped></style>
