import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'inicio', component: UsersComponent },
    { 
      path: 'users', 
      loadComponent: () => import('./users/users.component').then(m => m.UsersComponent)
    },
    { 
      path: 'users/create', 
      loadComponent: () => import('./users/manage-users.component').then(m => m.ManageUsersComponent)
    },
    { 
      path: 'users/:id/:mode', 
      loadComponent: () => import('./users/manage-users.component').then(m => m.ManageUsersComponent)
    },


    { 
      path: 'tasks', 
      loadComponent: () => import('./tasks/tasks.component').then(m => m.TasksComponent)
    },
    { 
      path: 'tasks/create', 
      loadComponent: () => import('./tasks/manage-tasks.component').then(m => m.ManageTasksComponent)
    },
    { 
      path: 'tasks/:id/:mode', 
      loadComponent: () => import('./tasks/manage-tasks.component').then(m => m.ManageTasksComponent)
    },

    { 
      path: '', 
      redirectTo: '/users', 
      pathMatch: 'full' 
    }
    
  ];