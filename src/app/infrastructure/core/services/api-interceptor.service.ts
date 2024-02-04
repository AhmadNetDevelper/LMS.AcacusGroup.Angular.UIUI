import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
    private LANG_HEADER = 'Accept-Language';
    private isRefreshingToken: boolean = false;
    private tokenSubject: BehaviorSubject<void> = new BehaviorSubject<void>(null!);

    constructor(private authService: AuthService, private router: Router) {}

    intercept<T>(
      req: HttpRequest<T>,
      next: HttpHandler,
  ): Observable<HttpEvent<T>> {
      req = this.addHeaderParameters(req);
debugger
      return next.handle(req).pipe(
          catchError((error) => {
            debugger
              switch (error.status) {
                  case 401:
                  case 403:
                      this.logoutOnAuthError();
                      break;
              }
              return throwError(error);
          }),
      );
  }

  private addHeaderParameters<T>(request: HttpRequest<T>): HttpRequest<T> {
    const authToken = sessionStorage.getItem('authToken');
    const userLanguage = "1";
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
debugger
    // TODO: Consider this flow.
    if (!authToken && !userLanguage) {
        return request;
    } else if (!userLanguage) {
        return request.clone({
            headers: request.headers.set(
                this.AUTH_HEADER,
                `Bearer ${authToken}`,
            ),
        });
    } else if (!authToken) {
        return request.clone({
            headers: request.headers.set(this.LANG_HEADER, userLanguage),
        });
    }

    return request.clone({
        headers: request.headers
            .set(this.AUTH_HEADER, `Bearer ${authToken}`)
            .set(this.LANG_HEADER, userLanguage),
    });
}
/**
 * Initial native behavior for 403s.
 */
private logoutOnAuthError(): void {
    debugger
    this.authService.loggedOut();
    this.router.navigateByUrl('/auth');
}

}
