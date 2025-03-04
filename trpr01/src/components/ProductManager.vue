<script setup lang="ts">
import ProductItem from "./ProductItem.vue"
import NewProductForm from "./NewProductForm.vue"
import { type Product } from "../scripts/types"
import { ref } from "vue"

const products = ref<Product[]>([
  {
    id: 1,
    name: "Produce",
    description: "desc",
    price: 10.0,
    stock: 5
  },
  {
    id: 2,
    name: "Produce",
    description: "desc",
    price: 24.0,
    stock: 1
  },
  {
    id: 3,
    name: "Produce",
    description: "desc",
    price: 24.0,
    stock: 0
  },
  {
    id: 4,
    name: "Produce",
    description: "desc",
    price: 24.0,
    stock: 0
  }
])
let nextId: number = products.value.length + 1

function addProduct(values: [string, string, number, number]): void {
  products.value.push({
    id: nextId,
    name: values[0],
    description: values[1],
    price: values[2],
    stock: values[3]
  })

  nextId++
}

function removeProduct(id: number): void {
  products.value = products.value.filter((product) => product.id !== id)
}
</script>
<template>
  <main>
    <div class="container mt-5">
      <div class="row">
        <div class="col">
          <div class="accordion mb-5 bg-dark container" id="productsList">
            <div class="row text-center justify-content-between">
              <ExportToCSV class="my-3" v-model="products"></ExportToCSV>
              <span class="mt-3 fs-1">Produits</span>
            </div>
            <ProductItem
              v-for="product in products"
              :key="product.id"
              :product="product"
              @delete:product="removeProduct($event)"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <NewProductForm @add:product="addProduct($event)"></NewProductForm>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
