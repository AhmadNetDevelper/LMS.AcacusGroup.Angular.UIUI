import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of, switchMap } from 'rxjs';
import { NotificationService } from 'src/app/infrastructure/core/services/notification.service';
import { BookModel } from 'src/app/infrastructure/models/book';
import { BookService } from 'src/app/infrastructure/services/book-service';
import { LibraryService } from 'src/app/infrastructure/services/library.service';
import { BooksComponent } from '../books/books.component';
import { FormControl, FormGroup } from '@angular/forms';
import { RemoveBookFromLibrary } from 'src/app/infrastructure/models/addBookToLibrary';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnInit {
  public UserEditControl = new  FormGroup({
    searchInput: new FormControl(''),
  });
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
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
    'Actions'
  ];

  constructor(
    private dialog: MatDialog,
    private notify: NotificationService,
    private changeDetectorRef: ChangeDetectorRef,
    private libraryService : LibraryService
  ) {}

  getConfigDialog(data, isAddGridHeader?: boolean): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '80px' };
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    return dialogConfig;
  }

  onRemoveBookClick(row : any){
    debugger
    let addToLibrary = new RemoveBookFromLibrary();
    addToLibrary.bookId = row.id;
     return this.libraryService.RemoveBookAdded(addToLibrary)
     .pipe(
       map((isAdded) => {
         
         this.notify.showError('Book has been removed Successfully');
         this.LoadLibraryBooks(this.pageIndex, this.pageSize);
     }),
     catchError((): any => {
         this.notify.showError('Book Not Remove Successfully');
     }),
     ).subscribe((result) => { })
   }

  onPaginationClick(page : any){
    var pgIndex = page.pageIndex += 1;
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

  onAddClick() {
    const dialog = this.dialog.open(
      BooksComponent,
        this.getConfigDialog(null),
    );
  
    return dialog
        .afterClosed()
        .pipe(
            switchMap((dialogResult: string) => {
              debugger
                if (dialogResult) {
                    this.LoadLibraryBooks(1, this.pageSize);
                    this.libraryBookDataSource.paginator = this.paginator;
                    this.notify.showSuccess('Added Successfully');
                    return of({});
                } else {
                    this.notify.showSuccess('Cancel Add');
                    return of({});
                }
            }),
            catchError((): any => {
                this.notify.showError('Error On Add');
            }),
        )
        .subscribe((result) => {});
  }

  ngOnInit(): void {
    this.LoadLibraryBooks(this.pageIndex, this.pageSize);
  }

  LoadLibraryBooks(pageIndex: number, pageSize: number) {
    this.libraryService.getLibraryBooks(pageIndex, pageSize).subscribe(
      (paginationRecord) => {
        debugger
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

}
