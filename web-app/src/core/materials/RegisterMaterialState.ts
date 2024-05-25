import { Material } from '@/core/entities/Material.ts';

export interface CommonMaterialState {
  open: boolean;
}

export interface BeforeRegisterMaterialState {
  kind: 'BeforeRegisterMaterialState';
}

export interface RegisteringMaterialState {
  kind: 'RegisteringMaterialState';
}

export interface RegisteredMaterialState {
  kind: 'RegisteredMaterialState';
  material: Material;
}

export interface ErrorRegisteringMaterialState {
  kind: 'ErrorRegisteringMaterialState';
  error: string;
}

export type RegisterMaterialState = (
  | BeforeRegisterMaterialState
  | RegisteringMaterialState
  | RegisteredMaterialState
  | ErrorRegisteringMaterialState
) &
  CommonMaterialState;

export const registerMaterialInitialState: RegisterMaterialState = {
  kind: 'BeforeRegisterMaterialState',
  open: false
};
