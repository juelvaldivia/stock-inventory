import React, { useState, useEffect } from 'react';

import { Product } from '@/core/entities/Product';
import { MaterialsState } from '@/core/materials/MaterialsState';

import InputForm from '@/app/components/Input.tsx';
import Dropdown from '@/app/components/Dropdown.tsx';
import ListSelector, { convertToItems } from '@/app/components/ListSelector';
import Loader from '@/app/components/Loader';
import {
  useListSelectorHandler,
  useMaterialsHandler,
  useRegisterProductHandler
} from '@/app/common/ContextsHandlers.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder';
import { Material } from '@/core/entities/Material';

const brands = [
  {
    id: '03b61fd7-5632-44a5-a072-bf88d2ec8ffc',
    name: 'Calzafin'
  }
];

const ProductForm: React.FC = () => {
  const registerHandler = useRegisterProductHandler();
  const materialsHandler = useMaterialsHandler();
  const materialsState = useObserverState(materialsHandler);
  const listSelectorHandler = useListSelectorHandler();
  const selectorState = useObserverState(listSelectorHandler);

  useEffect(() => {
    const searchMaterials = async (filter: string) => {
      materialsHandler.search(filter);
    };

    return () => {
      searchMaterials('');
    };
  }, [materialsHandler]);

  const [formData, setFormData] = useState({
    brandId: brands[0].id,
    name: '',
    category: '',
    price: '',
    style: '',
    size: '',
    stockQuantity: '',
    stockLimit: '',
    materials: []
  });

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

    registerHandler.registerProduct(product);
  };

  const renderMaterialState = (state: MaterialsState) => {
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

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-wrap mb-6">
        <Dropdown
          name="brandId"
          options={brands}
          value={formData.brandId}
          onChange={handleChange}
        ></Dropdown>
        <InputForm
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          placeholder="Categoría de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="size"
          type="text"
          value={formData.size}
          onChange={handleChange}
          placeholder="Tamaño de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="style"
          type="text"
          value={formData.style}
          onChange={handleChange}
          placeholder="Estilo de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio de producto"
          required={true}
        ></InputForm>
        <InputForm
          name="stockQuantity"
          type="number"
          value={formData.stockQuantity}
          onChange={handleChange}
          placeholder="Stock actual"
          required={true}
        ></InputForm>
        <InputForm
          name="stockLimit"
          type="number"
          value={formData.stockLimit}
          onChange={handleChange}
          placeholder="Límite de stock"
          required={true}
        ></InputForm>
        {renderMaterialState(materialsState)}
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
