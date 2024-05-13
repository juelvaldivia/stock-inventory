import ProductsHandler from '@/core/products/ProductsHandler.ts';
import RegisterProductHandler from '@/core/products/RegisterProductHandler.ts';
import MaterialsHandler from '@/core/materials/MaterialsHandler.ts';

import { createContext } from '@/app/common/Context.tsx';
import ListSelectorHandler from '@/core/listSelector/ListSelectorHandler';

const [contextProducts, useProduct] = createContext<ProductsHandler>();
const [contextRegisterProduct, useRegisterProduct] = createContext<RegisterProductHandler>();
const [contextMaterials, useMaterial] = createContext<MaterialsHandler>();
const [contextListSelector, useListSelector] = createContext<ListSelectorHandler>();

export const productsContext = contextProducts;
export const useProductsHandler = useProduct;

export const registerProductContext = contextRegisterProduct;
export const useRegisterProductHandler = useRegisterProduct;

export const materialsContext = contextMaterials;
export const useMaterialsHandler = useMaterial;

export const listSelectorContext = contextListSelector;
export const useListSelectorHandler = useListSelector;
