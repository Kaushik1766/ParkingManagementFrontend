import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { ThemingService } from '../services/theming.service';
import { Roles, User } from '../models/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let routerMock: jasmine.SpyObj<Router>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['login', 'userSignal']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ThemingService, useValue: {} },
      ],
    }).overrideComponent(LoginComponent, {
      set: {
        template: '', // avoid template dependencies (routerLink / PrimeNG)
        providers: [{ provide: MessageService, useValue: messageServiceMock }],
      },
    });

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should not call login service when form is invalid', () => {
    const form = { invalid: true } as NgForm;

    component.login(form);

    expect(authServiceMock.login).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to admin after successful admin login', () => {
    const form = { invalid: false } as NgForm;
    component.email = 'admin@example.com';
    component.password = 'admin-pass';
    const adminUser: User = {
      email: 'admin@example.com',
      id: '1',
      name: 'Admin',
      office: 'HQ',
      role: Roles.ADMIN,
    };
    authServiceMock.login.and.returnValue(of({ jwt: 'token' }));
    authServiceMock.userSignal.and.returnValue(adminUser);

    component.login(form);

    expect(authServiceMock.login).toHaveBeenCalledWith('admin@example.com', 'admin-pass');
    expect(routerMock.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should navigate to user area when role is customer', () => {
    const form = { invalid: false } as NgForm;
    component.email = 'user@example.com';
    component.password = 'user-pass';
    const customerUser: User = {
      email: 'user@example.com',
      id: '2',
      name: 'User',
      office: 'Branch',
      role: Roles.CUSTOMER,
    };
    authServiceMock.login.and.returnValue(of({ jwt: 'token' }));
    authServiceMock.userSignal.and.returnValue(customerUser);

    component.login(form);

    expect(authServiceMock.login).toHaveBeenCalledWith('user@example.com', 'user-pass');
    expect(routerMock.navigate).toHaveBeenCalledWith(['user']);
  });

  it('should surface error toast and reset loading when login fails', () => {
    const form = { invalid: false } as NgForm;
    component.email = 'user@example.com';
    component.password = 'bad-pass';
    authServiceMock.login.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: { message: 'Invalid' } }))
    );

    component.login(form);

    expect(authServiceMock.login).toHaveBeenCalled();
    expect(messageServiceMock.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ severity: 'error', detail: 'Invalid' })
    );
    expect(component.loading()).toBeFalse();
  });
});
