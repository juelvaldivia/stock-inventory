import GetBrands from '@/core/brands/GetBrands.ts';
import StateObserver from '@/core/common/StateObserver.ts';
import { BrandsState, brandsInitialState } from '@/core/brands/BrandsState.ts';

class BrandsHandler extends StateObserver<BrandsState> {
  constructor(private getBrandsUseCase: GetBrands) {
    super(brandsInitialState);
  }

  async search() {
    try {
      const brands = await this.getBrandsUseCase.execute();
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
