import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer'
import { DrawerLayoutComponent } from '../../shared/drawer-layout/drawer-layout.component';
import { ItemComponent } from '../../shared/drawer/item/item.component';

@Component({
  selector: 'app-admin-drawer',
  imports: [
    RouterOutlet,

    ButtonModule,

    DrawerLayoutComponent,
    ItemComponent
  ],
  templateUrl: './admin-drawer.component.html',
  styleUrl: './admin-drawer.component.scss'
})
export class AdminDrawerComponent {
  visible: boolean = false;
}
