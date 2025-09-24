import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  currentTheme = Theme.LIGHT;
  // themeSubject = new Subject()

  constructor() {
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    // this.themeSubject.next(this.currentTheme)
    document.querySelector('html')?.classList.toggle('dark')
  }
}
