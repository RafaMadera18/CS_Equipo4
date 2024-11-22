import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ObservableCollection } from "@utilities/rxjs";
import { ProductStock } from "./data/product-stock";
import { Nullable } from "@customTypes/nullable";
import { ProductStockCreationData } from "./data/product-stock-creation-data";
import { InventoryManagerGatewayService } from "./gateway/inventory-manager-gateway.service";
import { ProductStockCreationResult } from "./data";

@Injectable({
  providedIn: "root",
})
export class InventoryManagerService {
  private _productStocksCache: Nullable<ObservableCollection<ProductStock>> =
    null;

  constructor(
    private readonly _inventoryGateway: InventoryManagerGatewayService,
  ) {}

  public getProductStock(
    ignoreCache: boolean = false,
  ): Observable<readonly ProductStock[]> {
    if (this._productStocksCache !== null && !ignoreCache) {
      return this._productStocksCache.items$;
    }

    const productStock = this._inventoryGateway.getProductStock();

    this._productStocksCache ??= new ObservableCollection();
    return this._productStocksCache.loadItems(productStock);
  }

  public addProductStock(
    productStockCreationData: ProductStockCreationData,
  ): Observable<ProductStockCreationResult> {
    const addRequest = this._inventoryGateway.addProductStock(
      productStockCreationData,
    );

    return addRequest.pipe(
      tap((newIds: ProductStockCreationResult) => {
        this._productStocksCache?.add(
          productStockCreationData.toProductStock(
            newIds.stockId,
            newIds.productId,
          ),
        );
      }),
    );
  }

  public deleteProductStock(productStock: ProductStock): Observable<void> {
    const deleteRequest = this._inventoryGateway.deleteProductStock(
      productStock.id,
    );

    return deleteRequest.pipe(
      tap(() => {
        this._productStocksCache?.removeFirstWhere(
          (cacheProductStock) => cacheProductStock.id === productStock.id,
        );
      }),
    );
  }
}
