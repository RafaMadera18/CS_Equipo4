import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ObservableCollection } from "@utilities/rxjs";

import { Guid } from "@customTypes/guid";
import { ProductStock } from "./data/product-stock";
import { Nullable } from "@customTypes/nullable";
import { ProductCreationData } from "./data/product-stock-creation-data";
import { InventoryManagerGatewayService } from "./gateway/inventory-manager-gateway.service";


@Injectable({
  providedIn: "root",
})
export class InventoryManagerService {
  private _inventoryCache: Nullable<ObservableCollection<ProductStock>> = null;

  constructor(private readonly _inventoryGateway: InventoryManagerGatewayService) {}


  public getProductStock(): Observable<readonly ProductStock[]> {
    if (this._inventoryCache !== null) {
      return this._inventoryCache.items$;
    }

    const productStock = this._inventoryGateway.getProductStock();

    this._inventoryCache = new ObservableCollection();
    return this._inventoryCache.loadItems(productStock);
  }


  public addNewProductToStock(productCreationData: ProductCreationData): Observable<Guid> {
    const addRequest = this._inventoryGateway.addNewProductToStock(productCreationData);

    return addRequest.pipe(
      tap((newProductId: Guid) => {
        this._inventoryCache?.add(productCreationData.toProductStock(newProductId));
      }),
    );
  }


  public deleteProductFromStock(product: ProductStock): Observable<void> {
    const deleteRequest = this._inventoryGateway.deleteProductFromStock(product.id);

    return deleteRequest.pipe(
      tap(() => {
        this._inventoryCache?.removeFirstWhere(
          (cacheProduct) => cacheProduct.id === product.id,
        );
      }),
    );
  }

}
