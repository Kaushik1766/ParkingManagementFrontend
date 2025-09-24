import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from 'primeng/floatlabel';
import { Password } from 'primeng/password';
import { RouterLink } from '@angular/router';
import { Theme, ThemingService } from '../services/theming.service';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, FormsModule, InputTextModule, FloatLabelModule, Password],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = ''
  password = ''

  themingService = inject(ThemingService)
  login() {
    console.log(this.email, this.password)
    throw ('implementation pending')
  }
}
