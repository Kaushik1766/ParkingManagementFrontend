import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { adminGuard } from './guards/admin.guard';
import { loginGuard } from './guards/login.guard';
import { UserDrawerComponent } from './user/drawer/user-drawer.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'user',
    component: UserDrawerComponent,
    // canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./user/dashboard/dashboard.component').then(m => m.DashboardComponent),
      }
    ]
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];
