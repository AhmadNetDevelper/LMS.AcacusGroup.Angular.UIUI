import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api/api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.staging';
import { BookModel } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private apiService: ApiService) {}

  getAllBooks(): Observable<any> {
    return this.apiService.get(`${environment.apiRoute}/books/get-books`);
  }

  getBooks(pageIndex: number, PageSize: number): Observable<any> {
    debugger;
    return this.apiService.get(
      `${environment.apiRoute}/books/get-books` +
        '?pageIndex=' +
        pageIndex +
        '&pageSize=' +
        PageSize
    );
  }

  getBookId(bookId: number): Observable<any> {
    return this.apiService.get(
      `${environment.apiRoute}/books/get-book-id` + '?bookId=' + bookId
    );
  }

  addBook(request: BookModel): Observable<any> {
    debugger
    return this.apiService.post(
      `${environment.apiRoute}/books/create-book`,
      request
    );
  }

  updateBook(booksForm: BookModel): Observable<BookModel> {
    return this.apiService.put(
      `${environment.apiRoute}/books/update-book`,
      booksForm
    );
  }

  deleteBook(id: number): Observable<any> {
    return this.apiService.delete(
      `${environment.apiRoute}/books/DeleteBook?id=` + id
    );
  }
}
