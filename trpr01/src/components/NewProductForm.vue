<script setup lang="ts">
import { ref } from "vue"
import * as CONSTS from "../scripts/consts"

const emits = defineEmits(["add:product"])

const newName = ref<string>("")
const newDescription = ref<string>("")
const newPrice = ref<number>(0)
const newStock = ref<number>(0)
const newNameErrortext = ref<string>("")
const newPriceErrortext = ref<string>("")
const newStockErrortext = ref<string>("")

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

//https://www.geeksforgeeks.org/how-to-convert-string-to-number-in-typescript/
function sendForm(): void {
  if (validateForm()) {
    emits.call("add:product", "add:product", [
      newName.value,
      newDescription.value,
      +newPrice.value.toFixed(2),
      +newStock.value.toFixed(0)
    ])
    resetForm()
  }
}

function resetForm(): void {
  newName.value = ""
  newDescription.value = ""
  newPrice.value = 0
  newStock.value = 0
}
</script>

<template>
  <form novalidate>
    <fieldset class="border px-3 py-3 border-success rounded">
      <h2 class="text-success">Ajouter un produit</h2>
      <div class="row">
        <div class="col-6">
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
        <div class="col-6">
          <label for="newDescription" class="label-form">Description</label>
          <input
            type="text"
            class="form-control"
            id="newDescription"
            v-model="newDescription"
          />
        </div>
        <div class="col-4 mt-3">
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
        <div class="col-4 mt-3">
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
        <div>
          <button
            type="button"
            class="btn btn-success mt-3"
            @click="sendForm()"
          >
            Ajouter
          </button>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<style scoped></style>
