import type { Product } from "./types"

export const INVALID_NEW_NAME_MESSAGE :string = "Le produit doit avoir un nom."
export const INVALID_NEW_PRICE_MESSAGE :string = "Le prix doit être positif."
export const INVALID_NEW_STOCK_MESSAGE :string = "Le stock doit être un nombre entier positif."

export const EMPTY_PRODUCT: Product = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0
  }