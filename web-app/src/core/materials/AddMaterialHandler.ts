import StateObserver from '@/core/common/StateObserver.ts';
import Inventory from '@/core/inventory/index.ts';
import { Material } from '@/core/entities/Material.ts';
import { AddMaterialState, addMaterialInitialState } from '@/core/materials/AddMaterialState.ts';

class AddMaterialHandler extends StateObserver<AddMaterialState> {
  private inventory: Inventory;

  constructor(inventory: Inventory) {
    super(addMaterialInitialState);

    this.inventory = inventory;
  }

  openAddedMaterial() {
    this.changeState({ ...this.state, open: true });
  }

  closeAddedMaterial() {
    this.changeState({ ...this.state, open: false });
  }

  async addMaterial(material: Material, quantity: number) {
    try {
      const newMaterial = await this.inventory.addMaterialQuantity(material, quantity);

      const materialState: AddMaterialState = {
        kind: 'AddedMaterialState',
        material: newMaterial,
        open: false
      };

      this.changeState(materialState);
    } catch (error) {
      const errorState: AddMaterialState = {
        kind: 'ErrorAddingMaterialState',
        error: 'An error has ocurred adding material',
        open: true
      };

      this.changeState(errorState);
    }
  }
}

export default AddMaterialHandler;
