
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent} from './task-item/task-item.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Added for icons
import { MatDividerModule } from '@angular/material/divider';//Actualizacion
// adicionamos los formularios
import { ReactiveFormsModule } from '@angular/forms'; // Add this
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this
import { MatInputModule } from '@angular/material/input'; // Add this
// Adicionamos para realizar las rutas
import { TaskDetailComponent } from './task-detail/task-detail.component'; // Add this
// Modulo rutas
  
@NgModule({
  declarations: [
    // TaskListComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskDetailComponent // Add th
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    // adicionamos los formularios
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    // rutas     
    // TaskItemComponent, // Add this
    //para las rutas
    // TaskDetailComponent,    
    // TasksRoutingModule, 
  ]
})
export class TasksModule { }