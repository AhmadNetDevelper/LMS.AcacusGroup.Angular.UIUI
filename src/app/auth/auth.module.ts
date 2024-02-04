import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../infrastructure/core/services/auth.service';


@NgModule({
  declarations: [
    LoginComponent,
    AuthLayoutComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    DemoMaterialModule
  ],
  providers: [
   AuthService
  ],
})
export class AuthModule { }
