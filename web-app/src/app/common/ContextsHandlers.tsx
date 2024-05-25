import BrandsHandler from '@/core/brands/BrandsHandler.ts';
import ListMaterialsHandler from '@/core/materials/ListMaterialsHandler.ts';
import ListSelectorHandler from '@/core/listSelector/ListSelectorHandler.ts';
import ListProductsHandler from '@/core/products/ListProductsHandler.ts';
import RegisterProductHandler from '@/core/products/RegisterProductHandler.ts';
import RegisterMaterialHandler from '@/core/materials/RegisterMaterialHandler.ts';
import AddMaterialHandler from '@/core/materials/AddMaterialHandler.ts';

import { createContext } from '@/app/common/Context.tsx';

const [contextBrands, useBrand] = createContext<BrandsHandler>();
export const brandsContext = contextBrands;
export const useBrandHandler = useBrand;

const [contextListMaterials, useListMaterial] = createContext<ListMaterialsHandler>();
export const listMaterialsContext = contextListMaterials;
export const useListMaterialsHandler = useListMaterial;

const [contextAddMaterial, useAddMaterial] = createContext<AddMaterialHandler>();
export const addMaterialContext = contextAddMaterial;
export const useAddMaterialHandler = useAddMaterial;

const [contextRegisterMaterial, useRegisterMaterial] = createContext<RegisterMaterialHandler>();
export const registerMaterialContext = contextRegisterMaterial;
export const useRegisterMaterialHandler = useRegisterMaterial;

const [contextListSelector, useListSelector] = createContext<ListSelectorHandler>();
export const listSelectorContext = contextListSelector;
export const useListSelectorHandler = useListSelector;

const [contextListProducts, useListProducts] = createContext<ListProductsHandler>();
export const listProductsContext = contextListProducts;
export const useListProductsHandler = useListProducts;

const [contextRegisterProduct, useRegisterProduct] = createContext<RegisterProductHandler>();
export const registerProductContext = contextRegisterProduct;
export const useRegisterProductHandler = useRegisterProduct;
