<script setup lang="ts">
import ProductItem from "./ProductItem.vue"
import NewProductForm from "./NewProductForm.vue"
import { type Product } from "../scripts/types"
import { ref } from "vue"
import SearchBar from "./SearchBar.vue"
import ModifyProductForm from "./ModifyProductForm.vue"
import { EMPTY_PRODUCT } from "../scripts/consts"

const products = ref<Product[]>([
  {
    id: 1,
    name: "Comédie",
    description: "Un masque de comédie avec une aura étrange.",
    price: 10.0,
    stock: 5
  },
  {
    id: 2,
    name: "Pyrovision",
    description: "Regarder le monde avec de nouveaux yeux!",
    price: 24.0,
    stock: 10
  },
  {
    id: 3,
    name: "Pomme",
    description: "Pomme.",
    price: 24.0,
    stock: 99
  },
  {
    id: 4,
    name: "Ghostly Gibus",
    description: "Le plus stylé des chapeux gratuits!",
    price: 0.0,
    stock: 3
  },
  {
    id: 5,
    name: "The Darkhold",
    description: "Un livre de magie pour débutants!",
    price: 1000.34,
    stock: 1
  },
  {
    id: 6,
    name: "Le sandwich parfait",
    description: "Goût du paradis",
    price: 9999999.99,
    stock: 0
  },
  {
    id: 7,
    name: "Le 'Produit'",
    description: "Lorem ipsum",
    price: 24.0,
    stock: 0
  },
  {
    id: 8,
    name: "Inconnu",
    description: "On va vous payer pour le prendre!",
    price: 0.0,
    stock: 1
  }
])
let nextId: number = products.value.length + 1

const searchString = ref<String>("")

const productToModify = ref<Product>(EMPTY_PRODUCT)

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

function updateProductToModify(id: number): void {
  products.value.forEach((product: Product) => {
    if (product.id === id) {
      productToModify.value = product
    }
  })
}

function updateProduct(newProduct: Product): void {
  //https://www.geeksforgeeks.org/typescript-array-foreach-method/
  products.value.forEach((product: Product) => {
    if (product.id === newProduct.id) {
      product.name = newProduct.name
      product.description = newProduct.description
      product.price = newProduct.price
      product.stock = newProduct.stock
    }
  })

  productToModify.value = EMPTY_PRODUCT
}

function updateShownProducts(newSearchString: String): void {
  searchString.value = newSearchString
}
</script>
<template>
  <main>
    <div class="container mt-5">
      <div class="row">
        <div class="col">
          <div class="accordion mb-5 bg-dark container" id="productsList">
            <div class="row text-center justify-content-between">
              <span class="mt-3 fs-1">Produits</span>
              <SearchBar
                @update:shown-products="updateShownProducts($event)"
              ></SearchBar>
            </div>
            <ProductItem
              v-for="product in products"
              :key="product.id"
              :product="product"
              :search-string="searchString"
              @delete:product="removeProduct($event)"
              @update:product-to-modify="updateProductToModify($event)"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <span class="col-6">
          <NewProductForm @add:product="addProduct($event)"></NewProductForm
        ></span>
        <span class="col-6"> </span>
      </div>
      <div class="row mt-5">
        <ModifyProductForm
          :product="productToModify"
          @update:product="updateProduct($event)"
        ></ModifyProductForm>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
