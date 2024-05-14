import BrandsHandler from '@/core/brands/BrandsHandler';
import MaterialsHandler from '@/core/materials/MaterialsHandler.ts';
import ListSelectorHandler from '@/core/listSelector/ListSelectorHandler';
import ProductsHandler from '@/core/products/ProductsHandler.ts';
import RegisterProductHandler from '@/core/products/RegisterProductHandler.ts';

import { createContext } from '@/app/common/Context.tsx';

const [contextBrands, useBrand] = createContext<BrandsHandler>();
export const brandsContext = contextBrands;
export const useBrandHandler = useBrand;

const [contextMaterials, useMaterial] = createContext<MaterialsHandler>();
export const materialsContext = contextMaterials;
export const useMaterialsHandler = useMaterial;

const [contextListSelector, useListSelector] = createContext<ListSelectorHandler>();
export const listSelectorContext = contextListSelector;
export const useListSelectorHandler = useListSelector;

const [contextProducts, useProduct] = createContext<ProductsHandler>();
export const productsContext = contextProducts;
export const useProductsHandler = useProduct;

const [contextRegisterProduct, useRegisterProduct] = createContext<RegisterProductHandler>();
export const registerProductContext = contextRegisterProduct;
export const useRegisterProductHandler = useRegisterProduct;
