import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private _toastrService: NbToastrService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          this.showToast(`Problema detectado!`, 'top-right', 'danger');
          errorMessage = `${error.error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  showToast(message, position, status) {
    this._toastrService.show(
      'Intente de nuevo!',
      `Resultado: ${message}`,
      { position, status });
  }
}
