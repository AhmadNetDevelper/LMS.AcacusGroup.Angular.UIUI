import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { IConfirmDialogConfig } from 'src/app/infrastructure/models/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    DemoMaterialModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialog: IConfirmDialogConfig,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  public submit(): void {
    this.dialogRef.close(this.dialog);
  }
}
