import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mergeMap, of } from 'rxjs';
import { BookModel } from 'src/app/infrastructure/models/book';
import { BookService } from 'src/app/infrastructure/services/book-service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  public isInProgress = false;
  public frmAddNew: FormGroup;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public bookModel: BookModel,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private dialogRef: MatDialogRef<AddBookComponent>
  ) {}

  get ID() {
    return this.frmAddNew.controls.Id.value;
  }

  ngOnInit(): void {
    debugger
    this.ngInitialControlForm();
    this.setBookDetails();
  }

  ngInitialControlForm() {
    this.frmAddNew = this.formBuilder.group({
      Id: [0],
      Title: ['', Validators.required],
      Author: ['', Validators.required],
      ISBN: ['', Validators.required],
      Genre: ['', Validators.required],
      PublishedYear: ['', Validators.required],
      AvailableCopies: ['', Validators.required],
      TotalCopies: ['', Validators.required],
      IsAvailable: [false, Validators.required],
    });
  }

  setBookDetails() {
    debugger
    if (this.bookModel) {
      this.frmAddNew.controls.Id.setValue(this.bookModel.id);
      this.frmAddNew.controls.Title.setValue(this.bookModel.title);
      this.frmAddNew.controls.Author.setValue(this.bookModel.author);
      this.frmAddNew.controls.ISBN.setValue(this.bookModel.isbn);
      this.frmAddNew.controls.Genre.setValue(this.bookModel.genre);
      this.frmAddNew.controls.PublishedYear.setValue(
        this.bookModel.publishedYear
      );
      this.frmAddNew.controls.AvailableCopies.setValue(
        this.bookModel.availableCopies
      );
      this.frmAddNew.controls.TotalCopies.setValue(
        this.bookModel.totalCopies
      );
      this.frmAddNew.controls.IsAvailable.setValue(this.bookModel.isAvailable);
    }
  }

  onSubmit() {
    this.isInProgress = true;

    var initialObservable = of({});
    initialObservable
      .pipe(
        mergeMap(() => {
          debugger
          return this.ID === 0
            ? this.bookService.addBook(this.frmAddNew.value)
            : this.bookService.updateBook(this.frmAddNew.value);
        })
      )
      .subscribe((id) => {
        debugger
        if (id) {
          this.dialogRef.close(this.frmAddNew.value);
          this.frmAddNew.reset();
        }
      });
  }

  resetFormBuilder() {
    this.frmAddNew.reset();
    this.isInProgress = false;
  }
}
