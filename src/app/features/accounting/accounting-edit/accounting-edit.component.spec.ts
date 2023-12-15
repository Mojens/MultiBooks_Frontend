import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingEditComponent } from './accounting-edit.component';

describe('AccountingEditComponent', () => {
  let component: AccountingEditComponent;
  let fixture: ComponentFixture<AccountingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
