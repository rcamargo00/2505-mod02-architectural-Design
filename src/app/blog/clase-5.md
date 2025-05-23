### clase 2: Rutas (Blog)

**Título:** Blog Personal - Configuración de Rutas y Navegación

**Descripción:** Se configurarán las rutas para la aplicación de blog, incluyendo una vista de lista de publicaciones y una vista de detalle para cada publicación. Se creará una página para la creación/edición de publicaciones.

**Pasos:**
1.  **Definir Rutas en `blog-routing.module.ts`:**
    ```typescript
    // src/app/blog/blog-routing.module.ts
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { PostListComponent } from './post-list/post-list.component';
    import { PostDetailComponent } from './post-detail/post-detail.component'; // Import new component
    import { PostFormComponent } from './post-form/post-form.component'; // Import new component

    const routes: Routes = [
      { path: '', component: PostListComponent },
      { path: 'new', component: PostFormComponent }, // Route for adding new post
      { path: 'edit/:id', component: PostFormComponent }, // Route for editing existing post
      { path: ':id', component: PostDetailComponent } // Route for post detail
    ];

    @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
    export class BlogRoutingModule { }
    ```
2.  **Crear `PostDetailComponent` y `PostFormComponent`:**
    ```bash
    ng generate component blog/post-detail
    ng generate component blog/post-form
    ```
    * **Add `PostDetailComponent` and `PostFormComponent` to `blog.module.ts` declarations.**
    * **Add `ReactiveFormsModule`, `MatFormFieldModule`, `MatInputModule` for `PostFormComponent`**.
    ```typescript
    // src/app/blog/blog.module.ts (Add new components and form modules)
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { BlogRoutingModule } from './blog-routing.module';
    import { PostListComponent } from './post-list/post-list.component';
    import { PostDetailComponent } from './post-detail/post-detail.component'; // Add this
    import { PostFormComponent } from './post-form/post-form.component';     // Add this

    import { MatCardModule } from '@angular/material/card';
    import { MatButtonModule } from '@angular/material/button';
    import { MatIconModule } from '@angular/material/icon';
    import { MatToolbarModule } from '@angular/material/toolbar';
    import { MatDividerModule } from '@angular/material/divider';
    import { ReactiveFormsModule } from '@angular/forms'; // Add this
    import { MatFormFieldModule } from '@angular/material/form-field'; // Add this
    import { MatInputModule } from '@angular/material/input';       // Add this

    @NgModule({
      declarations: [
        PostListComponent,
        PostDetailComponent, // Add this
        PostFormComponent    // Add this
      ],
      imports: [
        CommonModule,
        BlogRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        ReactiveFormsModule, // Add this
        MatFormFieldModule,  // Add this
        MatInputModule       // Add this
      ]
    })
    export class BlogModule { }
    ```
3.  **Implementar `PostDetailComponent`:**
    ```typescript
    // src/app/blog/post-detail/post-detail.component.ts
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute, Router } from '@angular/router';
    import { Post, PostService } from '../post.service';

    @Component({
      selector: 'app-post-detail',
      templateUrl: './post-detail.component.html',
      styleUrls: ['./post-detail.component.scss']
    })
    export class PostDetailComponent implements OnInit {
      post: Post | undefined;

      constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private router: Router
      ) { }

      ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          const postId = Number(params.get('id'));
          if (postId) {
            this.postService.getPostById(postId).subscribe(post => {
              this.post = post;
              if (!this.post) {
                console.warn(`Post with ID ${postId} not found.`);
                this.router.navigate(['/blog']);
              }
            });
          }
        });
      }

      editPost(): void {
        if (this.post) {
          this.router.navigate(['/blog/edit', this.post.id]);
        }
      }

      deletePost(): void {
        if (this.post) {
          this.postService.deletePost(this.post.id).subscribe(success => {
            if (success) {
              console.log(`Post ${this.post?.id} deleted.`);
              this.router.navigate(['/blog']);
            }
          });
        }
      }

      goBack(): void {
        this.router.navigate(['/blog']);
      }
    }
    ```

    ```html
    <div class="post-detail-container">
      <mat-card *ngIf="post" class="post-detail-card">
        <mat-card-header>
          <mat-card-title>{{ post.title }}</mat-card-title>
          <mat-card-subtitle>
            Por {{ post.author }} el {{ post.date | date:'fullDate' }}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-divider></mat-divider>
        <mat-card-content>
          <p class="post-content">{{ post.content }}</p>
        </mat-card-content>
        <mat-divider></mat-divider>
        <mat-card-actions class="detail-actions">
          <button mat-flat-button color="accent" (click)="editPost()">
            <mat-icon>edit</mat-icon> Editar
          </button>
          <button mat-flat-button color="warn" (click)="deletePost()">
            <mat-icon>delete</mat-icon> Eliminar
          </button>
          <span class="spacer"></span>
          <button mat-flat-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Volver al Blog
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card *ngIf="!post" class="post-detail-card">
        <mat-card-header>
          <mat-card-title>Publicación No Encontrada</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Lo sentimos, la publicación que buscas no existe.</p>
        </mat-card-content>
        <mat-card-actions class="detail-actions">
          <button mat-flat-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Volver al Blog
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
    ```

    ```scss
    /* src/app/blog/post-detail/post-detail.component.scss */
    .post-detail-container {
      padding: 20px;
      display: flex;
      justify-content: center;
      background-color: #f0f2f5;
      min-height: 100vh;
    }

    .post-detail-card {
      width: 100%;
      max-width: 800px;
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
        font-size: 2.2em;
        font-weight: 700;
        color: #3f51b5;
        line-height: 1.2;
      }

      mat-card-subtitle {
        font-size: 1em;
        color: #673ab7;
        margin-top: 10px;
      }

      mat-divider {
        margin: 15px 0;
      }

      mat-card-content {
        padding: 0 20px 20px;
      }

      .post-content {
        font-size: 1.1em;
        line-height: 1.7;
        color: #333;
        white-space: pre-wrap; // Preserve whitespace and line breaks
      }

      .detail-actions {
        display: flex;
        justify-content: flex-start; // Align to start
        align-items: center;
        padding: 15px 20px 20px;
        border-top: 1px solid #eee;
        gap: 10px;

        .spacer {
          flex: 1 1 auto; // Push "back" button to the right
        }
      }

      @media (max-width: 600px) {
        .detail-actions {
          flex-direction: column;
          align-items: stretch;

          button {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      }
    }
    ```
