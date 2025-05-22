### clase 2: Componentes y Comunicación (Input/Output)

**Título:** Gestor de Tareas - Componentes Anidados y Comunicación entre Ellos

**Descripción:** Se introduce la creación de un componente hijo (`TaskItemComponent`) para representar cada tarea individualmente, demostrando el uso de `@Input` para pasar datos del padre al hijo y `@Output` para emitir eventos del hijo al padre (ej. "marcar como completada").

**Pasos:**
1.  **Crear `TaskItemComponent`:**
    ```bash
    ng generate component tasks/task-item
    ```
2.  **Implementar `@Input` y `@Output` en `TaskItemComponent`:**
    ```typescript
    // src/app/tasks/task-item/task-item.component.ts
    import { Component, Input, Output, EventEmitter } from '@angular/core';

    export interface Task { // Define the interface here or in a shared file
      id: number;
      title: string;
      completed: boolean;
    }

    @Component({
      selector: 'app-task-item',
      templateUrl: './task-item.component.html',
      styleUrls: ['./task-item.component.scss']
    })
    export class TaskItemComponent {
      @Input() task!: Task;
      @Output() toggleComplete = new EventEmitter<number>();
      @Output() editTask = new EventEmitter<Task>(); // Added for consistency
      @Output() deleteTask = new EventEmitter<number>();

      onToggleComplete(): void {
        this.toggleComplete.emit(this.task.id);
      }

      onEditTask(): void {
        this.editTask.emit(this.task);
      }

      onDeleteTask(): void {
        this.deleteTask.emit(this.task.id);
      }
    }
    ```

    ```html
    <mat-list-item>
      <mat-icon matListItemIcon (click)="onToggleComplete()">
        {{ task.completed ? 'check_circle' : 'radio_button_unchecked' }}
      </mat-icon>
      <h3 matListItemTitle [class.completed]="task.completed">{{ task.title }}</h3>
      <button mat-icon-button matListItemMeta (click)="onEditTask()">
        <mat-icon>edit</mat-icon>
      </button>
      <button mat-icon-button matListItemMeta color="warn" (click)="onDeleteTask()">
        <mat-icon>delete</mat-icon>
      </button>
    </mat-list-item>
    ```

    ```scss
    /* src/app/tasks/task-item/task-item.component.scss */
    mat-list-item {
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
    }

    mat-icon[matListItemIcon] {
      cursor: pointer;
      color: #673ab7; // Purple for status icons
    }

    h3 {
      flex-grow: 1; // Allows title to take up available space
      margin: 0 10px;
    }

    .completed {
      text-decoration: line-through;
      color: #888;
    }

    button[mat-icon-button] mat-icon {
      color: #757575; // Grey for action icons
    }
    ```

3.  **Actualizar `TaskListComponent` para usar `TaskItemComponent`:**
    * **Import `TaskItemComponent`** and ensure it's declared in `TasksModule`.
    * **Import `MatDividerModule`** for better visual separation between list items if desired.
    ```typescript
    // src/app/tasks/tasks.module.ts (Add TaskItemComponent to declarations)
    import { MatDividerModule } from '@angular/material/divider'; // Add this

    @NgModule({
      declarations: [
        TaskListComponent,
        TaskItemComponent // Add this
      ],
      imports: [
        CommonModule,
        TasksRoutingModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule // Add this
      ]
    })
    export class TasksModule { }
    ```

    ```typescript
    // src/app/tasks/task-list/task-list.component.ts (Update methods)
    import { Component } from '@angular/core';
    import { Task } from '../task-item/task-item.component'; // Import Task interface

    @Component({
      selector: 'app-task-list',
      templateUrl: './task-list.component.html',
      styleUrls: ['./task-list.component.scss']
    })
    export class TaskListComponent {
      tasks: Task[] = [
        { id: 1, title: 'Aprender Angular Components', completed: false },
        { id: 2, title: 'Configurar Rutas en Angular', completed: false },
        { id: 3, title: 'Estudiar Servicios y DI', completed: true },
        { id: 4, title: 'Practicar Formularios Reactivos', completed: false }
      ];

      toggleTaskCompletion(id: number): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
          task.completed = !task.completed;
          console.log(`Task ${id} toggled. New status: ${task.completed}`);
        }
      }

      editTask(task: Task): void {
        console.log('Edit Task:', task);
        // Implement actual editing logic later (e.g., open a dialog)
      }

      deleteTask(id: number): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
        console.log(`Task ${id} deleted.`);
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
          <mat-list>
            <app-task-item
              *ngFor="let task of tasks"
              [task]="task"
              (toggleComplete)="toggleTaskCompletion($event)"
              (editTask)="editTask($event)"
              (deleteTask)="deleteTask($event)"
            ></app-task-item>
            <mat-divider *ngIf="tasks.length > 0"></mat-divider>
          </mat-list>
          <p *ngIf="tasks.length === 0" class="no-tasks-message">No hay tareas. ¡Agrega una nueva!</p>
        </mat-card-content>
      </mat-card>
    </div>
    ```