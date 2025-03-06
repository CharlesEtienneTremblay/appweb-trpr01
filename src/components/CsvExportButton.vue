<script setup lang="ts">
import {
  mkConfig,
  generateCsv,
  download,
  type CsvOutput,
  type ConfigOptions
} from "export-to-csv"
import { type Product } from "../scripts/types"

const props = defineProps<{
  products: Product[]
}>()
const csvConfig /*:WithDefaults<ConfigOptions>*/ = mkConfig({
  useKeysAsHeaders: true,
  title: "Produits",
  filename: "produits_aleatoires"
})

function exportAsCSV(): void {
  let values: {
    id: number
    name: string
    description: string
    price: number
    stock: number
  }[] = []

  props.products.forEach((product) => {
    values.push({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    })
  })

  let csv: CsvOutput = generateCsv(csvConfig)(values)

  download(csvConfig)(csv)
}
</script>

<template>
  <button type="button" class="btn btn-secondary" @click="exportAsCSV()">
    Exporter en .csv
  </button>
</template>

<style scoped></style>
