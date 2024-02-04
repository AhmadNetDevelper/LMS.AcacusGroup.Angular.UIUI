import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { orderApprovalRoutes } from './orderapproval-routing.module';
import { OrdersApprovalComponent } from './orders-approval/orders-approval.component';

@NgModule({
  declarations: [OrdersApprovalComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(orderApprovalRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OrderapprovalModule {}
