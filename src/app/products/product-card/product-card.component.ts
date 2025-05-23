// src/app/products/product-card/product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
export interface Product {
  id: number;
  name: string;
  category: 'ropa' | 'calzado';
  price: number;
  imageUrl: string;
  description: string;
}
@Component({
  selector: 'app-product-card',
  standalone:false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  onAddToCart(): void {
    this.addToCart.emit(this.product);
    // alert(this.product) 
  }
}