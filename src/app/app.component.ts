import { Component, HostListener, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ParkingManagementFrontend';

  root = inject(DOCUMENT)

  @HostListener('document:keydown', ['$event'])
  toggleDarkMode(e: KeyboardEvent) {
    if (e.altKey && e.key.toLowerCase() == 't') {
      this.root.querySelector('html')?.classList.toggle('dark')
    }
  }
}
