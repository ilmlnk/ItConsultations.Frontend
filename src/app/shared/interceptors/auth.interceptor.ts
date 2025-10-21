import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Environment } from '../../../environment';
import { from, of, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const serviceUrl = Environment.serviceUrl;

  return next(req);

  /*if (authService.isAuthenticated && req.url.startsWith(serviceUrl)) {
    return from(authService.getIdToken()).pipe(
      switchMap(token => {
        if (token) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next(authReq);
        } else {
          return next(req);
        }
      })
    )
  }
  return next(req);*/
};
