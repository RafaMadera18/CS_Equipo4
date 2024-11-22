import { TestBed } from '@angular/core/testing';

import { UsageReportManagerService } from './usage-report-manager.service';

describe('UsageReportManagerService', () => {
  let service: UsageReportManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsageReportManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
