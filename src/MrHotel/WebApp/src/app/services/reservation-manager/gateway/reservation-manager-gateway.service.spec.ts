import { TestBed } from '@angular/core/testing';

import { ReservationManagerGatewayService } from './reservation-manager-gateway.service';

describe('ReservationManagerGatewayService', () => {
  let service: ReservationManagerGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationManagerGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
