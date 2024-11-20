import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { mapCollection } from "@utilities/rxjs";

import { Guid } from "@customTypes/guid";

import { PurchaseReport } from "../data/purchase-report";

@Injectable({
  providedIn: 'root'
})
export class ReportManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}
}
