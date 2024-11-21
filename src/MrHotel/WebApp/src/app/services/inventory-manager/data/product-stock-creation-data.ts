export class ProductStockCreationData {
  public constructor(
    private readonly _productName: string,
    private readonly _stockQuantity: number,
    private readonly _idealQuantity: number,
  ) {}
}
