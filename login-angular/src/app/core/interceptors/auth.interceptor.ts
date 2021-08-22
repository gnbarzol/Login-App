import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  protected URL_LOGIN = '/auth/sign-in';

  constructor(private router: Router,
    private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.search(this.URL_LOGIN) === -1 && this.authService.getToken()) {
      if (this.authService.tokenIsExpired) {
        this.router.navigate(['auth']).then(_ => false);
        // Llamar al refresh token si es que la api tiene esa funcionalidad
      } else {
        request = request.clone({
          setHeaders: {
            'Authorization': this.authService.getToken().authorization,
            'Content-Type': 'application/json'
          }
        });
      }
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          // Unathorizated
          this.router.navigate(['auth']).then(_ => false);
        } else {
          // Ocurrió cualquier otro tipo de error
        }
        return throwError(error);
      })
    );
  }
}
