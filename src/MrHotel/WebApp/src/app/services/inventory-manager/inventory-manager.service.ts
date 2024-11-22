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

  public getProductStocks(
    ignoreCache: boolean = false,
  ): Observable<readonly ProductStock[]> {
    if (this._productStocksCache !== null && !ignoreCache) {
      return this._productStocksCache.items$;
    }

    const productStocks = this._inventoryGateway.getProductStocks();

    this._productStocksCache ??= new ObservableCollection();
    return this._productStocksCache.loadItems(productStocks);
  }

  public addProductStock(
    productStockCreationData: ProductStockCreationData,
  ): Observable<ProductStockCreationResult> {
    const newProductStockIds = this._inventoryGateway.addProductStock(
      productStockCreationData,
    );

    return newProductStockIds.pipe(
      tap((newIds: ProductStockCreationResult) => {
        const newProductStock = productStockCreationData.toProductStock(
          newIds.stockId,
          newIds.productId,
        );

        this._productStocksCache?.add(newProductStock);
      }),
    );
  }

  public deleteProductStock(productStock: ProductStock): Observable<void> {
    const deleteResponse = this._inventoryGateway.deleteProductStock(
      productStock.id,
    );

    return deleteResponse.pipe(
      tap(() => {
        this._productStocksCache?.removeFirstWhere(
          (cacheProductStock) => cacheProductStock.id === productStock.id,
        );
      }),
    );
  }
}
