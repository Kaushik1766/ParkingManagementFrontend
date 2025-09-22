import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule, Button } from 'primeng/button'
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ParkingManagementFrontend';

  logVal(v: string) {
    console.log(v)
  }
}
