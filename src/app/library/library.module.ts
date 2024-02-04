import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksComponent } from './books/books.component';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { libraryRoutes } from './library-routing.module';
import { LibraryListComponent } from './library-list/library-list.component';

@NgModule({
  declarations: [BooksComponent, LibraryListComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(libraryRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LibraryModule {}
