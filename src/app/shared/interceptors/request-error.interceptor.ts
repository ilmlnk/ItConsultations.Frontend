import { HttpErrorResponse, HttpHandler, HttpEvent, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ToasterNotificationsService } from '../services/notifications/toaster-notifications.service';

export class RequestErrorInterceptor implements HttpInterceptor {
  private _toasterNotificationsService = inject(ToasterNotificationsService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.interceptError(error, req);
      })
    );
  }

  private interceptError(error: HttpErrorResponse, req: HttpRequest<any>): Observable<any> {
    this._toasterNotificationsService.showError('Error', error.message);
    return throwError(() => error);
  }
}