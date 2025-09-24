import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { authGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [authGuard],
    // canActivateChild: [authGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    // canActivate: [authGuard],
    // canActivateChild: [authGuard]
  },
  {
    path: 'login/a',
    component: LoginComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];
