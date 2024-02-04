import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { DemoMaterialModule } from 'src/app/demo-material-module';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    DemoMaterialModule,
    MatSnackBarModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements AfterViewInit {
  @ViewChild('dismissButton', { static: true }) dismissButton!: HTMLElement;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public messageList: string,
    private snackBar: MatSnackBar
  ) {}
  public ngAfterViewInit(): void {
    this.snackBar.open(this.messageList, 'OK', {
      duration: 3000,
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
  }

  public dismiss(): void {
    this.snackBar.dismiss();
  }
}
