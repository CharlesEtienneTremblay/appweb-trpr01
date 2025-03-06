<script setup lang="ts">
import ProductItem from "./ProductItem.vue"
import NewProductForm from "./NewProductForm.vue"
import { type Product } from "../scripts/types"
import { ref } from "vue"
import SearchBar from "./SearchBar.vue"
import ModifyProductForm from "./ModifyProductForm.vue"
import { EMPTY_PRODUCT } from "../scripts/consts"
import DuplicateProductForm from "./DuplicateProductForm.vue"
import CsvExportButton from "./CsvExportButton.vue"

/*

  À FAIRE:

3. README.md
5. CSV
6. Excel

*/

const products = ref<Product[]>([
  {
    id: 1,
    name: "Estus",
    description: "Un nécessaire pour toute aventure!",
    price: 10.0,
    stock: 5
  },
  {
    id: 2,
    name: "Pyrovision",
    description: "Voyez le monde avec de nouveaux yeux!",
    price: 24.0,
    stock: 10
  },
  {
    id: 3,
    name: "Knockout Stout",
    description: "Une bière qui va vous mettre à terre!",
    price: 24.0,
    stock: 99
  },
  {
    id: 4,
    name: "Ghostly Gibus",
    description: "La gratuité la plus stylée!",
    price: 0.0,
    stock: 3
  },
  {
    id: 5,
    name: "Chronovium",
    description: "Du temps cristallisé.",
    price: 1000.34,
    stock: 1
  },
  {
    id: 6,
    name: "Vaisseau",
    description: "Un vaisseau pour l'exploration spatiale.",
    price: 9999999.99,
    stock: 0
  },
  {
    id: 7,
    name: "Comédie",
    description: "Un masque de comédie.",
    price: 24.0,
    stock: 0
  },
  {
    id: 8,
    name: "Graîne de ronce sombre",
    description: "La graîne d'une plante vicieuse que l'on veut se débarasser.",
    price: 0.0,
    stock: 1
  }
])
let nextId: number = products.value.length + 1

const searchString = ref<String>("")

const productToModify = ref<Product>(EMPTY_PRODUCT)
const productToDuplicate = ref<Product>(EMPTY_PRODUCT)

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

function findProduct(id: number): Product {
  let product: Product = EMPTY_PRODUCT

  products.value.forEach((currentProduct: Product) => {
    if (currentProduct.id === id) {
      product = currentProduct
    }
  })
  return product
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
      <div class="row" id="productsDiv">
        <div class="col">
          <div class="accordion mb-5 bg-dark container" id="productsList">
            <div class="row text-center justify-content-between">
              <SearchBar @update:shown-products="updateShownProducts($event)" />
            </div>
            <ProductItem
              v-for="product in products"
              :key="product.id"
              :product="product"
              :search-string="searchString"
              @delete:product="removeProduct($event)"
              @update:product-to-modify="productToModify = findProduct($event)"
              @update:product-to-duplicate="
                productToDuplicate = findProduct($event)
              "
            />
            <div class="mt-3"><CsvExportButton :products="products" /></div>
          </div>
        </div>
      </div>
      <div class="row" id="addFormsDiv">
        <span class="col-6">
          <NewProductForm @add:product="addProduct($event)"></NewProductForm
        ></span>
        <span class="col-6">
          <DuplicateProductForm
            :product="productToDuplicate"
            @add:product="
              addProduct($event), (productToDuplicate = EMPTY_PRODUCT)
            "
          ></DuplicateProductForm>
        </span>
      </div>
      <div class="row mt-5" id="modifyFormDiv">
        <ModifyProductForm
          :product="productToModify"
          @update:product="updateProduct($event)"
        ></ModifyProductForm>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
