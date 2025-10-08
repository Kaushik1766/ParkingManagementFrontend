import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryLoaderComponent } from './retry-loader.component';

describe('RetryLoaderComponent', () => {
  let component: RetryLoaderComponent;
  let fixture: ComponentFixture<RetryLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetryLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetryLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
