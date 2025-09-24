import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-signup',
  imports: [Button, RouterLink, FormsModule, InputTextModule, FloatLabelModule, Password],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userName = ''
  email = ''
  password = ''
  officeName = ''

  signup() {

  }
}
