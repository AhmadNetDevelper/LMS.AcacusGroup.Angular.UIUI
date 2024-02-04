import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { bookOrderRoutes } from './order-book-routing.module';
import { DemoMaterialModule } from '../demo-material-module';
import { RouterModule } from '@angular/router';
import { OrderBooksComponent } from './order-books/order-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderBooksComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(bookOrderRoutes),
    FormsModule, ReactiveFormsModule
  ],
})
export class OrderBookModule {}
