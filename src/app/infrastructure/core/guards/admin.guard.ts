import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanActivateFn, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { TokenService } from '../services/token.service';


@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
      private notificationService: NotificationService,
      private router: Router,
      private tokenService: TokenService,
  ) {}

  public canActivate(): Observable<boolean> {
      return this.tokenService.isAdmin().pipe(
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
