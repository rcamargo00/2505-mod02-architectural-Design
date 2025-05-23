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