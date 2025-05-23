// src/app/products/product-list/product-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder, FormGroup
import { Product } from '../product-card/product-card.component'; // Import Product interface
// Servicios
import { ProductService } from '../product.service'; // Import ProductService
import { CartService } from '../cart.service';     // Import CartService
import { Subscription, combineLatest  } from 'rxjs';
//filtrado
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators'; // Import operators

@Component({
  selector: 'app-product-list',
  standalone:false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],  
})
 
export class ProductListComponent implements OnInit, OnDestroy {
  allProducts: Product[] = []; // Store all products
  filteredProducts: Product[] = []; // Products shown in the list
  products: Product[] = [];
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

/*
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
*/