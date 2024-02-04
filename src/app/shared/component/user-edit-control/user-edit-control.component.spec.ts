import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditControlComponent } from './user-edit-control.component';

describe('UserEditControlComponent', () => {
  let component: UserEditControlComponent;
  let fixture: ComponentFixture<UserEditControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditControlComponent]
    });
    fixture = TestBed.createComponent(UserEditControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
