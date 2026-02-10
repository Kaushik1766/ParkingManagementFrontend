import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Roles, User } from '../models/user';
import { SignupRequest } from '../models/signup.api';
import { AuthService } from './auth.service';

class RouterMock {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: RouterMock;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useClass: RouterMock }],
    });

    router = TestBed.inject(Router) as unknown as RouterMock;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should decode token from constructor when present', () => {
    const user: User = {
      email: 'a@b.com',
      id: '1',
      name: 'to be implemented',
      office: 'HQ',
      role: Roles.ADMIN,
    };
    spyOn<any>(AuthService.prototype, 'tokenParser').and.returnValue(user);
    localStorage.setItem('token', 'tok');

    service = TestBed.inject(AuthService);

    expect(service.userSignal()).toEqual(user);
  });

  it('should login, store token, and set user signal', () => {
    const user: User = {
      email: 'a@b.com',
      id: '1',
      name: 'to be implemented',
      office: 'HQ',
      role: Roles.CUSTOMER,
    };
    spyOn<any>(AuthService.prototype, 'tokenParser').and.returnValue(user);

    service = TestBed.inject(AuthService);

    service.login('a@b.com', 'pw').subscribe();
    const req = httpMock.expectOne('auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'a@b.com', password: 'pw' });
    req.flush({ jwt: 'tok' });

    expect(localStorage.getItem('token')).toBe('tok');
    expect(service.userSignal()?.role).toBe(Roles.CUSTOMER);
  });

  it('should sign up via POST', () => {
    service = TestBed.inject(AuthService);
    const body: SignupRequest = {
      email: 'a@b.com',
      name: 'a',
      officeId: 'o1',
      password: 'pw',
    };

    service.signup(body).subscribe();
    const req = httpMock.expectOne('auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush({});
  });

  it('should logout, clear storage, and navigate', () => {
    service = TestBed.inject(AuthService);
    service.userSignal.set({
      email: 'a',
      id: '1',
      name: 'n',
      office: 'o',
      role: Roles.ADMIN,
    });
    localStorage.setItem('token', 'tok');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(service.userSignal()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
