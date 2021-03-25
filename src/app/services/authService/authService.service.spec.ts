import { TestBed } from '@angular/core/testing';

import { AuthService } from './authService';

describe('LoginServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
