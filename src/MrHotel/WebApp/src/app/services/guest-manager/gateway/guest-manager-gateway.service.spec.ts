import { TestBed } from "@angular/core/testing";

import { GuestManagerGatewayService } from "./guest-manager-gateway.service";

describe("GuestManagerGatewayService", () => {
  let service: GuestManagerGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestManagerGatewayService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
