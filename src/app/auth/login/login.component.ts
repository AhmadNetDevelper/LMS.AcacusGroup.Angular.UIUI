import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/core/services/auth.service';
import { NotificationService } from 'src/app/infrastructure/core/services/notification.service';
import { TokenService } from 'src/app/infrastructure/core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isInProgress: boolean = false;
  public isHidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.ngInitialControlForm();
  }

  ngInitialControlForm() {
    this.loginForm = this.formBuilder.group({
      Email: [null, Validators.required],
      Password: [null, Validators.compose([Validators.required])],
    });
  }

  logIn() {
    this.isInProgress = true;
    this.authService.login(this.loginForm.value).subscribe(
      (next) => {
        this.tokenService
          .isAdmin()
          .pipe(
            map((isAdmin) => {
              if (isAdmin) {
                this.router.navigateByUrl('book-list');
              } else {
                this.router.navigateByUrl('/books-order');
              }
            })
          )
          .subscribe(() => {});
      },
      (error) => {
        this.isInProgress = false;
        this.notify.showError('Invalid Email Or Password');
        this.loginForm.reset();
        this.isInProgress = false;
      },
      () => {}
    );
  }

  registerRedirect() {
    this.router.navigateByUrl('/auth/register');
  }
}
