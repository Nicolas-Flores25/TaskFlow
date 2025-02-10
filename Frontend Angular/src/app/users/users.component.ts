import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../Services/users-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Agregamos Router


@Component({
  selector: 'app-users',
  imports: [CommonModule,HttpClientModule,],
  providers: [UsersService] ,

  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private usersService: UsersService,private router: Router ) {}

  ngOnInit() {
    this.loadUsers();
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

  deleteUser(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usersService.deleteUser(id).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  editUser(id: number) {
    this.router.navigate(['/users', id, 'edit']);
  }

  viewUser(id: number) {
    this.router.navigate(['/users', id, 'view']);
  }

  createUser() {
    this.router.navigate(['/users/create']);
  }

  gotoTask(){
    this.router.navigate(['/tasks/']);

  }

}
