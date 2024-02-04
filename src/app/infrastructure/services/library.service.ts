import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api/api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.staging';
import { AddBookToLibrary } from '../models/addBookToLibrary';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private apiService: ApiService) {}

  getLibraryBooks(pageIndex: number, PageSize: number): Observable<any> {
    debugger;
    return this.apiService.get(
      `${environment.apiRoute}/libraries/get-Added-books` +
        '?pageIndex=' +
        pageIndex +
        '&pageSize=' +
        PageSize
    );
  }

  getBooksNotAdded(pageIndex: number, PageSize: number): Observable<any> {
    debugger;
    return this.apiService.get(
      `${environment.apiRoute}/libraries/get-books-not-added` +
        '?pageIndex=' +
        pageIndex +
        '&pageSize=' +
        PageSize
    );
  }

  addBookNotAdded(addBookToLibrary: AddBookToLibrary): Observable<any> {
    debugger;
    return this.apiService.post(
      `${environment.apiRoute}/libraries/add-book-to-library`, addBookToLibrary);
  }

  RemoveBookAdded(addBookToLibrary: AddBookToLibrary): Observable<any> {
    debugger;
    return this.apiService.post(
      `${environment.apiRoute}/libraries/remove-book-from-library`, addBookToLibrary);
  }
}
