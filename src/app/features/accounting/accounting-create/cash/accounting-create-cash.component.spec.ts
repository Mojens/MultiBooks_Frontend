import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingCreateCashComponent } from './accounting-create-cash.component';

describe('AccountingCreateCashComponent', () => {
  let component: AccountingCreateCashComponent;
  let fixture: ComponentFixture<AccountingCreateCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingCreateCashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingCreateCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
