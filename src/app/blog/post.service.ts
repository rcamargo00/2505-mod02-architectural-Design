// src/app/blog/post.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: Date;
}
@Injectable({
  providedIn: 'root' // Or 'blog' module
})
export class PostService {
  private posts: Post[] = [
    { id: 1, title: 'Introducción a Angular y sus Fundamentos', content: 'Angular es un framework de desarrollo de aplicaciones web de código abierto, mantenido por Google. Permite construir aplicaciones de una sola página (SPA) robustas y escalables...', author: 'Rodney Camargo', date: new Date('2025-05-10') },
    { id: 2, title: 'Componentes en Angular: Bloques de Construcción', content: 'Los componentes son los bloques fundamentales de una aplicación Angular. Cada componente consta de un template, una clase y estilos asociados...', author: 'Rodney Camargo', date: new Date('2025-05-15') },
    { id: 3, title: 'Servicios e Inyección de Dependencias en Angular', content: 'Los servicios en Angular son clases que encapsulan lógica de negocio, acceso a datos o utilidades reusables. La inyección de dependencias (DI) es un patrón de diseño clave para entregar instancias de estas clases a los componentes...', author: 'Rodney Camargo', date: new Date('2025-05-18') },
    { id: 4, title: 'Enrutamiento en Angular: Navegación entre Vistas', content: 'El enrutamiento en Angular permite a los usuarios navegar entre diferentes vistas o pantallas de la aplicación sin recargar la página. Se configura mediante el módulo `RouterModule`...', author: 'Rodney Camargo', date: new Date('2025-05-20') },
  ];
  private nextId: number = 5;
  constructor() { }
  getPosts(): Observable<Post[]> {
    // Return a copy to prevent direct mutation
    return of([...this.posts].sort((a, b) => b.date.getTime() - a.date.getTime()));
  }
  getPostById(id: number): Observable<Post | undefined> {
    return of(this.posts.find(post => post.id === id));
  }
  addPost(title: string, content: string, author: string): Observable<Post> {
    const newPost: Post = {
      id: this.nextId++,
      title,
      content,
      author,
      date: new Date()
    };
    this.posts.push(newPost);
    return of(newPost);
  }
  updatePost(updatedPost: Post): Observable<Post> {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index > -1) {
      this.posts[index] = updatedPost;
    }
    return of(updatedPost);
  }
  deletePost(id: number): Observable<boolean> {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id !== id);
    return of(this.posts.length < initialLength);
  }
}