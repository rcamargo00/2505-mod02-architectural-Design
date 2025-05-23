import { Injectable, PLATFORM_ID, Inject } from '@angular/core'; // <-- Importa PLATFORM_ID y Inject
import { isPlatformBrowser } from '@angular/common'; // <-- Importa isPlatformBrowser

import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product-card/product-card.component';

interface CartItem extends Product {
  quantity: number;
}
@Injectable({
  providedIn: 'root' // Or 'products' module
})
export class CartService {
  private CART_STORAGE_KEY = 'my_product_cart';

  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  private totalItemsSubject = new BehaviorSubject<number>(0);
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Solo intenta cargar desde localStorage si estamos en un navegador
    if (isPlatformBrowser(this.platformId)) {
      this.loadCartFromLocalStorage();
    }
  }  
  private saveCartToLocalStorage(): void {
   if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems));
        this.updateTotalItems();
      } catch (e) {
        console.error('Error al guardar el carrito en localStorage:', e);
      }
    }
  }
  private loadCartFromLocalStorage(): void {    
    if (isPlatformBrowser(this.platformId)) {
      try {
        const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
        if (storedCart) {
          this.cartItems = JSON.parse(storedCart);
          this.cartSubject.next(this.cartItems);
          this.updateTotalItems();
        }
      } catch (e) {
        console.error('Error al cargar el carrito de localStorage:', e);
        localStorage.removeItem(this.CART_STORAGE_KEY);
        this.cartItems = [];
        this.cartSubject.next(this.cartItems);
        this.updateTotalItems();
      }
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