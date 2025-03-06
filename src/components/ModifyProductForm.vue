<script setup lang="ts">
import { ref, watch } from "vue"
import * as CONSTS from "../scripts/consts"
import type { Product } from "../scripts/types"

const props = defineProps<{
  product: Product
}>()

const emits = defineEmits(["update:product"])

const newName = ref<string>(props.product.name)
const newDescription = ref<string>(props.product.description)
const newPrice = ref<number>(props.product.price)
const newStock = ref<number>(props.product.stock)
const newNameErrortext = ref<string>("")
const newPriceErrortext = ref<string>("")
const newStockErrortext = ref<string>("")

watch(
  () => props.product,
  (newValue) => {
    updateValues(newValue)
  }
)

function updateValues(newProduct: Product): void {
  newName.value = newProduct.name
  newDescription.value = newProduct.description
  newPrice.value = newProduct.price
  newStock.value = newProduct.stock
  newNameErrortext.value = ""
  newPriceErrortext.value = ""
  newStockErrortext.value = ""
}

function validateName(): boolean {
  return newName.value.trim() === ""
}

function validatePrice(): boolean {
  return newPrice.value.toString() === "" || newPrice.value < 0
}

function validateStock(): boolean {
  return newStock.value.toString() === "" || newStock.value < 0
}

function validateForm(): boolean {
  let isValid: boolean = true

  if (validateName()) {
    isValid = false
    newNameErrortext.value = CONSTS.INVALID_NEW_NAME_MESSAGE
  } else {
    newNameErrortext.value = ""
  }

  if (validatePrice()) {
    isValid = false
    newPriceErrortext.value = CONSTS.INVALID_NEW_PRICE_MESSAGE
  } else {
    newPriceErrortext.value = ""
  }

  if (validateStock()) {
    isValid = false
    newStockErrortext.value = CONSTS.INVALID_NEW_STOCK_MESSAGE
  } else {
    newStockErrortext.value = ""
  }

  return isValid
}

// J'ai utilisé ce site pour trouver comment transformer un string en number:
// https://www.geeksforgeeks.org/how-to-convert-string-to-number-in-typescript/
function sendForm(): void {
  if (validateForm()) {
    emits.call("update:product", "update:product", {
      id: props.product.id,
      name: newName.value,
      description: newDescription.value,
      price: +newPrice.value.toFixed(2),
      stock: +newStock.value.toFixed(0)
    })
  }
}
</script>

<template>
  <form novalidate>
    <fieldset class="border px-3 py-3 border-warning rounded">
      <h2 class="text-warning">Modifier un produit</h2>
      <div class="row">
        <div class="col-6" id="name">
          <label for="newName" class="label-form">Nom*</label>
          <input
            type="text"
            class="form-control"
            id="newName"
            v-model="newName"
          />
          <div class="text-danger">
            {{ newNameErrortext }}
          </div>
        </div>
        <div class="col-6" id="description">
          <label for="newDescription" class="label-form">Description</label>
          <input
            type="text"
            class="form-control"
            id="newDescription"
            v-model="newDescription"
          />
        </div>
        <div class="col-4 mt-3" id="price">
          <label for="newPrice" class="label-form">Prix*</label>
          <input
            type="number"
            class="form-control"
            id="newPrice"
            step="0.01"
            v-model="newPrice"
          />
          <div class="text-danger">{{ newPriceErrortext }}</div>
        </div>
        <div class="col-4 mt-3" id="stock">
          <label for="newStock" class="label-form">Stock*</label>
          <input
            type="number"
            class="form-control"
            id="newStock"
            v-model="newStock"
          />
          <div class="text-danger">
            {{ newStockErrortext }}
          </div>
        </div>
        <div id="sendButton">
          <button
            type="button"
            class="btn btn-warning mt-3"
            :disabled="product.id === 0 ? true : false"
            @click="sendForm()"
          >
            Modifier
          </button>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<style scoped></style>
