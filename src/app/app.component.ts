import { Component, HostListener, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemingService } from './services/theming.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ParkingManagementFrontend';

  themeService = inject(ThemingService)

  @HostListener('document:keydown', ['$event'])
  toggleDarkMode(e: KeyboardEvent) {
    if (e.altKey && e.key.toLowerCase() == 't') {
      this.themeService.toggleTheme()
    }
  }
}
