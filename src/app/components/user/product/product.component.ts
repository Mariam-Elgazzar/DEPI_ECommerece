import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { Prod } from '../../../models/prod';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
@Input() data!:Prod;
@Output() item = new EventEmitter();
addbutton:boolean=false;
amount:number=0
constructor(private prdservice:ProductsService,private router:Router){}
ngOnInit(): void {
}
add(){
  this.item.emit({item:this.data,quantity:this.amount})
}

openproductdetails(prdID:number){
  this.router.navigate(['details',prdID])
 }

}
