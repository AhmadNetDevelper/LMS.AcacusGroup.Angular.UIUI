import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersApprovalComponent } from './orders-approval.component';

describe('OrdersApprovalComponent', () => {
  let component: OrdersApprovalComponent;
  let fixture: ComponentFixture<OrdersApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersApprovalComponent]
    });
    fixture = TestBed.createComponent(OrdersApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
