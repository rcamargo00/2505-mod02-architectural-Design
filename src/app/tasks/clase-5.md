### Detalles de la implementación 5: Rutas

**Título:** Gestor de Tareas - Configuración de Rutas y Navegación

**Descripción:** Se configuran rutas para la aplicación de tareas, permitiendo una navegación entre la lista de tareas y una futura vista de detalle de una tarea. Se implementará la navegación programática.

**Pasos:**
1.  **Definir Rutas en `tasks-routing.module.ts`:**
    ```typescript
    // src/app/tasks/tasks-routing.module.ts
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { TaskListComponent } from './task-list/task-list.component';
    import { TaskDetailComponent } from './task-detail/task-detail.component'; // Import new component

    const routes: Routes = [
      { path: '', component: TaskListComponent }, // Default route for /tasks
      { path: ':id', component: TaskDetailComponent } // Route for /tasks/:id
    ];

    @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
    export class TasksRoutingModule { }
    ```

2.  **Crear `TaskDetailComponent`:**
    ```bash
    ng generate component tasks/task-detail
    ```
    * **Add `TaskDetailComponent` to `tasks.module.ts` declarations.**

    ```typescript
    // src/app/tasks/tasks.module.ts (Add TaskDetailComponent)
    // ... (existing imports)
    import { TaskDetailComponent } from './task-detail/task-detail.component'; // Add this

    @NgModule({
      declarations: [
        TaskListComponent,
        TaskItemComponent,
        TaskDetailComponent // Add this
      ],
      imports: [
        CommonModule,
        TasksRoutingModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
    export class TasksModule { }
    ```

3.  **Implementar Navegación y Recuperar Parámetros de Ruta en `TaskDetailComponent`:**
    ```typescript
    // src/app/tasks/task-detail/task-detail.component.ts
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router
    import { TaskService } from '../task.service';
    import { Task } from '../task-item/task-item.component'; // Re-use Task interface

    @Component({
      selector: 'app-task-detail',
      templateUrl: './task-detail.component.html',
      styleUrls: ['./task-detail.component.scss']
    })
    export class TaskDetailComponent implements OnInit {
      task: Task | undefined;

      constructor(
        private route: ActivatedRoute, // To get route params
        private taskService: TaskService,
        private router: Router // To navigate back
      ) { }

      ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          const taskId = Number(params.get('id'));
          if (taskId) {
            this.taskService.getTaskById(taskId).subscribe(task => {
              this.task = task;
              if (!this.task) {
                console.warn(`Task with ID ${taskId} not found.`);
                // Optionally redirect to a 404 page or task list
                this.router.navigate(['/tasks']);
              }
            });
          }
        });
      }

      goBack(): void {
        this.router.navigate(['/tasks']);
      }
    }
    ```

    ```html
    <div class="task-detail-container">
      <mat-card *ngIf="task">
        <mat-card-header>
          <mat-card-title>Detalles de la Tarea: {{ task.title }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p><strong>ID:</strong> {{ task.id }}</p>
          <p><strong>Título:</strong> {{ task.title }}</p>
          <p><strong>Estado:</strong>
            <mat-icon>{{ task.completed ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
            {{ task.completed ? 'Completada' : 'Pendiente' }}
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-flat-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Volver a la lista
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card *ngIf="!task">
        <mat-card-header>
          <mat-card-title>Tarea No Encontrada</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Lo sentimos, la tarea que buscas no existe.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-flat-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Volver a la lista
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
    ```

    ```scss
    /* src/app/tasks/task-detail/task-detail.component.scss */
    .task-detail-container {
      padding: 20px;
      display: flex;
      justify-content: center;
      background-color: #e8eaf6;
      min-height: calc(100vh - 64px);
    }

    mat-card {
      width: 100%;
      max-width: 500px;
      margin-top: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }

    mat-card-title {
      font-size: 1.6em;
      color: #3f51b5;
    }

    mat-card-content p {
      font-size: 1.1em;
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      strong {
        margin-right: 5px;
      }

      mat-icon {
        margin-left: 5px;
        color: #4caf50; // Green for completed, could be red for incomplete
      }
    }

    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      padding-top: 10px;
    }
    ```

