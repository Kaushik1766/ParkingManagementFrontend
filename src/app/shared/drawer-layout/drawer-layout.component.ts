import { Component, Input, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-drawer-layout',
  imports: [ButtonModule, DrawerModule],
  templateUrl: './drawer-layout.component.html',
  styleUrl: './drawer-layout.component.scss'
})
export class DrawerLayoutComponent {
  @Input({ required: true }) visible!: boolean
}
