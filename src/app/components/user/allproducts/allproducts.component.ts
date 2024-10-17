import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { SelectComponent } from "../../shared/select/select.component";
import { ProductComponent } from "../product/product.component";
import { Router, RouterLink } from '@angular/router';
import { Prod } from '../../../models/prod';
@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, SelectComponent, ProductComponent,RouterLink],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent implements OnInit {
  products:Prod[]=[];
  category:string[]=[];
  loading:boolean=false;
  cartproducts:any[]=[];
  constructor(private prdservice:ProductsService,private router:Router){}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories()
  }

    getProducts(){
      this.loading=true
      this.prdservice.getAllproducts().subscribe((res:any)=>{
      this.products=res
      this.loading=false
      }
      )
    }

    getCategories(){
      this.loading=true
      this.prdservice.getAllcategories().subscribe((res:any)=>{
        this.category=res
        this.loading=false

      })
     }

     filtercategory(event:any){
      let value=event.target.value;
      if(value == "all"){
        this.getProducts()
      }
      else{
        this.getproductsCategory(value)
      }
     }

     getproductsCategory(keyword:string){
      this.loading=true
      this.prdservice.getproductsByCategory(keyword).subscribe((res:any)=>{
        this.products=res
        this.loading=false 
      })
     }

     addtocart(event:any){
      if('cart' in localStorage){
        this.cartproducts = JSON.parse(localStorage.getItem('cart')!)
        let exist = this.cartproducts.find(item=>item.item.id==event.item.id)
        if(exist){
          alert("product is already in the cart")
        }
        else{
          this.cartproducts.push(event);
          localStorage.setItem('cart',JSON.stringify(this.cartproducts))
        }
      }
      else{
        this.cartproducts.push(event);
        localStorage.setItem('cart',JSON.stringify(this.cartproducts))
      }
     }

    //  openproductdetails(prdID:number){
    //   this.router.navigate(['details',prdID])
    //  }
}
