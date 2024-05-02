import RegisterProduct from '@/core/products/RegisterProduct.ts';
import StateObserver from '@/core/common/StateObserver.ts';
import { Product } from '@/core/entities/Product';
import {
  RegisterProductState,
  registerProductInitialState
} from '@/core/products/RegisterProductState.ts';

class RegisterProductHandler extends StateObserver<RegisterProductState> {
  private _registerProduct: RegisterProduct;

  constructor(registerProduct: RegisterProduct) {
    super(registerProductInitialState);

    this._registerProduct = registerProduct;
  }

  openRegisterProduct() {
    this.changeState({ ...this.state, open: true });
  }

  closeRegisterProduct() {
    this.changeState({ ...this.state, open: false });
  }

  async registerProduct(product: Product) {
    try {
      const newProduct = await this._registerProduct.execute(product);

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
