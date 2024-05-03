import React, { useState } from 'react';

import { Product } from '@/core/entities/Product';

import InputForm from '@/app/components/Input.tsx';
import Dropdown from '@/app/components/Dropdown.tsx';
import { useRegisterProductHandler } from '@/app/common/ContextsHandlers.tsx';

const brands = [
  {
    id: '87f224b0-bbf3-40cb-a04a-79feb62eae53',
    name: 'Calzafin'
  }
];

const ProductForm: React.FC = () => {
  const registerHandler = useRegisterProductHandler();

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

    const product: Product = {
      brandId: formData.brandId,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      style: formData.style,
      size: formData.size,
      stockQuantity: parseInt(formData.stockQuantity),
      stockLimit: parseInt(formData.stockLimit),
      materials: formData.materials
    };

    registerHandler.registerProduct(product);
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
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
        ></InputForm>
        <InputForm
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          placeholder="Categoría de producto"
        ></InputForm>
        <InputForm
          name="size"
          type="text"
          value={formData.size}
          onChange={handleChange}
          placeholder="Tamaño de producto"
        ></InputForm>
        <InputForm
          name="style"
          type="text"
          value={formData.style}
          onChange={handleChange}
          placeholder="Estilo de producto"
        ></InputForm>
        <InputForm
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio de producto"
        ></InputForm>
        <InputForm
          name="stockQuantity"
          type="number"
          value={formData.stockQuantity}
          onChange={handleChange}
          placeholder="Stock actual"
        ></InputForm>
        <InputForm
          name="stockLimit"
          type="number"
          value={formData.stockLimit}
          onChange={handleChange}
          placeholder="Límite de stock"
        ></InputForm>
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Registrar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
