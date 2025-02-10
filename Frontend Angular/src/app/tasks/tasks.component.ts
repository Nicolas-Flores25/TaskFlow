// tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { TasksService } from '../Services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './tasks.component.html',
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }

  returnToUsers() {
    this.router.navigate(['/users']);
  }

  createTask() {
    this.router.navigate(['/tasks/create']);
  }

  viewTask(id: number) {
    this.router.navigate(['/tasks', id, 'view']);
  }

  editTask(id: number) {
    this.router.navigate(['/tasks', id, 'edit']);
  }

  deleteTask(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.tasksService.deleteTask(id).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }
}