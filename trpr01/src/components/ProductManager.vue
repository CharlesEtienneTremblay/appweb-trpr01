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
    stock: 8
  }
])
</script>
<template>
  <main>
    <div class="container">
      <div class="row">
        <NewProductForm></NewProductForm>
      </div>
      <div class="row">
        <div class="col">
          <ul class="list-group list-group-flush">
            <ProductItem
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
