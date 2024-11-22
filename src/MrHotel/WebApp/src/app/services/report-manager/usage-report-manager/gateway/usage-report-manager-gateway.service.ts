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

    return this._httpClient.post<Guid>(apiPath, usageReport);
  }

  private getApiPath(url: string = ""): string {
    return `api/reports/usages${url}`;
  }
}
