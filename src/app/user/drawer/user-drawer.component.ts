import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer'
import { DrawerLayoutComponent } from '../../shared/drawer-layout/drawer-layout.component';

@Component({
  selector: 'app-user-drawer',
  imports: [RouterOutlet, DrawerModule, ButtonModule, DrawerLayoutComponent],
  templateUrl: './user-drawer.component.html',
  styleUrl: './user-drawer.component.scss'
})
export class UserDrawerComponent {
  visible: boolean = true;
}
