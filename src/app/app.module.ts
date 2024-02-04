
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.staging';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './infrastructure/core/core.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    AppSidebarComponent,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
          deps: [HttpClient],
      },
  }),
    JwtModule.forRoot({
      config: {
          tokenGetter: () => sessionStorage.getItem('authToken'),
          allowedDomains: [environment.apiRoute],
      },
  }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
