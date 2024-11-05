import { TestBed } from "@angular/core/testing";

import { RoomAvailabilityManagerGatewayService } from "./room-availability-manager-gateway.service";

describe("RoomAvailabilityManagerGatewayService", () => {
  let service: RoomAvailabilityManagerGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomAvailabilityManagerGatewayService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
