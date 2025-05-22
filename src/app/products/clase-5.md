### clase 5: Rutas (Catálogo de Productos)

**Título:** Catálogo de Productos - Rutas y Navegación Detallada

**Descripción:** Se configurarán las rutas para la aplicación de catálogo de productos, permitiendo navegar entre la lista de productos y una vista de detalles para cada producto. La navegación al detalle se realizará al hacer clic en una tarjeta de producto.

**Pasos:**
1.  **Definir Rutas en `products-routing.module.ts`:**
    ```typescript
    // src/app/products/products-routing.module.ts
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { ProductListComponent } from './product-list/product-list.component';
    import { ProductDetailComponent } from './product-detail/product-detail.component'; // Import new component

    const routes: Routes = [
      { path: '', component: ProductListComponent }, // Default route for /products
      { path: ':id', component: ProductDetailComponent } // Route for /products/:id
    ];

    @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
    export class ProductsRoutingModule { }
    ```
2.  **Crear `ProductDetailComponent`:**
    ```bash
    ng generate component products/product-detail
    ```
    * **Add `ProductDetailComponent` to `products.module.ts` declarations.**
    ```typescript
    // src/app/products/products.module.ts (Add ProductDetailComponent)
    // ... (existing imports)
    import { ProductDetailComponent } from './product-detail/product-detail.component'; // Add this

    @NgModule({
      declarations: [
        ProductListComponent,
        ProductCardComponent,
        ProductDetailComponent // Add this
      ],
      imports: [
        CommonModule,
        ProductsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ]
    })
    export class ProductsModule { }
    ```
3.  **Implementar Navegación en `ProductCardComponent` (o en un envoltorio):**
    We'll make the entire `mat-card` clickable for navigation.
    ```html
    <mat-card class="product-card" [routerLink]="['/products', product.id]">
      <img mat-card-image [src]="product.imageUrl" [alt]="product.name">
      <mat-card-content>
        <mat-card-title>{{ product.name }}</mat-card-title>
        <mat-card-subtitle>{{ product.category | titlecase }}</mat-card-subtitle>
        <p class="price">{{ product.price | currency:'USD':'symbol':'1.2-2' }}</p>
        <p class="description">{{ product.description }}</p>
      </mat-card-content>
      <mat-card-actions class="card-actions">
        <button mat-raised-button color="primary" (click)="onAddToCart(); $event.stopPropagation()">
          <mat-icon>add_shopping_cart</mat-icon> Añadir al Carrito
        </button>
      </mat-card-actions>
    </mat-card>
    ```
    * **Note:** `(click)="onAddToCart(); $event.stopPropagation()"` is crucial here. `$event.stopPropagation()` prevents the `routerLink` on the `mat-card` from triggering when the "Add to Cart" button is clicked.

4.  **Recuperar Parámetros de Ruta en `ProductDetailComponent`:**
    ```typescript
    // src/app/products/product-detail/product-detail.component.ts
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute, Router } from '@angular/router';
    import { ProductService } from '../product.service';
    import { Product } from '../product-card/product-card.component';
    import { CartService } from '../cart.service'; // To allow adding from detail page

    @Component({
      selector: 'app-product-detail',
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
    ```

    ```html
    <div class="product-detail-container">
      <mat-card *ngIf="product" class="product-detail-card">
        <mat-card-header>
          <mat-card-title>{{ product.name }}</mat-card-title>
          <mat-card-subtitle>{{ product.category | titlecase }}</mat-card-subtitle>
        </mat-card-header>
        <img mat-card-image [src]="product.imageUrl" [alt]="product.name">
        <mat-card-content>
          <p class="detail-price">{{ product.price | currency:'USD':'symbol':'1.2-2' }}</p>
          <p class="detail-description">{{ product.description }}</p>
          <h3>Detalles del Producto:</h3>
          <ul>
            <li>**ID:** {{ product.id }}</li>
            <li>**Categoría:** {{ product.category | titlecase }}</li>
          </ul>
        </mat-card-content>
        <mat-card-actions class="detail-actions">
          <button mat-raised-button color="primary" (click)="onAddToCart()">
            <mat-icon>add_shopping_cart</mat-icon> Añadir al Carrito
          </button>
          <button mat-flat-button color="accent" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Volver al Catálogo
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card *ngIf="!product" class="product-detail-card">
        <mat-card-header>
          <mat-card-title>Producto No Encontrado</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Lo sentimos, el producto que buscas no existe.</p>
        </mat-card-content>
        <mat-card-actions class="detail-actions">
          <button mat-flat-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Volver al Catálogo
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
    ```

    ```scss
    /* src/app/products/product-detail/product-detail.component.scss */
    .product-detail-container {
      padding: 20px;
      display: flex;
      justify-content: center;
      background-color: #f0f2f5;
      min-height: 100vh;
    }

    .product-detail-card {
      width: 100%;
      max-width: 700px;
      margin-top: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border-radius: 10px;

      mat-card-header {
        background-color: #e8eaf6;
        padding: 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      mat-card-title {
        font-size: 2em;
        font-weight: 700;
        color: #3f51b5;
      }

      mat-card-subtitle {
        font-size: 1.1em;
        color: #673ab7;
      }

      img {
        width: 100%;
        max-height: 400px;
        object-fit: contain; // Keep aspect ratio, fit within bounds
        margin: 20px 0;
        border-radius: 8px;
      }

      mat-card-content {
        padding: 0 20px 20px;
      }

      .detail-price {
        font-size: 1.8em;
        font-weight: bold;
        color: #4caf50;
        margin-bottom: 15px;
      }

      .detail-description {
        font-size: 1.1em;
        line-height: 1.6;
        color: #444;
        margin-bottom: 20px;
      }

      h3 {
        margin-top: 20px;
        margin-bottom: 10px;
        color: #3f51b5;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        margin-bottom: 8px;
        color: #555;
      }

      .detail-actions {
        display: flex;
        justify-content: space-between;
        padding: 15px 20px 20px;
        border-top: 1px solid #eee;
        gap: 10px; // Add space between buttons

        button {
          flex-grow: 1; // Make buttons fill available space
          height: 48px;
        }
      }

      @media (max-width: 600px) {
        .detail-actions {
          flex-direction: column;
        }
      }
    }
    ```