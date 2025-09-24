import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root"
})
export class AuthManager {
  login(): string {
    return 'logged in'
  }
  signup(): string {
    return 'signed up'
  }

}

