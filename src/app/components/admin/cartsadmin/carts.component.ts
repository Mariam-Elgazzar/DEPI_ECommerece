import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartsService } from '../services2/cartsadmin.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponentadmin implements OnInit {
  constructor(private service:CartsService,private build:FormBuilder,private prdservice:ProductsService){}
  carts:any[]=[];
  form!:FormGroup;
  products: any[]=[];
  total=0;
  details:any

  ngOnInit(): void {
    this.form=this.build.group({
      start:[''],
      end:['']
    })
    this.getallcarts()
  }

  getallcarts(){
    this.service.getallcarts().subscribe((res:any)=>{
      this.carts=res
    })
  }

  applyfilter(){
    let date=this.form.value
    this.service.getallcarts(date).subscribe((res:any)=>{
      this.carts=res
    })
  }

  deletecart(id:number){
    this.service.deletecart(id).subscribe(res=>{
      this.getallcarts()
      alert('cart deleted')
    })
  }
  

  view(index:number){
    this.products=[]
    this.details=this.carts[index]
    for(let x in this.details.products){
      this.prdservice.getproductsByID(this.details.products[x].productId).subscribe(res=>{
        this.products.push({item:res,quantity:this.details.products[x].quantity})
      })
    }
  }
} 
