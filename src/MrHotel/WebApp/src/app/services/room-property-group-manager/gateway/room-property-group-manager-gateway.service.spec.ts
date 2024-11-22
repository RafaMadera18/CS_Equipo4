import { TestBed } from '@angular/core/testing';

import { RoomPropertyGroupManagerGatewayService } from './room-property-group-manager-gateway.service';

describe('RoomPropertyGroupManagerGatewayService', () => {
  let service: RoomPropertyGroupManagerGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomPropertyGroupManagerGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
