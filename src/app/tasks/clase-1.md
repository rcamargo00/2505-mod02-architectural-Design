### clase 1: Configuración del Proyecto y Primer Componente

**Título:** Gestor de Tareas - Configuración Inicial y Componente Básico

**Descripción:** Esta sección detalla la configuración inicial del módulo para la aplicación de gestión de tareas, incluyendo la instalación de Angular Material y la creación de un componente básico para mostrar una lista estática de tareas.

**Pasos:**
1.  **Creación del Módulo de Tareas:**
    ```bash
    ng generate module tasks --route tasks --module app.module
    ```
2.  **Creación del Componente `TaskListComponent`:**
    ```bash
    ng generate component tasks/task-list
    ```
3.  **Configuración de Angular Material:** Importar los módulos necesarios de Angular Material en `tasks.module.ts`.
    ```typescript
    // src/app/tasks/tasks.module.ts
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { TasksRoutingModule } from './tasks-routing.module';
    import { TaskListComponent } from './task-list/task-list.component';
    import { MatListModule } from '@angular/material/list';
    import { MatCardModule } from '@angular/material/card';
    import { MatButtonModule } from '@angular/material/button';
    import { MatIconModule } from '@angular/material/icon'; // Added for icons

    @NgModule({
      declarations: [
        TaskListComponent
      ],
      imports: [
        CommonModule,
        TasksRoutingModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ]
    })
    export class TasksModule { }
    ```
4.  **Lista Estática de Tareas:**
    ```typescript
    // src/app/tasks/task-list/task-list.component.ts
    import { Component } from '@angular/core';

    interface Task {
      id: number;
      title: string;
      completed: boolean;
    }

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
            <mat-list-item *ngFor="let task of tasks">
              <mat-icon matListItemIcon>{{ task.completed ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
              <h3 matListItemTitle [class.completed]="task.completed">{{ task.title }}</h3>
              <p matListItemLine>ID: {{ task.id }}</p>
              <button mat-icon-button matListItemMeta>
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button matListItemMeta>
                <mat-icon>delete</mat-icon>
              </button>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
    ```

    ```scss
    /* src/app/tasks/task-list/task-list.component.scss */
    .task-list-container {
      padding: 20px;
      display: flex;
      justify-content: center;
      background-color: #e8eaf6; // Light blue background
      min-height: calc(100vh - 64px); // Adjust for toolbar height if necessary
    }

    mat-card {
      width: 100%;
      max-width: 600px;
      margin-top: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }

    mat-card-header {
      background-color: #f5f5f5;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
    }

    mat-card-title {
      font-size: 1.8em;
      color: #3f51b5;
    }

    mat-list-item {
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
    }

    .completed {
      text-decoration: line-through;
      color: #888;
    }

    mat-icon[matListItemIcon] {
      color: #673ab7; // Purple for status icons
    }

    button[mat-icon-button] mat-icon {
      color: #757575; // Grey for action icons
    }
    ```