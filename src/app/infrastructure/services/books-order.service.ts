import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api/api.service';
import { environment } from 'src/environments/environment.staging';
import { ApproveOrderBook, RequestBookFromLibrary } from '../models/addBookToLibrary';

@Injectable({
  providedIn: 'root'
})
export class BooksOrderService {

  constructor(private apiService: ApiService) {}

  reserveBook(requestBookToLibrary: RequestBookFromLibrary): Observable<any> {
    debugger;
    return this.apiService.post(
      `${environment.apiRoute}/checkout/checkout-book`, requestBookToLibrary);
  }

  getOrdersBooksNeedApproval(pageIndex: number, PageSize: number): Observable<any> {
    debugger;
    return this.apiService.get(
      `${environment.apiRoute}/checkout/get-orders-books-need-approval` +
        '?pageIndex=' +
        pageIndex +
        '&pageSize=' +
        PageSize
    );
  }

  approveOrderBook(approveOrderBook: ApproveOrderBook): Observable<any> {
    debugger;
    return this.apiService.post(
      `${environment.apiRoute}/checkout/approve-order-book`, approveOrderBook);
  }
}