4.  **Implementar `PostFormComponent` (para Crear y Editar):**
    ```typescript
    // src/app/blog/post-form/post-form.component.ts
    import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { ActivatedRoute, Router } from '@angular/router';
    import { Post, PostService } from '../post.service';

    @Component({
      selector: 'app-post-form',
      templateUrl: './post-form.component.html',
      styleUrls: ['./post-form.component.scss']
    })
    export class PostFormComponent implements OnInit {
      postForm: FormGroup;
      isEditMode: boolean = false;
      postId: number | null = null;
      formTitle: string = 'Crear Nueva Publicación';

      constructor(
        private fb: FormBuilder,
        private postService: PostService,
        private router: Router,
        private route: ActivatedRoute
      ) {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(5)]],
          content: ['', [Validators.required, Validators.minLength(20)]],
          author: ['', [Validators.required, Validators.minLength(3)]]
        });
      }

      ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.postId = +id;
            this.formTitle = 'Editar Publicación';
            this.postService.getPostById(this.postId).subscribe(post => {
              if (post) {
                this.postForm.patchValue(post); // Populate form with existing data
              } else {
                console.warn(`Post with ID ${this.postId} not found for editing.`);
                this.router.navigate(['/blog/new']); // Redirect to new if not found
              }
            });
          }
        });
      }

      onSubmit(): void {
        if (this.postForm.valid) {
          const { title, content, author } = this.postForm.value;

          if (this.isEditMode && this.postId !== null) {
            const updatedPost: Post = {
              id: this.postId,
              title,
              content,
              author,
              date: new Date() // Keep original date or update as needed
            };
            this.postService.updatePost(updatedPost).subscribe(() => {
              console.log('Post updated successfully!');
              this.router.navigate(['/blog', this.postId]);
            });
          } else {
            this.postService.addPost(title, content, author).subscribe(newPost => {
              console.log('Post added successfully!', newPost);
              this.router.navigate(['/blog', newPost.id]);
            });
          }
        }
      }

      goBack(): void {
        this.router.navigate(['/blog']);
      }
    }
    ```

    ```html
    <div class="post-form-container">
      <mat-card class="post-form-card">
        <mat-card-header>
          <mat-card-title>{{ formTitle }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="postForm" (ngSubmit)="onSubmit()" class="blog-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Título</mat-label>
              <input matInput formControlName="title" placeholder="Título de la publicación">
              <mat-error *ngIf="postForm.controls['title'].hasError('required') && postForm.controls['title'].touched">
                El título es obligatorio.
              </mat-error>
              <mat-error *ngIf="postForm.controls['title'].hasError('minlength') && postForm.controls['title'].touched">
                El título debe tener al menos 5 caracteres.
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contenido</mat-label>
              <textarea matInput formControlName="content" placeholder="Escribe tu contenido aquí..." rows="10"></textarea>
              <mat-error *ngIf="postForm.controls['content'].hasError('required') && postForm.controls['content'].touched">
                El contenido es obligatorio.
              </mat-error>
              <mat-error *ngIf="postForm.controls['content'].hasError('minlength') && postForm.controls['content'].touched">
                El contenido debe tener al menos 20 caracteres.
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Autor</mat-label>
              <input matInput formControlName="author" placeholder="Tu nombre">
              <mat-error *ngIf="postForm.controls['author'].hasError('required') && postForm.controls['author'].touched">
                El autor es obligatorio.
              </mat-error>
              <mat-error *ngIf="postForm.controls['author'].hasError('minlength') && postForm.controls['author'].touched">
                El autor debe tener al menos 3 caracteres.
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="postForm.invalid">
                <mat-icon>save</mat-icon> {{ isEditMode ? 'Guardar Cambios' : 'Publicar' }}
              </button>
              <button mat-flat-button color="basic" type="button" (click)="goBack()">
                <mat-icon>cancel</mat-icon> Cancelar
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
    ```

    ```scss
    /* src/app/blog/post-form/post-form.component.scss */
    .post-form-container {
      padding: 20px;
      display: flex;
      justify-content: center;
      background-color: #f0f2f5;
      min-height: 100vh;
    }

    .post-form-card {
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

      mat-card-content {
        padding: 20px;
      }

      .blog-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .full-width {
        width: 100%;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
        margin-top: 20px;

        button {
          padding: 0 25px;
          height: 48px;
        }
      }

      @media (max-width: 600px) {
        .form-actions {
          flex-direction: column;
          align-items: stretch;

          button {
            width: 100%;
          }
        }
      }
    }
    ```