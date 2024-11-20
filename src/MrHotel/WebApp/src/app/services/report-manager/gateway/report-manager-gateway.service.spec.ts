import { TestBed } from '@angular/core/testing';

import { ReportManagerGatewayService } from './report-manager-gateway.service';

describe('ReportManagerGatewayService', () => {
  let service: ReportManagerGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportManagerGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
