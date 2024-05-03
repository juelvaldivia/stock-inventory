import { Material } from '@/core/entities/Material.ts';

export interface CommonMaterialsState {
  searchTerm: string;
}

export interface LoadingMaterialsState {
  kind: 'LoadingMaterialsState';
}

export interface LoadedMaterialsState {
  kind: 'LoadedMaterialsState';
  materials: Array<Material>;
}
export interface ErrorMaterialsState {
  kind: 'ErrorMaterialsState';
  error: string;
}

export type MaterialsState = (LoadingMaterialsState | LoadedMaterialsState | ErrorMaterialsState) &
  CommonMaterialsState;

export const materialsInitialState: MaterialsState = {
  kind: 'LoadingMaterialsState',
  searchTerm: ''
};
