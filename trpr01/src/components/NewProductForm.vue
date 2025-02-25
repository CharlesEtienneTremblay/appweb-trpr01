<script setup lang="ts">
import { ref } from "vue"
</script>

<template>
  <form>
    <fieldset class="border px-3 py-3 border-success rounded">
      <h2>Ajouter un produit</h2>
      <div class="row">
        <div class="col-6">
          <label for="newNameField" class="label-form">Nom</label>
          <input type="text" class="form-control" />
        </div>
        <div class="col-6">
          <label for="newDescriptionField" class="label-form"
            >Description</label
          >
          <input type="text" class="form-control" />
        </div>
        <div class="col-2">
          <label for="newPriceField" class="label-form">Prix</label>
          <input type="number" class="form-control" />
        </div>
        <div class="col-2">
          <label for="newStockField" class="label-form">Stock</label>
          <input type="number" class="form-control" />
        </div>
      </div>
    </fieldset>
  </form>
</template>

<style scoped></style>
