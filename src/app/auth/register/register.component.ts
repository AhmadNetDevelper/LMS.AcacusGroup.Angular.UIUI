import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/core/services/auth.service';
import { NotificationService } from 'src/app/infrastructure/core/services/notification.service';
import { Constants } from 'src/app/infrastructure/utils/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    public registerForm: FormGroup | any;
    public isInProgress = false;
    public isHidePassword: boolean = true;
    public isHidePasswordConfirm: boolean = true;
    public passwordPattern: RegExp = Constants.patterns.PASSWORD_REGEX;

    constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private notify: NotificationService,
  ) {}

  get Email() {
    return this.registerForm.controls.Email.value;
}

get PhoneNumber() {
    return this.registerForm.controls.PhoneNumber.value;
}

  ngOnInit(): void {
    this.ngInitialControlForm();
}

ngInitialControlForm() {
  this.registerForm = this.formBuilder.group({
      UserName: [null, Validators.required],
      Email: [
          null,
          Validators.compose([Validators.required, Validators.email]),
      ],
      PhoneNumber: [null, Validators.required],
      PasswordHash: [null, Validators.required],
      ConfirmPassword: [null, Validators.required]
    });
}

register() {
  this.isInProgress = true;
  void this.authService
      .IsUserExists(this.Email)
      .pipe(
          mergeMap((data) => {
              if (!data) {
                  return this.authService.register(
                      this.registerForm.value,
                  );
              } else {
                  this.notify.showError(
                      'Email Already Exist');

                         
              }
              return of(null);
          }),
          tap((data) => {
              if (data) {
                  this.notify.showTranslateMessage(
                      'Added Successfully', false);

                      this.loginRedirect(); 
              }
          }),
      )
      .subscribe((result) => {
          this.isInProgress = false;
          this.registerForm.reset();
      });
}

ResetControls() {
  this.registerForm.reset();
}

loginRedirect() {
  this.ResetControls();
  this.router.navigateByUrl('/auth/login');
}
}
