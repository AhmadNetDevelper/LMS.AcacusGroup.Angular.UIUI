import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HubConnection } from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import {
  Message,
  SystemNotification,
} from 'src/app/shared/services/CommonMemmber';
import { ApiService } from './api/api.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarComponent } from 'src/app/material-component/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public hubConnection: HubConnection;
  dataChange = new BehaviorSubject<Message[]>([]);
  notificationSubject = new BehaviorSubject<SystemNotification[]>([]);

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private translate: TranslateService
  ) {}

  public showSuccess(message: string): void {
    const configSuccess: MatSnackBarConfig<SnackbarComponent> = {
      panelClass: 'success',
      verticalPosition: 'bottom',
      duration: 1000,
    };
    this.openSnackbar(message, configSuccess);
  }

  showTranslateMessage(
    messageKey: string,
    isErrorMessage: boolean = true
  ): void {
    void this.translate
      .get(messageKey)
      .toPromise()
      .then((message: string) =>
        isErrorMessage ? this.showError(message) : this.showSuccess(message)
      );
  }

  public showError(message: string): void {
    const configError: MatSnackBarConfig<SnackbarComponent> = {
      panelClass: 'error',
      verticalPosition: 'top',
      duration: 1000,
    };
    this.openSnackbar(message, configError);
  }

  public openSnackbar(
    message: string,
    config: MatSnackBarConfig<SnackbarComponent>
  ): void {
    // Wrap snackbar call in zone invocation to fix rendering inconsistencies
    this.zone.run(() => {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: message,
        ...config,
      });
    });
  }
}