4.  **Actualizar `TaskItemComponent` para Navegar al Detalle:**
    ```html
    <mat-list-item>
      <mat-icon matListItemIcon (click)="onToggleComplete()">
        {{ task.completed ? 'check_circle' : 'radio_button_unchecked' }}
      </mat-icon>
      <h3 matListItemTitle [class.completed]="task.completed" [routerLink]="['/tasks', task.id]">{{ task.title }}</h3>
      <button mat-icon-button matListItemMeta (click)="onEditTask()">
        <mat-icon>edit</mat-icon>
      </button>
      <button mat-icon-button matListItemMeta color="warn" (click)="onDeleteTask()">
        <mat-icon>delete</mat-icon>
      </button>
    </mat-list-item>
    ```

    * **Add `RouterModule` to `tasks.module.ts` imports if you haven't already from `TasksRoutingModule` for `routerLink` to work.** (It should already be implicitly imported by `TasksRoutingModule`).

---

## 2. Aplicación: Catálogo de Productos (ropa y calzados)

Let's plan the Product Catalog application.

### Detalles de la implementación 1: Componentes y Comunicación

**Docs (Documento):**

**Título:** Catálogo de Productos - Componentes y Comunicación

**Descripción:** Se creará un componente `ProductCardComponent` para mostrar los detalles individuales de un producto. Se utilizará `@Input` para pasar los datos del producto al componente hijo y `@Output` para emitir eventos como "Agregar al carrito".

**Pasos:**
1.  **Crear Módulo de Productos:** Generar un módulo específico para el catálogo.
    ```bash
    ng generate module products --route products --module app.module
    ```
2.  **Crear `ProductListComponent`:** Generar el componente principal para mostrar la lista de productos.
    ```bash
    ng generate component products/product-list
    ```
3.  **Crear `ProductCardComponent`:** Generar el componente hijo para cada tarjeta de producto.
    ```bash
    ng generate component products/product-card
    ```
4.  **Implementar `@Input` en `ProductCardComponent`:** Definir una propiedad `@Input()` para recibir un objeto `Product`.
5.  **Implementar `@Output` en `ProductCardComponent`:** Definir un evento `@Output()` para `addToCart` que emita el producto a añadir.
6.  **Configurar Material Design:** Importar los módulos de Angular Material necesarios en `products.module.ts` (ej. `MatCardModule`, `MatButtonModule`, `MatIconModule`).

---

**Markdown for GitHub:**

