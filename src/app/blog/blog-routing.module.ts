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
