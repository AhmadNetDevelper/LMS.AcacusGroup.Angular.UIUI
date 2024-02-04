import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { ModuleImportGuard } from './guards/module-import.guard';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
  imports: [CommonModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'CoreModule');
}
}
