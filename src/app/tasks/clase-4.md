### Detalles de la implementación 4: Formularios y Validaciones

**Título:** Gestor de Tareas - Formularios para Añadir Tareas y Validaciones

**Descripción:** Se añade un formulario para que los usuarios puedan introducir nuevas tareas. Se implementarán validaciones básicas (título obligatorio, longitud mínima) y se proporcionará retroalimentación visual al usuario en caso de errores de validación.

**Pasos:**
1.  **Habilitar Formularios Reactivos:**
    ```typescript
    // src/app/tasks/tasks.module.ts (Add ReactiveFormsModule and Material Form Modules)
    import { ReactiveFormsModule } from '@angular/forms'; // Add this
    import { MatFormFieldModule } from '@angular/material/form-field'; // Add this
    import { MatInputModule } from '@angular/material/input'; // Add this

    @NgModule({
      declarations: [
        TaskListComponent,
        TaskItemComponent
      ],
      imports: [
        CommonModule,
        TasksRoutingModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        ReactiveFormsModule, // Add this
        MatFormFieldModule, // Add this
        MatInputModule // Add this
      ]
    })
    export class TasksModule { }
    ```
2.  **Crear Formulario en `TaskListComponent` y Conectar con `TaskService`:**
    ```typescript
    // src/app/tasks/task-list/task-list.component.ts (Update with form logic)
    import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, Validators
    import { Task } from '../task-item/task-item.component';
    import { TaskService } from '../task.service';

    @Component({
      selector: 'app-task-list',
      templateUrl: './task-list.component.html',
      styleUrls: ['./task-list.component.scss']
    })
    export class TaskListComponent implements OnInit {
      tasks: Task[] = [];
      taskForm: FormGroup; // Declare the form group

      constructor(private taskService: TaskService, private fb: FormBuilder) { // Inject FormBuilder
        this.taskForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(3)]] // Define form control with validators
        });
      }

      ngOnInit(): void {
        this.loadTasks();
      }

      loadTasks(): void {
        this.taskService.getTasks().subscribe(tasks => {
          this.tasks = tasks;
        });
      }

      addTask(): void {
        if (this.taskForm.valid) {
          const newTitle = this.taskForm.value.title;
          this.taskService.addTask(newTitle).subscribe(() => {
            this.loadTasks(); // Reload tasks to show the new one
            this.taskForm.reset(); // Clear the form after submission
          });
        }
      }

      toggleTaskCompletion(id: number): void {
        const taskToUpdate = this.tasks.find(t => t.id === id);
        if (taskToUpdate) {
          const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
          this.taskService.updateTask(updatedTask).subscribe(() => {
            this.loadTasks();
          });
        }
      }

      editTask(task: Task): void {
        // For now, just log. Later, open a dialog with the task's data
        console.log('Editing task:', task);
      }

      deleteTask(id: number): void {
        this.taskService.deleteTask(id).subscribe(success => {
          if (success) {
            this.loadTasks();
          }
        });
      }
    }
    ```

    ```html
    <div class="task-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gestor de Tareas</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="taskForm" (ngSubmit)="addTask()" class="add-task-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nueva Tarea</mat-label>
              <input matInput formControlName="title" placeholder="Ej. Comprar víveres">
              <mat-error *ngIf="taskForm.controls['title'].hasError('required') && taskForm.controls['title'].touched">
                El título de la tarea es obligatorio.
              </mat-error>
              <mat-error *ngIf="taskForm.controls['title'].hasError('minlength') && taskForm.controls['title'].touched">
                El título debe tener al menos 3 caracteres.
              </mat-error>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="taskForm.invalid">
              <mat-icon>add</mat-icon> Añadir Tarea
            </button>
          </form>

          <mat-divider></mat-divider>

          <mat-list>
            <app-task-item
              *ngFor="let task of tasks"
              [task]="task"
              (toggleComplete)="toggleTaskCompletion($event)"
              (editTask)="editTask($event)"
              (deleteTask)="deleteTask($event)"
            ></app-task-item>
          </mat-list>
          <p *ngIf="tasks.length === 0" class="no-tasks-message">No hay tareas. ¡Agrega una nueva!</p>
        </mat-card-content>
      </mat-card>
    </div>
    ```

    ```scss
    /* src/app/tasks/task-list/task-list.component.scss (Add form styling) */
    // ... existing styles ...

    .add-task-form {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      align-items: center;

      .full-width {
        flex-grow: 1;
      }

      button {
        padding: 0 20px;
        height: 56px; // Match mat-form-field height
      }
    }

    .no-tasks-message {
      text-align: center;
      color: #757575;
      padding: 20px;
      font-style: italic;
    }

    // Responsive adjustments for form
    @media (max-width: 600px) {
      .add-task-form {
        flex-direction: column;
        align-items: stretch;
      }
      .add-task-form button {
        width: 100%;
        margin-top: 10px;
      }
    }
    ```