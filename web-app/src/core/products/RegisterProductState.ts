import { Product } from '@/core/entities/Product';

export interface CommonProductState {
    open: boolean
}

export interface BeforeRegisterProductState {
    kind: 'BeforeRegisterProductState'
}

export interface RegisteringProductState {
    kind: 'RegisteringProductState'
}

export interface RegisteredProductState {
    kind: 'RegisteredProductState'
    product: Product;
}
export interface ErrorRegisteringProductState {
    kind: 'ErrorRegisteringProductState'
    error: string;
}

export type RegisterProductState = (BeforeRegisterProductState | RegisteringProductState | RegisteredProductState | ErrorRegisteringProductState) & CommonProductState

export const registerProductInitialState: RegisterProductState = {
    kind: 'BeforeRegisterProductState',
    open: false
}
