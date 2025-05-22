### clase 4: Formularios de Búsqueda y Filtrado

**Título:** Catálogo de Productos - Búsqueda y Filtrado

**Descripción:** Se implementará un formulario con un campo de búsqueda para filtrar la lista de productos por nombre o categoría. Se incluirán validaciones básicas para la entrada del usuario.

**Pasos:**
1.  **Habilitar Formularios Reactivos:**
    ```typescript
    // src/app/products/products.module.ts (Add ReactiveFormsModule, MatFormFieldModule, MatInputModule)
    import { ReactiveFormsModule } from '@angular/forms';
    import { MatFormFieldModule } from '@angular/material/form-field';
    import { MatInputModule } from '@angular/material/input';
    import { MatSelectModule } from '@angular/material/select'; // For category filter

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
        MatBadgeModule,
        ReactiveFormsModule, // Add this
        MatFormFieldModule,  // Add this
        MatInputModule,      // Add this
        MatSelectModule      // Add this
      ]
    })
    export class ProductsModule { }
    ```
2.  **Crear Formulario y Lógica de Filtrado en `ProductListComponent`:**
    ```typescript
    // src/app/products/product-list/product-list.component.ts (Update with filter logic)
    import { Component, OnInit, OnDestroy } from '@angular/core';
    import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder, FormGroup
    import { Product } from '../product-card/product-card.component';
    import { ProductService } from '../product.service';
    import { CartService } from '../cart.service';
    import { Subscription, combineLatest } from 'rxjs'; // Import combineLatest
    import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators'; // Import operators

    @Component({
      selector: 'app-product-list',
      templateUrl: './product-list.component.html',
      styleUrls: ['./product-list.component.scss']
    })
    export class ProductListComponent implements OnInit, OnDestroy {
      allProducts: Product[] = []; // Store all products
      filteredProducts: Product[] = []; // Products shown in the list
      cartItemCount: number = 0;
      filterForm: FormGroup; // Declare filter form
      private subscriptions: Subscription = new Subscription(); // To manage multiple subscriptions

      constructor(
        private productService: ProductService,
        private cartService: CartService,
        private fb: FormBuilder // Inject FormBuilder
      ) {
        this.filterForm = this.fb.group({
          searchTerm: [''],
          category: ['all'] // 'all' for no category filter
        });
      }

      ngOnInit(): void {
        // Load all products once
        this.subscriptions.add(
          this.productService.getProducts().subscribe(products => {
            this.allProducts = products;
            this.applyFilters(); // Apply filters immediately after loading
          })
        );

        // Subscribe to form value changes for filtering
        const searchTermChanges = this.filterForm.get('searchTerm')?.valueChanges.pipe(
          startWith(''), // Emit initial value
          debounceTime(300), // Wait 300ms after last keystroke
          distinctUntilChanged() // Only emit if value truly changed
        );

        const categoryChanges = this.filterForm.get('category')?.valueChanges.pipe(
          startWith('all') // Emit initial value
        );

        this.subscriptions.add(
          combineLatest([searchTermChanges!, categoryChanges!])
            .subscribe(([searchTerm, category]) => {
              this.applyFilters(searchTerm, category);
            })
        );

        this.subscriptions.add(
          this.cartService.getTotalItems().subscribe(count => {
            this.cartItemCount = count;
          })
        );
      }

      ngOnDestroy(): void {
        this.subscriptions.unsubscribe(); // Unsubscribe all at once
      }

      applyFilters(searchTerm: string = '', category: string = 'all'): void {
        let tempProducts = [...this.allProducts]; // Start with all products

        // Apply search term filter
        if (searchTerm && searchTerm.trim() !== '') {
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          tempProducts = tempProducts.filter(product =>
            product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.description.toLowerCase().includes(lowerCaseSearchTerm)
          );
        }

        // Apply category filter
        if (category !== 'all') {
          tempProducts = tempProducts.filter(product => product.category === category);
        }

        this.filteredProducts = tempProducts;
      }

      onAddToCart(product: Product): void {
        this.cartService.addItem(product);
        console.log('Producto añadido al carrito:', product.name);
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

      <mat-card class="filter-card">
        <mat-card-content>
          <form [formGroup]="filterForm" class="filter-form">
            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Buscar Productos</mat-label>
              <input matInput formControlName="searchTerm" placeholder="Nombre o descripción">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Categoría</mat-label>
              <mat-select formControlName="category">
                <mat-option value="all">Todas</mat-option>
                <mat-option value="ropa">Ropa</mat-option>
                <mat-option value="calzado">Calzado</mat-option>
              </mat-select>
            </mat-form-field>
          </form>
        </mat-card-content>
      </mat-card>

      <div class="product-grid">
        <app-product-card
          *ngFor="let product of filteredProducts"
          [product]="product"
          (addToCart)="onAddToCart($event)"
        ></app-product-card>
      </div>

      <p *ngIf="filteredProducts.length === 0" class="no-products-message">No se encontraron productos que coincidan con la búsqueda.</p>
    </div>
    ```

    ```scss
    /* src/app/products/product-list/product-list.component.scss (Add filter form styling) */
    // ... existing styles ...

    .filter-card {
      width: 100%;
      max-width: 1200px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
    }

    .filter-form {
      display: flex;
      gap: 20px;
      padding: 15px;
      flex-wrap: wrap; // Allow wrapping on smaller screens
      justify-content: center; // Center filter fields
    }

    .filter-field {
      min-width: 200px;
      width: calc(50% - 10px); // Approx half width, accounting for gap
    }

    @media (max-width: 768px) {
      .filter-field {
        width: 100%; // Full width on smaller screens
      }
    }
    ```