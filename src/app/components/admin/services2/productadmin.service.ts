import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductadminService {

  constructor(private http:HttpClient) { }

  getallproducts(){
    return this.http.get(constant.API_END_POINT+'products')
  }

  getAllcategories(){
    return this.http.get(constant.API_END_POINT+"products/categories")
   }

   createproduct(model:any){
    return this.http.post(constant.API_END_POINT+'products',model)
   }

   updateproduct(model:any){
    return this.http.post(constant.API_END_POINT+'products',model)
   }

  //  getproductsByCategory(keyword:string){
  //   return this.http.get(constant.API_END_POINT+'products/category/'+keyword)
  // }
}
