import GetMaterials from '@/core/materials/GetMaterials.ts';
import StateObserver from '@/core/common/StateObserver.ts';
import { MaterialsState, materialsInitialState } from '@/core/materials/MaterialsState.ts';

class MaterialsHandler extends StateObserver<MaterialsState> {
  constructor(private getMaterialsUseCase: GetMaterials) {
    super(materialsInitialState);
  }

  async search(filter: string) {
    try {
      const materials = await this.getMaterialsUseCase.execute(filter);
      const materialsState: MaterialsState = {
        kind: 'LoadedMaterialsState',
        materials: materials,
        searchTerm: this.state.searchTerm
      };

      this.changeState(materialsState);
    } catch (error) {
      const errorState: MaterialsState = {
        kind: 'ErrorMaterialsState',
        error: 'An error has ocurred loading materials',
        searchTerm: this.state.searchTerm
      };

      this.changeState(errorState);
    }
  }
}

export default MaterialsHandler;
