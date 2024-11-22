import { TestBed } from "@angular/core/testing";

import { InventoryManagerGatewayService } from "./inventory-manager-gateway.service";

describe("GuestManagerGatewayService", () => {
  let service: InventoryManagerGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryManagerGatewayService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
