<script setup lang="ts">
import { type Product, StockStatus } from "../scripts/types"
import { ref, watch } from "vue"

const props = defineProps<{
  product: Product
  searchString: String
}>()

const emits = defineEmits(["delete:product", "update:productToModify"])

const accordionId: string = "accordion" + props.product.id
const accordionIdLocator: string = "#" + accordionId
const stockStatus = ref<StockStatus>()
pickStockColorIndicator()
const productDeletionConfirmation = ref<boolean>(false)

watch(
  () => props.product.stock,
  () => {
    pickStockColorIndicator()
  }
)

function pickStockColorIndicator(): void {
  if (props.product.stock >= 5) stockStatus.value = StockStatus.OK
  else if (props.product.stock > 0) stockStatus.value = StockStatus.DANGER
  else stockStatus.value = StockStatus.OUT
}
</script>
<template>
  <div
    class="accordion-item bg-dark"
    v-if="product.name.toLowerCase().includes(searchString.trim())"
  >
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed container text-light"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="accordionIdLocator"
        aria-expanded="false"
        :aria-controls="accordionId"
      >
        <div class="row">
          <span class="col-8 fs-3">{{ product.name }}</span>
          <span
            class="bg-danger rounded justify-content-left col-4 text-light"
            v-if="stockStatus === StockStatus.OUT"
            >CE PRODUIT EST HORS DE STOCK</span
          >
        </div>
      </button>
    </h2>
    <div
      :id="accordionId"
      class="accordion-collapse collapse"
      data-bs-parent="#productsList"
    >
      <div class="accordion-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-dark text-light py-2">
            Description: {{ product.description }}
          </li>
          <li class="list-group-item bg-dark text-light py-2">
            Prix: {{ product.price }}$
          </li>
          <li class="rounded list-group-item py-2" :class="stockStatus">
            Stock: {{ product.stock }}
          </li>
        </ul>
        <span>
          <button
            type="button"
            class="btn btn-danger mt-5"
            @click="productDeletionConfirmation = true"
          >
            Supprimer
          </button></span
        ><span>
          <button
            type="button"
            class="btn btn-warning mt-5 ms-5"
            @click="$emit('update:productToModify', product.id)"
          >
            Modifier
          </button></span
        >
        <div v-if="productDeletionConfirmation" class="text-danger mt-3">
          Êtes-vous sûr de vouloir effacer ce produit?
          <div>
            <button
              type="button"
              class="btn btn-secondary"
              @click="productDeletionConfirmation = false"
            >
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-danger ms-5"
              @click="
                $emit('delete:product', product.id),
                  (productDeletionConfirmation = false)
              "
            >
              Effacer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.accordion-button {
  background: rgb(33, 37, 41, 255);
}
</style>
