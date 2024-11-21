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
    const apiUrl: string = this.getApiPath();

    return this._httpClient.get<ProductStock[]>(apiUrl);
  }

  public addNewProductToStock(
    productCreationData: ProductStockCreationData,
  ): Observable<ProductStockCreationResult> {
    const apiUrl: string = this.getApiPath();

    return this._httpClient.post<ProductStockCreationResult>(apiUrl, productCreationData);
  }

  public deleteProductFromStock(productId: Guid): Observable<void> {
    const apiUrl: string = this.getApiPath(productId);

    return this._httpClient.delete<void>(apiUrl);
  }

  private getApiPath(path: string = ""): string {
    return `api/inventory/${path}`;
  }
}
