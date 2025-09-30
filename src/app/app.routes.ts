import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SignupComponent } from './signup/signup.component';
import { BuildingsComponent } from './admin/buildings/buildings.component';
import { authGuard } from './guards/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { adminGuard } from './guards/admin.guard';
import { loginGuard } from './guards/login.guard';
import { UserDrawerComponent } from './user/drawer/user-drawer.component';
import { AdminDrawerComponent } from './admin/drawer/admin-drawer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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
        redirectTo: 'vehicles',
        pathMatch: 'full'
      },
      {
        path: 'vehicles',
        loadComponent: () => import('./user/vehicles/vehicles.component').then(m => m.VehiclesComponent),
      }
    ]
  },
  {
    path: 'admin',
    component: AdminDrawerComponent,
    canActivateChild: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'buildings',
        pathMatch: 'full'
      },
      {
        path: 'buildings',
        component: BuildingsComponent,
      }
    ]
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];
