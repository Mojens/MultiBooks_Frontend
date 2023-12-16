import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingCreateCreditComponent } from './accounting-create-credit.component';

describe('AccountingCreateCreditComponent', () => {
  let component: AccountingCreateCreditComponent;
  let fixture: ComponentFixture<AccountingCreateCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingCreateCreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingCreateCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