```markdown
### Detalles de la implementación 1: Componentes y Comunicación

**Título:** Catálogo de Productos - Componentes y Comunicación

**Descripción:** Se creará un componente `ProductCardComponent` para mostrar los detalles individuales de un producto. Se utilizará `@Input` para pasar los datos del producto al componente hijo y `@Output` para emitir eventos como "Agregar al carrito".

**Pasos:**
1.  **Crear Módulo de Productos:**
    ```bash
    ng generate module products --route products --module app.module
    ```
2.  **Crear `ProductListComponent` y `ProductCardComponent`:**
    ```bash
    ng generate component products/product-list
    ng generate component products/product-card
    ```
3.  **Configurar `products.module.ts` e importar Material:**
    ```typescript
    // src/app/products/products.module.ts
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { ProductsRoutingModule } from './products-routing.module';
    import { ProductListComponent } from './product-list/product-list.component';
    import { ProductCardComponent } from './product-card/product-card.component';
    import { MatCardModule } from '@angular/material/card';
    import { MatButtonModule } from '@angular/material/button';
    import { MatIconModule } from '@angular/material/icon';

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
        MatIconModule
      ]
    })
    export class ProductsModule { }
    ```
4.  **Implementar `@Input` y `@Output` en `ProductCardComponent`:**
    ```typescript
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
      templateUrl: './product-card.component.html',
      styleUrls: ['./product-card.component.scss']
    })
    export class ProductCardComponent {
      @Input() product!: Product;
      @Output() addToCart = new EventEmitter<Product>();

      onAddToCart(): void {
        this.addToCart.emit(this.product);
      }
    }
    ```

    ```html
    <mat-card class="product-card">
      <img mat-card-image [src]="product.imageUrl" [alt]="product.name">
      <mat-card-content>
        <mat-card-title>{{ product.name }}</mat-card-title>
        <mat-card-subtitle>{{ product.category | titlecase }}</mat-card-subtitle>
        <p class="price">{{ product.price | currency:'USD':'symbol':'1.2-2' }}</p>
        <p class="description">{{ product.description }}</p>
      </mat-card-content>
      <mat-card-actions class="card-actions">
        <button mat-raised-button color="primary" (click)="onAddToCart()">
          <mat-icon>add_shopping_cart</mat-icon> Añadir al Carrito
        </button>
      </mat-card-actions>
    </mat-card>
    ```

    ```scss
    /* src/app/products/product-card/product-card.component.scss */
    .product-card {
      width: 100%;
      max-width: 300px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      overflow: hidden; // Ensures rounded corners on image

      img {
        height: 200px;
        object-fit: cover;
        width: 100%;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      mat-card-content {
        padding: 16px;
        flex-grow: 1; // Allows content to take available space
      }

      mat-card-title {
        font-size: 1.3em;
        font-weight: 600;
        margin-bottom: 5px;
      }

      mat-card-subtitle {
        color: #757575;
        font-size: 0.9em;
      }

      .price {
        font-size: 1.4em;
        font-weight: bold;
        color: #4caf50; // Green for price
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .description {
        font-size: 0.9em;
        color: #555;
        height: 40px; // Fixed height for description to prevent layout shifts
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; // Limit to 2 lines
        -webkit-box-orient: vertical;
      }

      .card-actions {
        padding: 0 16px 16px 16px;
        display: flex;
        justify-content: flex-end;
      }
    }
    ```
5.  **Actualizar `ProductListComponent` para usar `ProductCardComponent`:**
    ```typescript
    // src/app/products/product-list/product-list.component.ts
    import { Component, OnInit } from '@angular/core';
    import { Product } from '../product-card/product-card.component'; // Import Product interface

    @Component({
      selector: 'app-product-list',
      templateUrl: './product-list.component.html',
      styleUrls: ['./product-list.component.scss']
    })
    export class ProductListComponent implements OnInit {
      products: Product[] = [
        { id: 1, name: 'Camiseta Deportiva', category: 'ropa', price: 29.99, imageUrl: 'assets/camiseta-deportiva.jpg', description: 'Camiseta de secado rápido, ideal para entrenamientos intensos.' },
        { id: 2, name: 'Zapatillas Running Pro', category: 'calzado', price: 89.99, imageUrl: 'assets/zapatillas-running.jpg', description: 'Diseñadas para máxima amortiguación y retorno de energía.' },
        { id: 3, name: 'Jeans Slim Fit', category: 'ropa', price: 45.00, imageUrl: 'assets/jeans-slimfit.jpg', description: 'Comodidad y estilo en un diseño moderno y ajustado.' },
        { id: 4, name: 'Sandalias Verano', category: 'calzado', price: 19.50, imageUrl: 'assets/sandalias-verano.jpg', description: 'Frescas y ligeras, perfectas para días calurosos.' },
        { id: 5, name: 'Chaqueta Impermeable', category: 'ropa', price: 79.99, imageUrl: 'assets/chaqueta-impermeable.jpg', description: 'Protección contra la lluvia y el viento, con diseño transpirable.' }
      ];

      constructor() { }

      ngOnInit(): void {
        // Here you would typically load products from a service
      }

      onAddToCart(product: Product): void {
        console.log('Producto añadido al carrito:', product.name);
        // Logic to add to cart will go here in the next step
      }
    }
    ```

    ```html
    <div class="product-list-container">
      <mat-toolbar color="primary">
        <span>Catálogo de Productos</span>
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
    /* src/app/products/product-list/product-list.component.scss */
    .product-list-container {
      padding: 20px;
      background-color: #f0f2f5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center; // Center content horizontally
    }

    mat-toolbar {
      width: 100%;
      max-width: 1200px; // Limit toolbar width
      margin-bottom: 20px;
      border-radius: 8px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); // Responsive grid
      gap: 25px;
      justify-content: center; // Center grid items
      width: 100%;
      max-width: 1200px; // Limit grid width
    }

    .no-products-message {
      text-align: center;
      color: #757575;
      padding: 40px;
      font-style: italic;
      font-size: 1.2em;
    }

    @media (max-width: 600px) {
      .product-grid {
        grid-template-columns: 1fr; // Single column on small screens
      }
    }
    ```
    