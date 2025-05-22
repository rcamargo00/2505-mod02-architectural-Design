### clase 3: Servicios para Manejo de Datos

**Título:** Gestor de Tareas - Servicio para Manejo de Datos en Memoria

**Descripción:** Se crea un servicio (`TaskService`) para centralizar la lógica de gestión de tareas, desacoplando los componentes de la manipulación directa de datos. El servicio gestionará las tareas en memoria.

**Pasos:**
1.  **Crear `TaskService`:**
    ```bash
    ng generate service tasks/task
    ```
2.  **Implementar Métodos CRUD en `TaskService`:**
    ```typescript
    // src/app/tasks/task.service.ts
    import { Injectable } from '@angular/core';
    import { Observable, of } from 'rxjs'; // For async operations
    import { Task } from './task-item/task-item.component'; // Re-use Task interface

    @Injectable({
      providedIn: 'root' // Provided in root, or in 'tasks' module if preferred
    })
    export class TaskService {
      private tasks: Task[] = [
        { id: 1, title: 'Aprender Angular Components', completed: false },
        { id: 2, title: 'Configurar Rutas en Angular', completed: false },
        { id: 3, title: 'Estudiar Servicios y DI', completed: true },
        { id: 4, title: 'Practicar Formularios Reactivos', completed: false },
        { id: 5, title: 'Revisar la documentación oficial', completed: false }
      ];
      private nextId: number = 6; // To generate unique IDs

      constructor() { }

      getTasks(): Observable<Task[]> {
        return of(this.tasks); // Return as Observable to simulate async API call
      }

      getTaskById(id: number): Observable<Task | undefined> {
        return of(this.tasks.find(task => task.id === id));
      }

      addTask(title: string): Observable<Task> {
        const newTask: Task = {
          id: this.nextId++,
          title,
          completed: false
        };
        this.tasks.push(newTask);
        return of(newTask);
      }

      updateTask(updatedTask: Task): Observable<Task> {
        const index = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (index > -1) {
          this.tasks[index] = updatedTask;
        }
        return of(updatedTask);
      }

      deleteTask(id: number): Observable<boolean> {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        return of(this.tasks.length < initialLength); // True if task was removed
      }
    }
    ```
3.  **Inyectar y Usar el Servicio en `TaskListComponent`:**
    ```typescript
    // src/app/tasks/task-list/task-list.component.ts (Update with TaskService)
    import { Component, OnInit } from '@angular/core';
    import { Task } from '../task-item/task-item.component';
    import { TaskService } from '../task.service'; // Import TaskService

    @Component({
      selector: 'app-task-list',
      templateUrl: './task-list.component.html',
      styleUrls: ['./task-list.component.scss']
    })
    export class TaskListComponent implements OnInit {
      tasks: Task[] = [];

      constructor(private taskService: TaskService) { } // Inject TaskService

      ngOnInit(): void {
        this.loadTasks();
      }

      loadTasks(): void {
        this.taskService.getTasks().subscribe(tasks => {
          this.tasks = tasks;
        });
      }

      toggleTaskCompletion(id: number): void {
        const taskToUpdate = this.tasks.find(t => t.id === id);
        if (taskToUpdate) {
          const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
          this.taskService.updateTask(updatedTask).subscribe(() => {
            this.loadTasks(); // Reload or update specific task for reactivity
          });
        }
      }

      editTask(task: Task): void {
        console.log('Edit Task (from service):', task);
        // This will be connected to a form/dialog in the next step
      }

      deleteTask(id: number): void {
        this.taskService.deleteTask(id).subscribe(success => {
          if (success) {
            this.loadTasks(); // Reload tasks after deletion
          }
        });
      }
    }
    ```