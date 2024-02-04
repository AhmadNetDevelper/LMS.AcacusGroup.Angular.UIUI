import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map } from 'rxjs';
import { NotificationService } from 'src/app/infrastructure/core/services/notification.service';
import { AddBookToLibrary } from 'src/app/infrastructure/models/addBookToLibrary';
import { BookModel } from 'src/app/infrastructure/models/book';
import { LibraryService } from 'src/app/infrastructure/services/library.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{

  public UserEditControl = new  FormGroup({
    searchInput: new FormControl(''),
  });

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public paginationIndex = 0;
  public pageIndex = 1;
  public pageSize = 5;
  public lengthData = 0;
  public libraryBookDataSource = new MatTableDataSource<BookModel>([]);
  public addBookToLibrary = new  AddBookToLibrary();
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

  onPaginationClick(page : any){
    var pgIndex = page.pageIndex += 1;
    this.LoadBooksNotAdded(pgIndex, page.pageSize);
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
    this.LoadBooksNotAdded(this.pageIndex, this.pageSize);
  }

  LoadBooksNotAdded(pageIndex: number, pageSize: number) {
    this.libraryService.getBooksNotAdded(pageIndex, pageSize).subscribe(
      (paginationRecord) => {
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

  onAdd(row : any){
   let addToLibrary = new AddBookToLibrary();
   addToLibrary.bookId = row.id;
    return this.libraryService.addBookNotAdded(addToLibrary)
    .pipe(
      map((isAdded) => {
        
        this.notify.showError('Book Added Successfully');
        this.LoadBooksNotAdded(this.pageIndex, this.pageSize);
    }),
    catchError((): any => {
        this.notify.showError('Book Not Added Successfully');
    }),
    ).subscribe((result) => { })
  }

}
