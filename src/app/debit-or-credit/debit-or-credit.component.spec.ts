import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitOrCreditComponent } from './debit-or-credit.component';

describe('DebitOrCreditComponent', () => {
  let component: DebitOrCreditComponent;
  let fixture: ComponentFixture<DebitOrCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitOrCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitOrCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
