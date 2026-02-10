import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { SignupComponent } from './signup.component';
import { AuthService } from '../services/auth.service';
import { OfficeService } from '../services/office.service';
import { ThemingService } from '../services/theming.service';
import { Office } from '../models/office';
import { RouterTestingModule } from '@angular/router/testing';

const officesMock: Office[] = [
  { building_id: 'b1', floor_number: 1, office_name: 'HQ', office_id: 'o1' },
];

describe('SignupComponent', () => {
  let component: SignupComponent;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let officeServiceMock: jasmine.SpyObj<OfficeService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['signup']);
    officeServiceMock = jasmine.createSpyObj('OfficeService', ['getOffices']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    officeServiceMock.getOffices.and.returnValue(of(officesMock));

    TestBed.configureTestingModule({
      imports: [SignupComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: OfficeService, useValue: officeServiceMock },
        { provide: ThemingService, useValue: {} },
      ],
    }).overrideComponent(SignupComponent, {
      set: {
        template: '', // avoid template dependencies (routerLink / PrimeNG Toast)
        providers: [{ provide: MessageService, useValue: messageServiceMock }],
      },
    });

    const fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load offices on init', () => {
    expect(officeServiceMock.getOffices).toHaveBeenCalled();
    expect(component.offices).toEqual(officesMock);
  });

  it('should submit signup and show success toast when form is valid', () => {
    authServiceMock.signup.and.returnValue(of({}));
    component.signupForm.setValue({
      userName: 'john123',
      email: 'john@example.com',
      password: 'pw123',
      office: 'o1',
    });

    component.signup();

    expect(authServiceMock.signup).toHaveBeenCalledWith({
      email: 'john@example.com',
      name: 'john123',
      officeId: 'o1',
      password: 'pw123',
    });
    expect(messageServiceMock.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ severity: 'success' })
    );
    expect(component.isLoading).toBeFalse();
  });

  it('should show error toast when signup fails', () => {
    authServiceMock.signup.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: { message: 'Signup failed' } }))
    );
    component.signupForm.setValue({
      userName: 'john123',
      email: 'john@example.com',
      password: 'pw123',
      office: 'o1',
    });

    component.signup();

    expect(messageServiceMock.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ severity: 'error', detail: 'Signup failed' })
    );
    expect(component.isLoading).toBeFalse();
  });
});
