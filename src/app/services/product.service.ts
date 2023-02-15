import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Products } from "../models/products";



@Injectable({
    providedIn: 'root'

})
export class ProductService {
    constructor(private httpClient: HttpClient) {}

    public addProduct(product: FormData){
        return this.httpClient.post<Products>("http://localhost:9090/addNewProduct", product);
    }
}