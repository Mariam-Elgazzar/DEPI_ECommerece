import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent implements OnInit {
  id:number=0
  data:any={}
  
  constructor(private route:ActivatedRoute,private service:ProductsService){
  }
  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id')) 
    this.getproduct()
  }
  
  getproduct(){
    this.service.getproductsByID(this.id).subscribe(res=>{
      this.data=res
    })
  }
}
