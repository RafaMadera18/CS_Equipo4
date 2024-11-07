import { TestBed } from "@angular/core/testing";

import { RoomAvailabilityManagerService } from "./room-availability-manager.service";

describe("RoomAvailabilityManagerService", () => {
  let service: RoomAvailabilityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomAvailabilityManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
