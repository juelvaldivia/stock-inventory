import React, { useState } from 'react';
import InputForm from '@/app/components/Input';
import Dropdown from '@/app/components/Dropdown';

const brands = [
  {
    id: '87f224b0-bbf3-40cb-a04a-79feb62eae53',
    name: 'Calzafin'
  }
];

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    brandId: brands[0].id,
    name: '',
    category: '',
    price: '',
    stockQuantity: '0'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form submitted:', formData);
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
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre de producto"
        ></InputForm>
        <InputForm
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Categoría de producto"
        ></InputForm>
        <InputForm
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio de producto"
        ></InputForm>
        <InputForm
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          placeholder="Stock actual"
        ></InputForm>
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
