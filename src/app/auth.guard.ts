import { CanActivate, CanActivateChildFn, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (childRoute, state) => {
  return false
};
