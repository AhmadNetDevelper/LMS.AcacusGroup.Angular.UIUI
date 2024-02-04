import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of } from 'rxjs';
import { NotificationService } from 'src/app/infrastructure/core/services/notification.service';
import { ApproveOrderBook, RemoveBookFromLibrary } from 'src/app/infrastructure/models/addBookToLibrary';
import { OrderApproval } from 'src/app/infrastructure/models/ordersApproval';
import { BooksOrderService } from 'src/app/infrastructure/services/books-order.service';

@Component({
  selector: 'app-orders-approval',
  templateUrl: './orders-approval.component.html',
  styleUrls: ['./orders-approval.component.scss']
})
export class OrdersApprovalComponent {
  public UserEditControl = new  FormGroup({
    searchInput: new FormControl(''),
  });

  constructor(
    private notify: NotificationService,
    private changeDetectorRef: ChangeDetectorRef,
    private booksOrderService : BooksOrderService
  ) {}

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public paginationIndex = 0;
  public pageIndex = 1;
  public pageSize = 5;
  public lengthData = 0;
  public orderApprovalDataSource = new MatTableDataSource<OrderApproval>([]);
  public displayedColumns: string[] = [
    'id',
    'bookName',
    'patroName',
    'checkoutDate',
    'Actions'
  ];


  onApproveOrderBookClick(row : any){
    debugger
    let approveOrderBook = new ApproveOrderBook();
    approveOrderBook.orderId = row.id;
     return this.booksOrderService.approveOrderBook(approveOrderBook)
     .pipe(
       map((isAdded) => {
         
         this.notify.showError('Order has been Approved Successfully');
         this.LoadOrdersBooksNeedApproval(this.pageIndex, this.pageSize);
     }),
     catchError((): any => {
         this.notify.showError('Book Not Remove Successfully');
     }),
     ).subscribe((result) => { })
   }

  onPaginationClick(page : any){
    var pgIndex = page.pageIndex += 1;
    this.LoadOrdersBooksNeedApproval(pgIndex, page.pageSize);
  }

  clear(searchFilter: any) {
    this.applyFilter(searchFilter.target.value);
  }
  
  applyFilter(searchKey: string) {
    this.orderApprovalDataSource.filter = searchKey
        ? searchKey.trim().toLocaleLowerCase()
        : '';
  }

  ngOnInit(): void {
    this.LoadOrdersBooksNeedApproval(this.pageIndex, this.pageSize);
  }

  LoadOrdersBooksNeedApproval(pageIndex: number, pageSize: number) {
    this.booksOrderService.getOrdersBooksNeedApproval(pageIndex, pageSize).subscribe(
      (paginationRecord) => {
        debugger
        console.log(paginationRecord.dataRecord);
        this.orderApprovalDataSource.data = paginationRecord.dataRecord;
        this.lengthData = paginationRecord.countRecord;

        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        this.notify.showError('Error On Load Data');
      }
    );
  }

  
}
