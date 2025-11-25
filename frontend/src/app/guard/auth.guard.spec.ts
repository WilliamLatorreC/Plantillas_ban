import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('Debe permitir activar cuando el usuario está autenticado', () => {
    localStorage.setItem("token", "12345");

    expect(guard.canActivate()).toBeTrue();
  });

  it('Debe bloquear cuando NO está autenticado y redirigir a /login', () => {
    localStorage.removeItem("token");

    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
