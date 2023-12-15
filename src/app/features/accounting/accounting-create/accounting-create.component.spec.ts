import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingCreateComponent } from './accounting-create.component';

describe('AccountingCreateComponent', () => {
  let component: AccountingCreateComponent;
  let fixture: ComponentFixture<AccountingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
