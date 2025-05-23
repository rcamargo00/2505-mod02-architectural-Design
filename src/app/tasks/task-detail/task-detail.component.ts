// src/app/tasks/task-detail/task-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router
import { TaskService } from '../task.service';
import { Task } from '../task-item/task-item.component'; // Re-use Task interface
@Component({
  selector: 'app-task-detail',
  standalone:false,
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;
  constructor(
    private route: ActivatedRoute, // To get route params
    private taskService: TaskService,
    private router: Router // To navigate back
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskId = Number(params.get('id'));
      if (taskId) {
        this.taskService.getTaskById(taskId).subscribe(task => {
          this.task = task;
          if (!this.task) {
            console.warn(`Task with ID ${taskId} not found.`);
            // Optionally redirect to a 404 page or task list
            this.router.navigate(['/tasks']);
          }
        });
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}