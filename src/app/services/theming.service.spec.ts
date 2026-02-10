import { TestBed } from '@angular/core/testing';
import { ThemingService, Theme } from './theming.service';

describe('ThemingService', () => {
  let service: ThemingService;

  beforeEach(() => {
    document.documentElement.className = '';
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemingService);
  });

  afterEach(() => {
    document.documentElement.className = '';
    localStorage.clear();
  });

  it('should set theme and persist', () => {
    service.setTheme(Theme.DARK);
    expect(document.documentElement.classList.contains('dark')).toBeTrue();
    expect(localStorage.getItem('theme')).toBe(Theme.DARK);
  });

  it('should toggle theme and update storage', () => {
    service.setTheme(Theme.LIGHT);
    service.toggleTheme();
    expect(localStorage.getItem('theme')).toBe(Theme.DARK);
    expect(document.documentElement.classList.contains('dark')).toBeTrue();
  });
});
