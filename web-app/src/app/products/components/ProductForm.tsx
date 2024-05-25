import React, { useState, useEffect } from 'react';

import { BrandsState } from '@/core/brands/BrandsState.ts';
import { Material } from '@/core/entities/Material.ts';
import { ListMaterialsState } from '@/core/materials/ListMaterialsState.ts';
import { Product } from '@/core/entities/Product.ts';

import Dropdown from '@/app/components/Dropdown.tsx';
import InputForm from '@/app/components/Input.tsx';
import ListSelector, { convertToItems } from '@/app/components/ListSelector.tsx';
import Loader from '@/app/components/Loader.tsx';
import {
  useBrandHandler,
  useListSelectorHandler,
  useListMaterialsHandler,
  useRegisterProductHandler
} from '@/app/common/ContextsHandlers.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';

const ProductForm: React.FC = () => {
  const registerHandler = useRegisterProductHandler();
  const brandHandler = useBrandHandler();
  const brandsState = useObserverState(brandHandler);
  const listMaterialsHandler = useListMaterialsHandler();
  const listMaterialsState = useObserverState(listMaterialsHandler);
  const listSelectorHandler = useListSelectorHandler();
  const selectorState = useObserverState(listSelectorHandler);

  const [formData, setFormData] = useState({
    brandId: '',
    name: '',
    category: '',
    price: '',
    style: '',
    size: '',
    stockQuantity: '',
    stockLimit: '',
    materials: []
  });

  useEffect(() => {
    const searchMaterials = async (filter: string) => {
      listMaterialsHandler.search(filter);
    };

    return () => {
      searchMaterials('');
    };
  }, [listMaterialsHandler]);

  useEffect(() => {
    const searchBrands = async () => {
      brandHandler.search();
    };

    return () => {
      searchBrands();
    };
  }, [brandHandler]);

  useEffect(() => {
    if (brandsState.kind === 'LoadedBrandsState') {
      setFormData({ ...formData, brandId: brandsState.brands[0].id });
    }
  }, [brandsState.kind]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const materialsSelected: Material[] = selectorState.items
      .filter((item) => item.selected)
      .map((item) => ({
        id: item.id,
        name: item.name,
        quantityUsed: item.selected,
        description: '',
        quantityAvailable: 0,
        quantityLimit: 0
      }));

    const product: Product = {
      brandId: formData.brandId,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      style: formData.style,
      size: formData.size,
      stockQuantity: parseInt(formData.stockQuantity),
      stockLimit: parseInt(formData.stockLimit),
      imageUrl: '',
      materials: materialsSelected
    };

    console.log(product);

    registerHandler.registerProduct(product);
  };

  const renderMaterialState = (state: ListMaterialsState) => {
    switch (state.kind) {
      case 'LoadingMaterialsState':
        return <Loader />;
      case 'LoadedMaterialsState':
        return (
          <ListSelector
            title="Selecciona los materiales"
            items={convertToItems(state.materials)}
          ></ListSelector>
        );
    }
  };

  const renderBrandsState = (state: BrandsState) => {
    switch (state.kind) {
      case 'LoadingBrandsState':
        return <Loader />;
      case 'LoadedBrandsState':
        return (
          <Dropdown
            name="brandId"
            options={state.brands}
            value={formData.brandId}
            onChange={handleChange}
          ></Dropdown>
        );
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-wrap mb-6">
        {renderBrandsState(brandsState)}
        <InputForm
          name="name"
          type="text"
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="category"
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
          type="text"
          value={formData.category}
          onChange={handleChange}
          placeholder="Categoría de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="size"
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
          type="text"
          value={formData.size}
          onChange={handleChange}
          placeholder="Tamaño de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="style"
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
          type="text"
          value={formData.style}
          onChange={handleChange}
          placeholder="Estilo de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="price"
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="stockQuantity"
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
          type="number"
          value={formData.stockQuantity}
          onChange={handleChange}
          placeholder="Stock actual"
          required={true}
        ></InputForm>
        <InputForm
          name="stockLimit"
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
          type="number"
          value={formData.stockLimit}
          onChange={handleChange}
          placeholder="Límite de stock"
          required={true}
        ></InputForm>
        {renderMaterialState(listMaterialsState)}
      </div>
      <div className="flex flex-wrap mb-6 py-8">
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
        >
          Registrar producto
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
