import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesComponent } from './taxes.component';

describe('TaxComponent', () => {
  let component: TaxesComponent;
  let fixture: ComponentFixture<TaxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
