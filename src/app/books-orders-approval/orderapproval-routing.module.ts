import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersApprovalComponent } from './orders-approval/orders-approval.component';

export const orderApprovalRoutes: Routes = [
  {
    path: 'orders-approval',
    component: OrdersApprovalComponent,
  },
];
