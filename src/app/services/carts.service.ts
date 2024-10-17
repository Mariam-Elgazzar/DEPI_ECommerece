import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../components/constant/constant';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private http: HttpClient) {}

  createnewcart(model: any) {
    return this.http.post(constant.API_END_POINT + 'carts', model);
  }
}
