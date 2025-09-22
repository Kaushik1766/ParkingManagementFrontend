import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from 'primeng/floatlabel';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [Button, FormsModule, InputTextModule, FloatLabelModule, Password],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = ''
  password = ''
}
