import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { RouterModule } from '@angular/router';
import { bookRoutes } from '../book/book-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  declarations: [BookListComponent, AddBookComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(bookRoutes),
        FormsModule,
        ReactiveFormsModule
  ],
  exports: [],
})
export class BookModule {}
