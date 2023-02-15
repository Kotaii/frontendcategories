import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category} from "../models/category"

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  public addNewCategory(category: FormData) {
    return this.httpClient.post<Category>("http://localhost:9090/addNewCategory", category);
  }

  


  // getCategories() {
  //   return this.httpClient.get<any[]>("./../../assets/json/categories.json");
  // }
}