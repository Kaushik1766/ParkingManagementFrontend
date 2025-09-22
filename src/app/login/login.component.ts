import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthManager1, IAuthManager } from './login.service';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, Button],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
}
