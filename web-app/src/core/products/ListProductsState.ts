import { Product } from '@/core/entities/Product.ts';

export interface CommonProductsState {
  searchTerm: string;
}

export interface LoadingProductsState {
  kind: 'LoadingProductsState';
}

export interface LoadedProductsState {
  kind: 'LoadedProductsState';
  products: Array<Product>;
}
export interface ErrorProductsState {
  kind: 'ErrorProductsState';
  error: string;
}

export type ListProductsState = (LoadingProductsState | LoadedProductsState | ErrorProductsState) &
  CommonProductsState;

export const productsInitialState: ListProductsState = {
  kind: 'LoadingProductsState',
  searchTerm: ''
};
