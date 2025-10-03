import { Component, inject, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-drawer-layout',
  imports: [ButtonModule, DrawerModule],
  templateUrl: './drawer-layout.component.html',
  styleUrl: './drawer-layout.component.scss'
})
export class DrawerLayoutComponent {
  private authService = inject(AuthService)

  visible = model<boolean>(true)

  get currentUser() {
    return this.authService.userSignal()
  }

  logout() {
    this.authService.logout()
  }
}
