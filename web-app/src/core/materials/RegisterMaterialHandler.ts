import StateObserver from '@/core/common/StateObserver.ts';
import Inventory from '@/core/inventory/index.ts';
import { Material } from '@/core/entities/Material.ts';
import {
  RegisterMaterialState,
  registerMaterialInitialState
} from '@/core/materials/RegisterMaterialState.ts';

class RegisterMaterialHandler extends StateObserver<RegisterMaterialState> {
  private inventory: Inventory;

  constructor(inventory: Inventory) {
    super(registerMaterialInitialState);

    this.inventory = inventory;
  }

  openRegisterMaterial() {
    this.changeState({ ...this.state, open: true });
  }

  closeRegisterMaterial() {
    this.changeState({ ...this.state, open: false });
  }

  async registerMaterial(material: Material) {
    try {
      const newMaterial = await this.inventory.registerMaterial(material);

      const materialState: RegisterMaterialState = {
        kind: 'RegisteredMaterialState',
        material: newMaterial,
        open: false
      };

      this.changeState(materialState);
    } catch (error) {
      const errorState: RegisterMaterialState = {
        kind: 'ErrorRegisteringMaterialState',
        error: 'An error has ocurred registering material',
        open: true
      };

      this.changeState(errorState);
    }
  }
}

export default RegisterMaterialHandler;
