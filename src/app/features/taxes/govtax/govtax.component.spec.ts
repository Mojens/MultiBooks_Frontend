import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtaxComponent } from './govtax.component';

describe('GovtaxComponent', () => {
  let component: GovtaxComponent;
  let fixture: ComponentFixture<GovtaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovtaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GovtaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
