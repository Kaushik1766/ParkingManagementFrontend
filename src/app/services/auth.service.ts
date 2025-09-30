import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Roles, User } from '../models/user';
import { Router } from '@angular/router';
import { SignupRequest } from '../models/signup.api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSignal = signal<User | null>(null)

  private httpClient = inject(HttpClient)
  private router = inject(Router)

  constructor() {
    const token = localStorage.getItem('token')

    if (token) {
      this.userSignal.set(this.tokenParser(token))
    }
  }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>('auth/login', {
      email: email,
      password: password
    }).pipe(tap(val => {
      try {
        localStorage.setItem('token', JSON.stringify(val.jwt))
        const user = this.tokenParser(val.jwt)
        this.userSignal.set(user)
      } catch (e) {
        console.log(e)
      }
    }))
  }

  signup(userDetails: SignupRequest) {
    return this.httpClient.post('auth/register', userDetails)
  }

  logout() {
    localStorage.clear()
    this.userSignal.set(null)
    this.router.navigate(['/login'])
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
