import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
// Rutas 
import { ProductListComponent } from './product-list/product-list.component';    
import { ProductDetailComponent } from './product-detail/product-detail.component'; // Import new component

// const routes: Routes = [{ path: '', component: ProductsComponent }];
const routes: Routes = [
      { path: '', component: ProductListComponent }, // Default route for /products
      { path: ':id', component: ProductDetailComponent } // Route for /products/:id
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
