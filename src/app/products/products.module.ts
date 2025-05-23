import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
// Componentes de la aplicación Product
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
// Modulos necesarioc
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// adicionamos el carrito
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar'; // Para la barra superior
import { MatSliderModule } from '@angular/material/slider';   // Para el slider de precios
import { MatListModule } from '@angular/material/list';       // Para mat-selection-list

//busqueda y filtro del producto
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // For category filter
// Detalle del producto
import { ProductDetailComponent } from './product-detail/product-detail.component'; // Add Detail
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [    
    ProductListComponent,
    ProductCardComponent,
    //Detalle del producto
    ProductDetailComponent,
    
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule, 

    MatButtonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    //Carrito
    MatBadgeModule,
    //busqueda y filtro del producto    
    MatFormFieldModule,  
    MatInputModule,      
    MatSelectModule,
    MatSliderModule,
    MatListModule,
    MatToolbarModule      
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule { }