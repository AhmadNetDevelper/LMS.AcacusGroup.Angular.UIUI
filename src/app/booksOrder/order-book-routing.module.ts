import { Routes } from '@angular/router';
import { OrderBooksComponent } from './order-books/order-books.component';

export const bookOrderRoutes: Routes = [
  {
    path: 'books-order',
    component: OrderBooksComponent,
  },
];
