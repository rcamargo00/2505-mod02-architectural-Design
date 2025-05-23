import { Component, OnInit } from '@angular/core';

import { Task } from '../task-item/task-item.component'; // Import Task interface
import { TaskService } from '../task.service'; // Import TaskService
// Adicionamos los formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, Validators
// import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';


// import { TaskItemComponent } from '../task-item/task-item.component';
// interface Task {
//   id: number;
//   title: string;
//   completed: boolean;
// }
@Component({
  selector: 'app-task-list',
  standalone:false,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'], 
  // imports : [MatCard,MatCardHeader,MatCardTitle,MatCardContent,]
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  // Declaramos el grupo de formulario
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
  
/*
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
*/