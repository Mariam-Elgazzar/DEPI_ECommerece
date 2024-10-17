import { Routes } from '@angular/router';
import { AllproductsComponent } from './components/user/allproducts/allproducts.component';
import { ProductdetailsComponent } from './components/user/productdetails/productdetails.component';
import { CartsComponent } from './components/user/carts/carts.component';
import { ErrorpathComponent } from './components/errorpath/errorpath.component';
import { CartsComponentadmin } from './components/admin/cartsadmin/carts.component';
import { ProductadminComponent } from './components/admin/productadmin/productadmin.component';
import { ProductComponent } from './components/user/product/product.component';

export const routes: Routes = [
    {path:"",component:AllproductsComponent,pathMatch:"full"},
    {path:"products",component:AllproductsComponent},
    {path:"details/:id",component:ProductdetailsComponent},
    {path:"cart",component:CartsComponent},
    {path:"**",component:ErrorpathComponent}
];
