import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { AuthGuard } from './infrastructure/core/guards/auth.guard';
import { AdminGuard } from './infrastructure/core/guards/admin.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('./material-component/material.module').then(
            (m) => m.MaterialComponentsModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: '',
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard],
        loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
      },
      {
        path: '',
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard],
        loadChildren: () => import('./library/library.module').then((m) => m.LibraryModule),
      },
      {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./booksOrder/order-book.module').then((m) => m.OrderBookModule),
      },
      {
        path: '',
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard],
        loadChildren: () => import('./books-orders-approval/orderapproval.module').then((m) => m.OrderapprovalModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
];
