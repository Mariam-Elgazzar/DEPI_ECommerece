import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  getallcarts(param?:any){
    let params = new HttpParams()
    params=params.append('startDate',param?.start).append('endDate',param?.end)
    return this.http.get(constant.API_END_POINT+'carts',{params:params})
  }

  deletecart(id:number){
    return this.http.delete(constant.API_END_POINT+'carts/'+id)

  }
}
