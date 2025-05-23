// src/app/products/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product-card/product-card.component';
import { CartService } from '../cart.service'; // To allow adding from detail page
@Component({
  selector: 'app-product-detail',
  standalone:false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService, // Inject CartService
    private router: Router
  ) { }
  ngOnInit(): void {    
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));
      if (productId) {
        this.productService.getProductById(productId).subscribe(product => {
          this.product = product;
          if (!this.product) {
            console.warn(`Product with ID ${productId} not found.`);
            this.router.navigate(['/products']); // Redirect if not found
          }
        });
      }
    });
  }
  onAddToCart(): void {
    if (this.product) {
      this.cartService.addItem(this.product);
      console.log('Product added to cart from detail:', this.product.name);
      // Optionally show a snackbar confirmation
    }
  }
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
