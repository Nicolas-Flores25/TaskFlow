import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router,RouterModule  } from '@angular/router';
import { UsersService } from '../Services/users-service.service';
import { HttpClientModule } from '@angular/common/http'; // Añadimos esta importación


@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ,HttpClientModule ],
  providers: [UsersService] ,
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  user = {
    id: 0,
    name: '',
    email: '',
    password: ''
  };
  
  mode: 'create' | 'edit' | 'view' = 'create';
  title = 'Crear Usuario';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    const mode = this.route.snapshot.params['mode'];

    if (userId) {
      this.loadUser(userId);
      this.mode = mode || 'view';
      this.updateTitle();
    }
  }

  loadUser(id: number) {
    this.usersService.getUser(id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error loading user:', error);
      }
    );
  }

  updateTitle() {
    switch (this.mode) {
      case 'create':
        this.title = 'Crear Usuario';
        break;
      case 'edit':
        this.title = 'Editar Usuario';
        break;
      case 'view':
        this.title = 'Detalles del Usuario';
        break;
    }
  }

  onSubmit() {
    if (this.mode === 'create') {
      this.usersService.createUser(this.user).subscribe(
        () => {
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    } else if (this.mode === 'edit') {
      this.usersService.updateUser(this.user.id, this.user).subscribe(
        () => {
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }

}
