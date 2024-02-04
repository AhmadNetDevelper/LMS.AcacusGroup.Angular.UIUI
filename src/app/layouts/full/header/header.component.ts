import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/infrastructure/core/services/auth.service';
import { NotificationService } from 'src/app/infrastructure/core/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class AppHeaderComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  public selectLangId: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    public translate: TranslateService
  ) {}


  get notificationsList(): any {
    return this.notificationService.notificationSubject;
}

ngOnInit(): void {
  
}

  logout() {
    sessionStorage.removeItem('authToken');
    this.router.navigateByUrl('auth/login');
  }
}
