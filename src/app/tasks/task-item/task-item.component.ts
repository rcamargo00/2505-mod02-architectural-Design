import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Task { // Define the interface here or in a shared file
  id: number;
  title: string;
  completed: boolean;
}
@Component({
  selector: 'app-task-item',
  standalone:false,
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