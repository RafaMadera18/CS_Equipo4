import { TestBed } from "@angular/core/testing";

import { RoomManagerGatewayService } from "./room-manager-gateway.service";

describe("RoomManagerGatewayService", () => {
  let service: RoomManagerGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomManagerGatewayService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
