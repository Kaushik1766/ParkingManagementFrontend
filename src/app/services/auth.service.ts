import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Roles, User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSignal = signal<User | null>(null)
  private httpClient = inject(HttpClient)
  constructor() {
    const localUser = localStorage.getItem('user')

    if (localUser) {
      this.userSignal.set(JSON.parse(localUser) as User)
    }
  }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>('auth/login', {
      email: email,
      password: password
    }).pipe(tap(val => {
      try {
        const user = this.tokenParser(val.jwt)
        this.userSignal.set(user)
        localStorage.setItem('user', JSON.stringify(user))
      } catch (e) {
        console.log(e)
      }
    }))
  }

  logout() {
    localStorage.clear()
    this.userSignal.set(null)
  }

  private tokenParser(token: string): User {
    const decoded = jwtDecode<JwtPayload>(token)
    return {
      email: decoded.email,
      id: decoded.jti,
      name: 'to be implemented',
      office: decoded.office,
      role: decoded.role == 0 ? Roles.CUSTOMER : Roles.ADMIN
    }
  }
}
