export interface Product{
    id:number
    name:string
    description:string
    price:number
    stock:number
}

export enum StockStatus{
    OK = "bg-success",
    DANGER=  "bg-warning",
    OUT = "bg-danger"
}