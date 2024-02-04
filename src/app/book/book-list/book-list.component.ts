import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/infrastructure/core/services/notification.service';
import { BookModel } from 'src/app/infrastructure/models/book';
import { BookService } from 'src/app/infrastructure/services/book-service';
import { ActionRowGrid, DynamicColumn, State } from 'src/app/shared/services/CommonMemmber';
import { AddBookComponent } from '../add-book/add-book.component';
import { catchError, of, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/material-component/confirm-dialog/confirm-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit{
  public UserEditControl = new  FormGroup({
    searchInput: new FormControl(''),
  });
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public paginationIndex = 0;
  public pageIndex = 1;
  public pageSize = 5;
  public lengthData = 0;
  public bookDataSource = new MatTableDataSource<BookModel>([]);
  public displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'publishedYear',
    'availableCopies',
    'totalCopies',
    'iSBN',
    'genre',
    'isAvailable',
    'Actions'
  ];

  constructor(
    private BooksService: BookService,
    private dialog: MatDialog,
    private notify: NotificationService,
    private changeDetectorRef: ChangeDetectorRef
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

  onPaginationClick(page : any){
    debugger
    var pgIndex = page.pageIndex += 1;
    this.LoadBooks(pgIndex, page.pageSize);

  }

  ngOnInit(): void {
    this.LoadBooks(this.pageIndex, this.pageSize);
  }

  LoadBooks(pageIndex: number, pageSize: number) {
    this.BooksService.getBooks(pageIndex, pageSize).subscribe(
      (paginationRecord) => {
        debugger
        console.log(paginationRecord.dataRecord);
        this.bookDataSource.data = paginationRecord.dataRecord;
        this.lengthData = paginationRecord.countRecord;

        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        this.notify.showError('Error On Load Data');
      }
    );
  }

clear(searchFilter: any) {
  this.UserEditControl.reset();
  this.applyFilter(searchFilter.target.value);
}

applyFilter(searchKey: string) {
  this.bookDataSource.filter = searchKey
      ? searchKey.trim().toLocaleLowerCase()
      : '';
}

onAddClick() {
  const dialog = this.dialog.open(
      AddBookComponent,
      this.getConfigDialog(null),
  );

  return dialog
      .afterClosed()
      .pipe(
          switchMap((dialogResult: string) => {
            debugger
              if (dialogResult) {
                  this.LoadBooks(1, this.pageSize);
                  this.bookDataSource.paginator = this.paginator;
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

onEdit(bookModel: BookModel) {
  const dialog = this.dialog.open(
      AddBookComponent,
      this.getConfigDialog(bookModel),
  );

  return dialog
      .afterClosed()
      .pipe(
          switchMap((dialogResult: string) => {
              if (dialogResult) {
                  this.LoadBooks(1, this.pageSize);
                  this.notify.showSuccess('Updated Successfully');
                  return of({});
              } else {
                  this.notify.showSuccess('Cancel Update');
                  return of({});
              }
          }),
          catchError((): any => {
              this.notify.showError('Error On Update');
          }),
      )
      .subscribe((result) => {});
}

onDelete(bookModel: BookModel) {
  return this.dialog
      .open(ConfirmDialogComponent, {
          width: '28em',
          height: '11em',
          panelClass: 'confirm-dialog-container',
          position: { top: '5em' },
          disableClose: true,
          data: {
              messageList: ['Are You Sure Want to Delete ?'],
              action: 'Delete',
              showCancel: true,
          },
      })
      .afterClosed()
      .pipe(
          switchMap((dialogResult: string) => {
              // if (dialogResult) {
              //     return this.BooksService.deleteBook(bookModel.id);
              // } else {
              //     this.notify.showSuccess('Cancel Delete');
              //     return of(false);
              // }
              return of(false);
          }),
          catchError((): any => {
              this.notify.showError('Error On Delete');
          }),
      )
      .subscribe((result) => {
        debugger
        if(result){
          this.LoadBooks(1, this.pageSize);
          this.notify.showSuccess('Deleted Successfully');
        }
      });
}
}
