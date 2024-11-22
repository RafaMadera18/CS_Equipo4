import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Guid } from "@customTypes/index";
import { UsageReportData } from "@services/report-manager/data";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsageReportManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addUsageReport(usageReport: UsageReportData): Observable<Guid> {
    const apiPath: string = this.getApiPath();

    const newUsageReportId = this._httpClient.post<Guid>(apiPath, usageReport);

    return newUsageReportId;
  }

  private getApiPath(path: string = ""): string {
    return `api/reports/usages${path}`;
  }
}
