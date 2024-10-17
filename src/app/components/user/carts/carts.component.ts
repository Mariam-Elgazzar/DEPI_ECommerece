import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartsService } from '../../../services/carts.service';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {
  cartproducts:any[]=[]
  totalprice:any=0
  success:boolean=false
  constructor(private service:CartsService){}
  ngOnInit(): void {
    this.getcarproducts();
    this.orderTotalprice()
  }

  getcarproducts(){
    if('cart' in localStorage){
      this.cartproducts = JSON.parse(localStorage.getItem('cart')!)
   }
 }

 orderTotalprice(){
  this.totalprice=0;
  for(let x in this.cartproducts){
    this.totalprice += this.cartproducts[x].item.price * this.cartproducts[x].quantity
  }
 }

 increaseamount(index:number){
  this.cartproducts[index].quantity++
  this.orderTotalprice()
  localStorage.setItem('cart',JSON.stringify(this.cartproducts))
 }

 decreaseamount(index:number){
  this.cartproducts[index].quantity--
  this.orderTotalprice()
  localStorage.setItem('cart',JSON.stringify(this.cartproducts))
 }

 detectchange(){
  this.orderTotalprice()
  localStorage.setItem('cart',JSON.stringify(this.cartproducts))
 }

 deleteproduct(index:number){
  this.cartproducts.splice(index,1)
  this.orderTotalprice()
  localStorage.setItem('cart',JSON.stringify(this.cartproducts))
 }

 clearcart(){
  this.cartproducts=[]
  this.orderTotalprice()
  localStorage.setItem('cart',JSON.stringify(this.cartproducts))
 }

 addcart(){
  let products =this.cartproducts.map(item=>{
    return{productId:item.item.id,quantity:item.quantity}
  })
  let model ={
    userID:5,
    date:new Date(),
    products:products
  }
  this.service.createnewcart(model).subscribe(res=>{
    this.success=!this.success
  })
  // console.log(model)
 }
} 
