import { Component, OnInit } from '@angular/core';
import { Prod } from '../../../models/prod';
import { ProductadminService } from '../services2/productadmin.service';
import { CommonModule } from '@angular/common';
import { SelectComponent } from "../../shared/select/select.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productadmin',
  standalone: true,
  imports: [CommonModule, SelectComponent,ReactiveFormsModule,RouterLink],
  templateUrl: './productadmin.component.html',
  styleUrl: './productadmin.component.css'
})
export class ProductadminComponent implements OnInit {
  products:Prod[]=[];
  loading:boolean=false
  category:string[]=[];
  base64:any='';
  form!:FormGroup

  constructor(private prdservice:ProductadminService,private build:FormBuilder){}

  ngOnInit(): void {
    this.form=this.build.group({
      title: ['',[Validators.required]],
      price: ['',[Validators.required]],
      description: ['',[Validators.required]],
      image: ['',[Validators.required]],
      category: ['',[Validators.required]]
    })
    this.getproducts()
    this.getCategories()
  }

  getproducts(){
    this.prdservice.getallproducts().subscribe((res:any)=>{
      // console.log(res)
      this.products=res
    })
  }

  getCategories(){
    this.prdservice.getAllcategories().subscribe((res:any)=>{
      this.category=res
    })
   }

  getselectedcategory(event:any){
    this.form.get('category')?.setValue(event)
  }

  getimagepath(event:any){
    let file=event.target.files[0];
    let reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      this.base64=reader.result
      this.form.get('image')?.setValue('added')
    }
  }

  addproduct(){
    let model =this.form.value
    this.prdservice.createproduct(model).subscribe(res=>
      alert("product added")
    )
  }

  update(item:any){
    // this.form.get('image')?.setValue(item.image)
    // this.form.get('title')?.setValue(item.title)
    // this.form.get('description')?.setValue(item.description)
    // this.form.get('price')?.setValue(item.price)
    // this.form.get('category')?.setValue(item.category)
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description:item.description,
      image:item.image,
      category: item.category
    })
    this.base64=item.image
    let model=this.form.value
    this.prdservice.updateproduct(model).subscribe(res=>{
    })

  }
}
