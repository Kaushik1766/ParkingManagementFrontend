import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent],
    }).overrideComponent(DashboardComponent, {
      set: {
        imports: [],
        template: '',
      },
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
