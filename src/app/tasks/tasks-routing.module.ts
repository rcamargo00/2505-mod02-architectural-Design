import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
//Adicionamos 
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component'; // Import new component


//const routes: Routes = [{ path: '', component: TasksComponent }];
const routes: Routes = [
  { path: '', component: TaskListComponent }, // Default route for /tasks
  { path: ':id', component: TaskDetailComponent } // Route for /tasks/:id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
