import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product-card/product-card.component';
@Injectable({
  providedIn: 'root' // Or 'products' module if preferred
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Camiseta Deportiva', category: 'ropa', price: 29.99, imageUrl: 'assets/camiseta-deportiva.jpg', description: 'Camiseta de secado rápido, ideal para entrenamientos intensos.' },    
    // { id: 1, name: 'Camiseta Deportiva', category: 'ropa', price: 29.99, imageUrl: 'https://i.pinimg.com/originals/be/2b/ab/be2bab29c8ecddee23c0d893d9802380.jpg', description: 'Camiseta de secado rápido, ideal para entrenamientos intensos.' },
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