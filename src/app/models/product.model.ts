import { FileHandle } from "./file-handle.model";

export interface Products {
    productId:number,
    productName: string,
    productDescription: string,
    price: number,
    productImages: FileHandle,
    categoryId:number
}