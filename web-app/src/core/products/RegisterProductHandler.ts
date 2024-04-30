import StateObserver from '@/core/common/StateObserver.ts';
import { RegisterProductState, registerProductInitialState } from '@/core/products/RegisterProductState';

class RegisterProductHandler extends StateObserver<RegisterProductState> {
    constructor() {
        super(registerProductInitialState)
    }

    openRegisterProduct() {
      this.changeState({ ...this.state, open: true });
    }

    closeRegisterProduct() {
      this.changeState({ ...this.state, open: false });
  }
}

export default RegisterProductHandler;
