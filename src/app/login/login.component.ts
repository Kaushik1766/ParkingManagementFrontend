import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from 'primeng/floatlabel';
import { Password } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';
import { ThemingService } from '../services/theming.service';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/user';
import { Toast } from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [Toast, Button, RouterLink, FormsModule, InputTextModule, FloatLabelModule, Password],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  themingService = inject(ThemingService)
  private authService = inject(AuthService)
  private destroyRef = inject(DestroyRef)
  private router = inject(Router)
  private toastMessageService = inject(MessageService)

  email = ''
  password = ''
  loading = signal(false)
  errorMessage = signal('')


  login() {
    this.loading.set(true)
    const loginSub = this.authService.login(this.email, this.password).subscribe({
      next: () => {
        if (this.authService.userSignal()?.role == Roles.ADMIN) {
          this.router.navigate(['admin'])
        } else {
          this.router.navigate(['user'])
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false)
        this.toastMessageService.add({
          severity: 'error',
          closable: true,
          summary: 'Login Error',
          detail: err.error.message,
          life: 5000,
        })
      },
    })

    this.destroyRef.onDestroy(() => {
      loginSub.unsubscribe()
    })
  }
}
