import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { PostListComponent } from './post-list/post-list.component';
// Añadimos las rutas 
import { PostDetailComponent } from './post-detail/post-detail.component'; 
import { PostFormComponent } from './post-form/post-form.component';     

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'; // For a nice header
import { MatDividerModule } from '@angular/material/divider'; // For dividers
//Add this to forms 
import { ReactiveFormsModule } from '@angular/forms'; // Add this
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this
import { MatInputModule } from '@angular/material/input';       // Add this

@NgModule({
  declarations: [
    PostListComponent,
    // rutas
    PostDetailComponent,
    PostFormComponent   
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    //rutas 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BlogModule { }