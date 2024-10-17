import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../components/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http:HttpClient) { }
  getAllproducts(){
    return this.http.get(constant.API_END_POINT+'products')
  }

  getAllcategories(){
   return this.http.get(constant.API_END_POINT+"products/categories")
  }

  getproductsByCategory(keyword:string){
    return this.http.get(constant.API_END_POINT+'products/category/'+keyword)
  }

  getproductsByID(id:number){
    return this.http.get(constant.API_END_POINT+'products/'+id)
  }
}
