import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { roleMatcherGuard } from './role-matcher.guard';

describe('roleMatcherGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleMatcherGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
