import { TestBed } from '@angular/core/testing';

import { RoomPropertyGroupManagerService } from './room-property-group-manager.service';

describe('RoomPropertyGroupManagerService', () => {
  let service: RoomPropertyGroupManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomPropertyGroupManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
