import { TestBed } from '@angular/core/testing';

import { UsageReportManagerGatewayService } from './usage-report-manager-gateway.service';

describe('UsageReportManagerGatewayService', () => {
  let service: UsageReportManagerGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsageReportManagerGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
