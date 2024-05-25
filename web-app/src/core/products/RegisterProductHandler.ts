import Inventory from '@/core/inventory/index.ts';
import StateObserver from '@/core/common/StateObserver.ts';
import { Product } from '@/core/entities/Product.ts';
import {
  RegisterProductState,
  registerProductInitialState
} from '@/core/products/RegisterProductState.ts';

class RegisterProductHandler extends StateObserver<RegisterProductState> {
  private inventory: Inventory;

  constructor(inventory: Inventory) {
    super(registerProductInitialState);

    this.inventory = inventory;
  }

  openRegisterProduct() {
    this.changeState({ ...this.state, open: true });
  }

  closeRegisterProduct() {
    this.changeState({ ...this.state, open: false });
  }

  async registerProduct(product: Product) {
    try {
      const newProduct = await this.inventory.registerProduct(product);

      const productState: RegisterProductState = {
        kind: 'RegisteredProductState',
        product: newProduct,
        open: false
      };

      this.changeState(productState);
    } catch (error) {
      const errorState: RegisterProductState = {
        kind: 'ErrorRegisteringProductState',
        error: 'An error has ocurred registering products',
        open: true
      };

      this.changeState(errorState);
    }
  }
}

export default RegisterProductHandler;
