<script setup lang="ts">
/*
    J'ai utilisé ce site et son API pour effectuer l'exportation en fichier .csv:
    https://www.npmjs.com/package/export-to-csv
*/

import { mkConfig, generateCsv, download, type CsvOutput } from "export-to-csv"
import { type Product } from "../scripts/types"

const props = defineProps<{
  products: Product[]
}>()

// Le type de cette constante n'existe pas et ne peut donc pas être déclaré.
const csvConfig = mkConfig({
  useKeysAsHeaders: false,
  quoteCharacter: "",
  filename: "produits_aleatoires",
  showColumnHeaders: true,
  columnHeaders: [
    { key: "id", displayLabel: "Id" },
    { key: "name", displayLabel: "Nom" },
    { key: "description", displayLabel: "Description" },
    { key: "price", displayLabel: "Prix" },
    { key: "stock", displayLabel: "Stock" }
  ]
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
