import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAfterLoginComponent } from './user-after-login.component';

describe('UserAfterLoginComponent', () => {
  let component: UserAfterLoginComponent;
  let fixture: ComponentFixture<UserAfterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAfterLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAfterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
