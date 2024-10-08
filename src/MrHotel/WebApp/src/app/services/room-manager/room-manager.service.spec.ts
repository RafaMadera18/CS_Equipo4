import { TestBed } from "@angular/core/testing";

import { ReservationManagerService } from "./room-manager.service";

describe("ReservationManagerService", () => {
  let service: ReservationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
