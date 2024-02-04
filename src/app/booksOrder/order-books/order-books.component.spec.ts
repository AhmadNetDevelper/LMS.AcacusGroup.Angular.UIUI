import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBooksComponent } from './order-books.component';

describe('OrderBooksComponent', () => {
  let component: OrderBooksComponent;
  let fixture: ComponentFixture<OrderBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderBooksComponent]
    });
    fixture = TestBed.createComponent(OrderBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
