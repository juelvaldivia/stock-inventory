import { Brand } from '@/core/entities/Brand.ts';

export interface LoadingBrandsState {
  kind: 'LoadingBrandsState';
}

export interface LoadedBrandsState {
  kind: 'LoadedBrandsState';
  brands: Brand[];
}
export interface ErrorBrandsState {
  kind: 'ErrorBrandsState';
  error: string;
}

export type BrandsState = LoadingBrandsState | LoadedBrandsState | ErrorBrandsState;

export const brandsInitialState: BrandsState = {
  kind: 'LoadingBrandsState'
};
