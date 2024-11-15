import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { mapCollection } from "@utilities/rxjs";

import { Guid } from "@customTypes/guid";

@Injectable({
  providedIn: "root",
})
export class InventoryManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

}
