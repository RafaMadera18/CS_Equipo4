import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Guid } from "@customTypes/guid";
import { ProductStock, ProductStockCreationResult } from "../data";
import { ProductStockCreationData } from "../data/product-stock-creation-data";

@Injectable({
  providedIn: "root",
})
export class InventoryManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getProductStock(): Observable<ProductStock[]> {
    const apiPath: string = this.getApiPath();

    return this._httpClient.get<ProductStock[]>(apiPath);
  }

  public addProductStock(
    productStockCreationData: ProductStockCreationData,
  ): Observable<ProductStockCreationResult> {
    const apiPath: string = this.getApiPath();

    return this._httpClient.post<ProductStockCreationResult>(
      apiPath,
      productStockCreationData,
    );
  }

  public deleteProductStock(productId: Guid): Observable<void> {
    const apiPath: string = this.getApiPath(productId);

    return this._httpClient.delete<void>(apiPath);
  }

  private getApiPath(path: string = ""): string {
    return `api/inventory/${path}`;
  }
}
