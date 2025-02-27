<script setup lang="ts">
import { type Product, StockStatus } from "../scripts/types"
import { ref } from "vue"

const props = defineProps<{
  product: Product
}>()

const emits = defineEmits(["delete:product"])

const accordionId: string = "accordion" + props.product.id
const accordionIdLocator: string = "#" + accordionId
const stockColorIndicator = ref<StockStatus>()
const productDeletionConfirmation = ref<boolean>(false)

if (props.product.stock >= 5) stockColorIndicator.value = StockStatus.OK
else if (props.product.stock > 0) stockColorIndicator.value = StockStatus.DANGER
else stockColorIndicator.value = StockStatus.OUT
</script>
<template>
  <div class="accordion-item bg-dark">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed container"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="accordionIdLocator"
        accordionId
        aria-expanded="false"
        :aria-controls="accordionId"
      >
        <div class="row">
          <span class="col-6 fs-3">{{ product.name }}</span>
          <span
            class="bg-danger rounded justify-content-left col-6 text-light"
            v-if="stockColorIndicator === StockStatus.OUT"
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
          <li class="rounded list-group-item py-2" :class="stockColorIndicator">
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
        >
        <div v-if="productDeletionConfirmation" class="text-danger mt-3">
          Êtes-vous sûr de vouloir effacer ce produit?
          <div>
            <button
              type="button"
              class="btn btn-info"
              @click="productDeletionConfirmation = false"
            >
              Retour
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
<style scoped></style>
