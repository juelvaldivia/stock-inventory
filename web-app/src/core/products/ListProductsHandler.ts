import StateObserver from '@/core/common/StateObserver.ts';
import Inventory from '@/core/inventory/index.ts';
import { ListProductsState, productsInitialState } from '@/core/products/ListProductsState';

class ListProductsHandler extends StateObserver<ListProductsState> {
  private inventory: Inventory;

  constructor(inventory: Inventory) {
    super(productsInitialState);

    this.inventory = inventory;
  }

  async search(filter: string) {
    try {
      const products = await this.inventory.searchProductsByName(filter);
      const productsState: ListProductsState = {
        kind: 'LoadedProductsState',
        products: products,
        searchTerm: filter
      };

      this.changeState(productsState);
    } catch (error) {
      const errorState: ListProductsState = {
        kind: 'ErrorProductsState',
        error: 'An error has ocurred loading products',
        searchTerm: filter
      };

      this.changeState(errorState);
    }
  }
}

export default ListProductsHandler;
