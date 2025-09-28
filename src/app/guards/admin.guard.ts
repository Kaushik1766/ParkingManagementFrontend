import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/user';

export const adminGuard: CanActivateFn = (childRoute, state) => {

  const authService = inject(AuthService)

  const router = inject(Router)

  const user = authService.userSignal()

  if (!user) {
    return router.createUrlTree(['/login'])
  }

  if (user.role == Roles.CUSTOMER) {
    return router.createUrlTree(['/dashboard'])
  }
  return true
};
