import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SignupComponent } from './signup/signup.component';
import { BuildingsComponent } from './admin/buildings/buildings.component';
import { authGuard } from './guards/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { adminGuard } from './guards/admin.guard';
import { loginGuard } from './guards/login.guard';
import { UserDrawerComponent } from './user/drawer/user-drawer.component';
import { AdminDrawerComponent } from './admin/drawer/admin-drawer.component';
import { RetryLoaderComponent } from './loaderTest/retry-loader/retry-loader.component';
import { ParkingHistoryComponent } from './user/parking-history/parking-history.component';

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
      },
      {
        path: 'parkingHistory',
        loadComponent: () => import('./user/parking-history/parking-history.component').then(m => m.ParkingHistoryComponent),
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
      },
      {
        path: 'buildings/:buildingId/floors',
        loadComponent: () => import('./admin/floors/floors.component').then(m => m.FloorsComponent),
      },
      {
        path: 'buildings/:buildingId/floors/:floorId/slots',
        loadComponent: () => import('./admin/slots/slots.component').then(m => m.SlotsComponent),
      }
    ]
  },
  {
    path: 'test',
    component: RetryLoaderComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];
