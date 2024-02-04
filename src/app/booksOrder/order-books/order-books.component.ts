import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map } from 'rxjs';
import { NotificationService } from 'src/app/infrastructure/core/services/notification.service';
import {
  AddBookToLibrary,
  RequestBookFromLibrary,
} from 'src/app/infrastructure/models/addBookToLibrary';
import { BookModel } from 'src/app/infrastructure/models/book';
import { BooksOrderService } from 'src/app/infrastructure/services/books-order.service';
import { LibraryService } from 'src/app/infrastructure/services/library.service';

@Component({
  selector: 'app-order-books',
  templateUrl: './order-books.component.html',
  styleUrls: ['./order-books.component.scss'],
})
export class OrderBooksComponent implements OnInit {
  public UserEditControl = new FormGroup({
    searchInput: new FormControl(''),
  });

  constructor(
    private dialog: MatDialog,
    private notify: NotificationService,
    private changeDetectorRef: ChangeDetectorRef,
    private libraryService: LibraryService,
    private bookOrderService: BooksOrderService
  ) {}

  @ViewChild(MatPaginator, { static: false }) paginator:
    | MatPaginator
    | undefined;
  public paginationIndex = 0;
  public pageIndex = 1;
  public pageSize = 5;
  public lengthData = 0;
  public libraryBookDataSource = new MatTableDataSource<BookModel>([]);
  public displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'publishedYear',
    'availableCopies',
    'totalCopies',
    'isAvailable',
    'Actions',
  ];

  onPaginationClick(page: any) {
    var pgIndex = (page.pageIndex += 1);
    this.LoadLibraryBooks(pgIndex, page.pageSize);
  }

  clear(searchFilter: any) {
    this.applyFilter(searchFilter.target.value);
  }

  applyFilter(searchKey: string) {
    this.libraryBookDataSource.filter = searchKey
      ? searchKey.trim().toLocaleLowerCase()
      : '';
  }

  ngOnInit(): void {
    this.LoadLibraryBooks(this.pageIndex, this.pageSize);
  }

  LoadLibraryBooks(pageIndex: number, pageSize: number) {
    this.libraryService.getLibraryBooks(pageIndex, pageSize).subscribe(
      (paginationRecord) => {
        debugger;
        console.log(paginationRecord.dataRecord);
        this.libraryBookDataSource.data = paginationRecord.dataRecord;
        this.lengthData = paginationRecord.countRecord;

        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        this.notify.showError('Error On Load Data');
      }
    );
  }

  onBookRequestClick(row: any) {
    debugger
    let addToLibrary = new RequestBookFromLibrary();
    addToLibrary.bookId = row.id;
    return this.bookOrderService
      .reserveBook(addToLibrary)
      .pipe(
        map((isAdded) => {
          this.notify.showError('Book Added Successfully');
          this.LoadLibraryBooks(this.pageIndex, this.pageSize);
        }),
        catchError((): any => {
          this.notify.showError('Book Not Added Successfully');
        })
      )
      .subscribe((result) => {});
  }
}
