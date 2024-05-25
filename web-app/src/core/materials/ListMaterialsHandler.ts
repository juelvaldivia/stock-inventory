import StateObserver from '@/core/common/StateObserver.ts';
import Inventory from '@/core/inventory/index.ts';
import { ListMaterialsState, materialsInitialState } from '@/core/materials/ListMaterialsState.ts';

class ListMaterialsHandler extends StateObserver<ListMaterialsState> {
  private inventory: Inventory;

  constructor(inventory: Inventory) {
    super(materialsInitialState);

    this.inventory = inventory;
  }

  async search(filter: string) {
    try {
      const materials = await this.inventory.searchMaterialsByName(filter);
      const materialsState: ListMaterialsState = {
        kind: 'LoadedMaterialsState',
        materials: materials,
        searchTerm: filter
      };

      this.changeState(materialsState);
    } catch (error) {
      const errorState: ListMaterialsState = {
        kind: 'ErrorMaterialsState',
        error: 'An error has ocurred loading materials',
        searchTerm: filter
      };

      this.changeState(errorState);
    }
  }
}

export default ListMaterialsHandler;
