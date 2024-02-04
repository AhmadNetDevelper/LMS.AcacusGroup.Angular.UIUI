import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { State } from 'src/app/shared/services/CommonMemmber';

@Component({
  selector: 'app-user-edit-control',
  templateUrl: './user-edit-control.component.html',
  styleUrls: ['./user-edit-control.component.scss'],
})
export class UserEditControlComponent implements OnInit {
  public UserEditControl = new  FormGroup({
    searchInput: new FormControl(''),
  });

  @Input() SearchPlaceHolder: string;
  @Output() notify: EventEmitter<State> = new EventEmitter<State>();
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() IsShowAddButton = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  clear(searchFilter: any) {
    this.UserEditControl.reset();
    this.applyFilter(searchFilter.target.value);
  }

  onAddClick() {
    this.notify.emit(State.Add);
  }

  onKeyUpEnterFilter(searchFilter: any) {
    setTimeout(() => this.searchChange.emit(searchFilter.target.value));
  }

  applyFilter(searchFilter: any) {
    if (searchFilter) {
      if (searchFilter.length === 0) {
        setTimeout(() => this.searchChange.emit(searchFilter));
      }
    } else {
      setTimeout(() => this.searchChange.emit(''));
    }
  }
}
