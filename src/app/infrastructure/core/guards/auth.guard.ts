import { CanActivate, CanActivateChild, CanActivateFn, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
      private notificationService: NotificationService,
      private router: Router,
      private tokenService: TokenService,
  ) {}

  public canActivate(): Observable<boolean> {
      return this.tokenService.isLoggedInUser().pipe(
          take(1),
          tap((isLoggedInUser) => {
              if (!isLoggedInUser) {
                  this.notificationService.showError('BackToLoginPage');
                  this.router.navigateByUrl('/auth');
              }
          }),
      );
  }

  public canActivateChild(): Observable<boolean> {
      return this.canActivate();
  }
}
