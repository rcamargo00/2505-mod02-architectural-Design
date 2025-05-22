### clase 4: Servicios para Manejo de Datos

**Título:** Blog Personal - Servicio para Manejo de Publicaciones

**Descripción:** Se creará un servicio `PostService` para gestionar las publicaciones del blog en memoria. Este servicio incluirá métodos para agregar, editar y eliminar publicaciones, y se conectará con los componentes del blog.

**Pasos:**
1.  **Crear Módulo de Blog:**
    ```bash
    ng generate module blog --route blog --module app.module
    ```
2.  **Crear `PostListComponent`:**
    ```bash
    ng generate component blog/post-list
    ```
3.  **Crear `PostService`:**
    ```bash
    ng generate service blog/post
    ```
4.  **Definir Interfaz `Post` y Implementar Métodos CRUD en `PostService`:**
    ```typescript
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
        { id: 1, title: 'Introducción a Angular y sus Fundamentos', content: 'Angular es un framework de desarrollo de aplicaciones web de código abierto, mantenido por Google. Permite construir aplicaciones de una sola página (SPA) robustas y escalables...', author: 'Juan Pérez', date: new Date('2023-01-15') },
        { id: 2, title: 'Componentes en Angular: Bloques de Construcción', content: 'Los componentes son los bloques fundamentales de una aplicación Angular. Cada componente consta de un template, una clase y estilos asociados...', author: 'María García', date: new Date('2023-02-20') },
        { id: 3, title: 'Servicios e Inyección de Dependencias en Angular', content: 'Los servicios en Angular son clases que encapsulan lógica de negocio, acceso a datos o utilidades reusables. La inyección de dependencias (DI) es un patrón de diseño clave para entregar instancias de estas clases a los componentes...', author: 'Carlos Ruíz', date: new Date('2023-03-10') },
        { id: 4, title: 'Enrutamiento en Angular: Navegación entre Vistas', content: 'El enrutamiento en Angular permite a los usuarios navegar entre diferentes vistas o pantallas de la aplicación sin recargar la página. Se configura mediante el módulo `RouterModule`...', author: 'Ana López', date: new Date('2023-04-05') },
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
    ```
5.  **Conectar con `PostListComponent`:**
    * **Configure `blog.module.ts`** with necessary Material modules.
    ```typescript
    // src/app/blog/blog.module.ts
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { BlogRoutingModule } from './blog-routing.module';
    import { PostListComponent } from './post-list/post-list.component';
    import { MatCardModule } from '@angular/material/card';
    import { MatButtonModule } from '@angular/material/button';
    import { MatIconModule } from '@angular/material/icon';
    import { MatToolbarModule } from '@angular/material/toolbar'; // For a nice header
    import { MatDividerModule } from '@angular/material/divider'; // For dividers

    @NgModule({
      declarations: [
        PostListComponent
      ],
      imports: [
        CommonModule,
        BlogRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule
      ]
    })
    export class BlogModule { }
    ```

    ```typescript
    // src/app/blog/post-list/post-list.component.ts
    import { Component, OnInit } from '@angular/core';
    import { Post, PostService } from '../post.service'; // Import Post and PostService

    @Component({
      selector: 'app-post-list',
      templateUrl: './post-list.component.html',
      styleUrls: ['./post-list.component.scss']
    })
    export class PostListComponent implements OnInit {
      posts: Post[] = [];

      constructor(private postService: PostService) { } // Inject PostService

      ngOnInit(): void {
        this.loadPosts();
      }

      loadPosts(): void {
        this.postService.getPosts().subscribe(posts => {
          this.posts = posts;
        });
      }

      editPost(post: Post): void {
        console.log('Edit post:', post);
        // Implement navigation to an edit form
      }

      deletePost(id: number): void {
        this.postService.deletePost(id).subscribe(success => {
          if (success) {
            this.loadPosts(); // Reload posts after deletion
          }
        });
      }
    }
    ```

    ```html
    <div class="blog-container">
      <mat-toolbar color="primary">
        <span>Blog Personal sobre Angular</span>
        <span class="spacer"></span>
        <button mat-flat-button color="accent" routerLink="/blog/new">
          <mat-icon>add</mat-icon> Nueva Publicación
        </button>
      </mat-toolbar>

      <div class="post-grid">
        <mat-card *ngFor="let post of posts" class="post-card">
          <mat-card-header>
            <mat-card-title>{{ post.title }}</mat-card-title>
            <mat-card-subtitle>
              Por {{ post.author }} el {{ post.date | date:'mediumDate' }}
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="post-content-preview">{{ post.content | slice:0:150 }}...</p>
          </mat-card-content>
          <mat-card-actions class="card-actions">
            <button mat-button color="primary" [routerLink]="['/blog', post.id]">Leer más</button>
            <span class="spacer"></span>
            <button mat-icon-button (click)="editPost(post)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deletePost(post.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <p *ngIf="posts.length === 0" class="no-posts-message">No hay publicaciones todavía. ¡Sé el primero en escribir!</p>
    </div>
    ```

    ```scss
    /* src/app/blog/post-list/post-list.component.scss */
    .blog-container {
      padding: 20px;
      background-color: #f0f2f5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    mat-toolbar {
      width: 100%;
      max-width: 900px;
      margin-bottom: 20px;
      border-radius: 8px;
      padding: 10px 20px;

      .spacer {
        flex: 1 1 auto;
      }
    }

    .post-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
      justify-content: center;
      width: 100%;
      max-width: 900px;
    }

    .post-card {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: translateY(-5px);
      }

      mat-card-header {
        background-color: #f5f5f5;
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      mat-card-title {
        font-size: 1.4em;
        font-weight: 600;
        margin-bottom: 5px;
      }

      mat-card-subtitle {
        color: #757575;
        font-size: 0.9em;
      }

      mat-card-content {
        padding: 16px;
        flex-grow: 1;
      }

      .post-content-preview {
        font-size: 1em;
        color: #555;
        line-height: 1.5;
        height: 48px; // Approx 2 lines
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .card-actions {
        padding: 0 16px 16px 16px;
        display: flex;
        align-items: center;

        .spacer {
          flex: 1 1 auto;
        }
      }
    }

    .no-posts-message {
      text-align: center;
      color: #757575;
      padding: 40px;
      font-style: italic;
      font-size: 1.2em;
    }

    @media (max-width: 600px) {
      .post-grid {
        grid-template-columns: 1fr;
      }
    }
    ```