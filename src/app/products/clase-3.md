### clase 3: Servicios y Almacenamiento Local

**Título:** Catálogo de Productos - Servicios y Gestión de Carrito (en Memoria)

**Descripción:** Se creará un servicio `ProductService` para manejar los datos de los productos y un servicio `CartService` para gestionar el carrito de compras en memoria. Se mostrará la cantidad de productos en el carrito.

**Pasos:**
1.  **Crear `ProductService` y `CartService`:**
    ```bash
    ng generate service products/product
    ng generate service products/cart
    ```
2.  **Implementar `ProductService`:**
    ```typescript
    // src/app/products/product.service.ts
    import { Injectable } from '@angular/core';
    import { Observable, of } from 'rxjs';
    import { Product } from './product-card/product-card.component';

    @Injectable({
      providedIn: 'root' // Or 'products' module if preferred
    })
    export class ProductService {
      private products: Product[] = [
        { id: 1, name: 'Camiseta Deportiva', category: 'ropa', price: 29.99, imageUrl: 'assets/camiseta-deportiva.jpg', description: 'Camiseta de secado rápido, ideal para entrenamientos intensos.' },
        { id: 2, name: 'Zapatillas Running Pro', category: 'calzado', price: 89.99, imageUrl: 'assets/zapatillas-running.jpg', description: 'Diseñadas para máxima amortiguación y retorno de energía.' },
        { id: 3, name: 'Jeans Slim Fit', category: 'ropa', price: 45.00, imageUrl: 'assets/jeans-slimfit.jpg', description: 'Comodidad y estilo en un diseño moderno y ajustado.' },
        { id: 4, name: 'Sandalias Verano', category: 'calzado', price: 19.50, imageUrl: 'assets/sandalias-verano.jpg', description: 'Frescas y ligeras, perfectas para días calurosos.' },
        { id: 5, name: 'Chaqueta Impermeable', category: 'ropa', price: 79.99, imageUrl: 'assets/chaqueta-impermeable.jpg', description: 'Protección contra la lluvia y el viento, con diseño transpirable.' },
        { id: 6, name: 'Vestido Floreado', category: 'ropa', price: 55.00, imageUrl: 'assets/vestido-floreado.jpg', description: 'Elegante vestido con estampado floral, perfecto para primavera.' },
        { id: 7, name: 'Botines de Cuero', category: 'calzado', price: 120.00, imageUrl: 'assets/botines-cuero.jpg', description: 'Botines de cuero genuino, ideales para el otoño e invierno.' },
        { id: 8, name: 'Pantalón Chino', category: 'ropa', price: 39.99, imageUrl: 'assets/pantalon-chino.jpg', description: 'Pantalón versátil y cómodo, disponible en varios colores.' }
      ];

      constructor() { }

      getProducts(): Observable<Product[]> {
        return of(this.products);
      }

      getProductById(id: number): Observable<Product | undefined> {
        return of(this.products.find(p => p.id === id));
      }
    }
    ```
3.  **Implementar `CartService`:**
    ```typescript
    // src/app/products/cart.service.ts
    import { Injectable } from '@angular/core';
    import { BehaviorSubject, Observable } from 'rxjs';
    import { Product } from './product-card/product-card.component';

    interface CartItem extends Product {
      quantity: number;
    }

    @Injectable({
      providedIn: 'root' // Or 'products' module
    })
    export class CartService {
      private cartItems: CartItem[] = [];
      private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
      private totalItemsSubject = new BehaviorSubject<number>(0);

      constructor() {
        this.loadCartFromLocalStorage();
      }

      private saveCartToLocalStorage(): void {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        this.updateTotalItems();
      }

      private loadCartFromLocalStorage(): void {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
          this.cartItems = JSON.parse(storedCart);
          this.cartSubject.next(this.cartItems);
          this.updateTotalItems();
        }
      }

      getCart(): Observable<CartItem[]> {
        return this.cartSubject.asObservable();
      }

      getTotalItems(): Observable<number> {
        return this.totalItemsSubject.asObservable();
      }

      addItem(product: Product): void {
        const existingItem = this.cartItems.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.cartItems.push({ ...product, quantity: 1 });
        }
        this.cartSubject.next(this.cartItems);
        this.saveCartToLocalStorage();
      }

      removeItem(productId: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
        this.cartSubject.next(this.cartItems);
        this.saveCartToLocalStorage();
      }

      clearCart(): void {
        this.cartItems = [];
        this.cartSubject.next(this.cartItems);
        this.saveCartToLocalStorage();
      }

      private updateTotalItems(): void {
        const total = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        this.totalItemsSubject.next(total);
      }
    }
    ```
4.  **Integrar Servicios en `ProductListComponent`:**
    * **Add `MatBadgeModule`** for the cart item count display.
    ```typescript
    // src/app/products/products.module.ts (Add MatBadgeModule)
    import { MatBadgeModule } from '@angular/material/badge'; // Add this

    @NgModule({
      declarations: [
        ProductListComponent,
        ProductCardComponent
      ],
      imports: [
        CommonModule,
        ProductsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule // Add this
      ]
    })
    export class ProductsModule { }
    ```

    ```typescript
    // src/app/products/product-list/product-list.component.ts (Update with services)
    import { Component, OnInit, OnDestroy } from '@angular/core';
    import { Product } from '../product-card/product-card.component';
    import { ProductService } from '../product.service'; // Import ProductService
    import { CartService } from '../cart.service';     // Import CartService
    import { Subscription } from 'rxjs';

    @Component({
      selector: 'app-product-list',
      templateUrl: './product-list.component.html',
      styleUrls: ['./product-list.component.scss']
    })
    export class ProductListComponent implements OnInit, OnDestroy {
      products: Product[] = [];
      cartItemCount: number = 0;
      private cartSubscription!: Subscription; // To manage subscription

      constructor(
        private productService: ProductService,
        private cartService: CartService
      ) { }

      ngOnInit(): void {
        this.productService.getProducts().subscribe(products => {
          this.products = products;
        });

        this.cartSubscription = this.cartService.getTotalItems().subscribe(count => {
          this.cartItemCount = count;
        });
      }

      ngOnDestroy(): void {
        if (this.cartSubscription) {
          this.cartSubscription.unsubscribe(); // Prevent memory leaks
        }
      }

      onAddToCart(product: Product): void {
        this.cartService.addItem(product);
        console.log('Product added to cart:', product.name);
      }
    }
    ```

    ```html
    <div class="product-list-container">
      <mat-toolbar color="primary">
        <span>Catálogo de Productos</span>
        <span class="spacer"></span>
        <button mat-icon-button class="cart-button" aria-label="Carrito de compras"
                [matBadge]="cartItemCount" matBadgeColor="accent"
                matBadgeOverlap="false" matBadgePosition="below after">
          <mat-icon>shopping_cart</mat-icon>
        </button>
      </mat-toolbar>

      <div class="product-grid">
        <app-product-card
          *ngFor="let product of products"
          [product]="product"
          (addToCart)="onAddToCart($event)"
        ></app-product-card>
      </div>

      <p *ngIf="products.length === 0" class="no-products-message">No se encontraron productos.</p>
    </div>
    ```

    ```scss
    /* src/app/products/product-list/product-list.component.scss (Add cart button styling) */
    // ... existing styles ...

    mat-toolbar {
      display: flex;
      justify-content: space-between; // Align items to ends
      align-items: center;

      .spacer {
        flex: 1 1 auto; // Push cart button to the right
      }

      .cart-button {
        margin-left: 15px;
      }
    }
    ```