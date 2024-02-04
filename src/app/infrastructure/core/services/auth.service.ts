import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api/api.service';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment.staging';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper: JwtHelperService;

  constructor(private apiService: ApiService,
        private tokenService: TokenService,) { }

        setTokenAfterLogin(response: any): void {
          const user = response;
          if (user) {
              sessionStorage.setItem('authToken', user.token);
              const decodedAuthToken = this.tokenService.decodeToken(user.token);
              this.tokenService.setAuthToken(decodedAuthToken);
          }
      }

      login(logModel: any) {
        debugger
        return this.apiService
            .post(`${environment.apiRoute}/authentication/user-login`, logModel)
            .pipe(
                tap((response: any) => this.setTokenAfterLogin(response)),
                catchError((e) => throwError(e)),
            );
    }

    IsUserExists(userEmail: string) {
      return this.apiService.get(
          `${environment.apiRoute}/authentication/is-user-exist-by-email` +
              '?userEmail=' +
              userEmail,
      );
  }

  register(userRegister: any) {
    console.log(userRegister);
    return this.apiService.post(
        `${environment.apiRoute}/authentication/register`,
        userRegister,
    );
}

GetToken() {
  return sessionStorage.getItem('UserToken');
}

IsTokenExpiredDate() {
  return this.jwtHelper.isTokenExpired(this.GetToken());
}

DeleteToken() {
  return sessionStorage.removeItem('UserToken');
}

loggedOut() {
  sessionStorage.clear();
  this.clearSession();
}

private clearSession(): void {
  this.tokenService.resetAuthToken();
}
}
