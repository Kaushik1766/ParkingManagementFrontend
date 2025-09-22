import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root"
})
export class AuthManager implements IAuthManager {
  login(): string {
    return 'logged in'
  }
  signup(): string {
    return 'signed up'
  }

}

export interface IAuthManager {
  login(): string;
  signup(): string;
}

@Injectable({
  providedIn: "root"
})
export class AuthManager1 implements IAuthManager {
  login(): string {
    return 'logged in'
  }
  signup(): string {
    return 'signed up'
  }

}
