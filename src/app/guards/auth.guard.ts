import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/user';

export const authGuard: CanActivateFn = (childRoute, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  const user = authService.userSignal()

  if (!user) {
    // if (router.url.includes('login') || router.url.includes('signup')) {
    //   return true
    // }
    return router.createUrlTree(['/login'])
  }

  if (user.role == Roles.ADMIN) {
    return router.createUrlTree(['/admin'])
  }
  // if (router.url.includes('login') || router.url.includes('signup')) {
  //   return router.createUrlTree(['/dashboard'])
  // }
  return true
};

