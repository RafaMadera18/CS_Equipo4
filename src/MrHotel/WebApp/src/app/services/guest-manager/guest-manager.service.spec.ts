import { TestBed } from '@angular/core/testing';

import { GuestManagerService } from './guest-manager.service';

describe('GuestManagerService', () => {
  let service: GuestManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
