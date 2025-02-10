import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../Services/users-service.service';
import { TasksService } from '../Services/tasks.service';

interface TaskForm {
  id?: number;
  user_id: number;
  title: string;
  description: string;
  completed: number;
}


@Component({
  selector: 'app-manage-tasks',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [TasksService, UsersService],
  templateUrl: './manage-tasks.component.html'
})
export class ManageTasksComponent implements OnInit {
  task = {
    id: 0,
    user_id: 0,
    title: '',
    description: '',
    completed: 0
  };

  users: any[] = []; // Para el select de usuarios
  mode: 'create' | 'edit' | 'view' = 'create';
  title = 'Crear Tarea';

  constructor(
    private tasksService: TasksService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
    
    const taskId = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.params['mode'];

    if (taskId) {
      this.loadTask(taskId);
      this.mode = mode || 'view';
      this.updateTitle();
    }
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  loadTask(id: number) {
    this.tasksService.getTask(id).subscribe(
      (data) => {
        this.task = {
          id: data.id || 0,
          user_id: data.user_id,
          title: data.title,
          description: data.description,
          completed: data.completed
        };
      },
      (error) => {
        console.error('Error loading task:', error);
      }
    );
  }

  updateTitle() {
    switch (this.mode) {
      case 'create':
        this.title = 'Crear Tarea';
        break;
      case 'edit':
        this.title = 'Editar Tarea';
        break;
      case 'view':
        this.title = 'Detalles de la Tarea';
        break;
    }
  }

  onSubmit() {
    if (this.mode === 'create') {
      this.tasksService.createTask(this.task).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    } else if (this.mode === 'edit') {
      this.tasksService.updateTask(this.task.id, this.task).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}