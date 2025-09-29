import { Component } from '@angular/core';
import { UserDrawerComponent } from '../drawer/user-drawer.component';

@Component({
  selector: 'app-dashboard',
  imports: [UserDrawerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
