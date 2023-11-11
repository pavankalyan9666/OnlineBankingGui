import { TestBed } from '@angular/core/testing';

import { SecurityAuthenticationGuard } from './security-authentication.guard';

describe('SecurityAuthenticationGuard', () => {
  let guard: SecurityAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecurityAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
