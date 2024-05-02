import ProductsHandler from '@/core/products/ProductsHandler.ts';
import RegisterProductHandler from '@/core/products/RegisterProductHandler.ts';

import { createContext } from '@/app/common/Context.tsx';

const [contextProducts, useProduct] = createContext<ProductsHandler>();
const [contextRegisterProduct, useRegisterProduct] = createContext<RegisterProductHandler>();

export const productsContext = contextProducts;
export const useProductsHandler = useProduct;

export const registerProductContext = contextRegisterProduct;
export const useRegisterProductHandler = useRegisterProduct;
