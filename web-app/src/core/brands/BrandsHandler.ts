import StateObserver from '@/core/common/StateObserver.ts';
import { BrandsState, brandsInitialState } from '@/core/brands/BrandsState.ts';
import { API } from '../api';

class BrandsHandler extends StateObserver<BrandsState> {
  private api: API;

  constructor(api: API) {
    super(brandsInitialState);

    this.api = api;
  }

  async search() {
    try {
      const brands = await this.api.brands().get();
      const brandsState: BrandsState = {
        kind: 'LoadedBrandsState',
        brands: brands
      };

      this.changeState(brandsState);
    } catch (error) {
      const errorState: BrandsState = {
        kind: 'ErrorBrandsState',
        error: 'An error has ocurred loading brands'
      };

      this.changeState(errorState);
    }
  }
}

export default BrandsHandler;
