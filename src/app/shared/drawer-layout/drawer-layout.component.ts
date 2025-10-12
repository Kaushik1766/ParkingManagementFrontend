import { Component, inject, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '../../services/auth.service';
import { RouterModule, RouterLink } from '@angular/router';
@Component({
  selector: 'app-drawer-layout',
  imports: [
    RouterLink,

    ButtonModule, 
    DrawerModule 
  ],
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
