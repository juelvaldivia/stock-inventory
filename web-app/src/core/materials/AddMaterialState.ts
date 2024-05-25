import { Material } from '@/core/entities/Material.ts';

export interface CommonAddMaterialState {
  open: boolean;
}

export interface BeforeAddMaterialState {
  kind: 'BeforeAddMaterialState';
}

export interface AddingMaterialState {
  kind: 'AddingMaterialState';
}

export interface AddedMaterialState {
  kind: 'AddedMaterialState';
  material: Material;
}

export interface ErrorAddingMaterialState {
  kind: 'ErrorAddingMaterialState';
  error: string;
}

export type AddMaterialState = (
  | BeforeAddMaterialState
  | AddingMaterialState
  | AddedMaterialState
  | ErrorAddingMaterialState
) &
  CommonAddMaterialState;

export const addMaterialInitialState: AddMaterialState = {
  kind: 'BeforeAddMaterialState',
  open: false
};
