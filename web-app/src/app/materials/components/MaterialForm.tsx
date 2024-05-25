import React, { useState } from 'react';

import { Material } from '@/core/entities/Material.ts';

import InputForm from '@/app/components/Input.tsx';
import { useRegisterMaterialHandler } from '@/app/common/ContextsHandlers.tsx';

const MaterialForm: React.FC = () => {
  const registerHandler = useRegisterMaterialHandler();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantityAvailable: '',
    quantityLimit: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const material: Material = {
      id: '',
      name: formData.name,
      description: formData.description,
      quantityAvailable: parseInt(formData.quantityAvailable),
      quantityLimit: parseInt(formData.quantityLimit)
    };

    registerHandler.registerMaterial(material);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-wrap mb-6">
        <InputForm
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre de material"
          required={true}
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
        ></InputForm>
        <InputForm
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción del material"
          required={true}
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
        ></InputForm>
        <InputForm
          name="quantityAvailable"
          type="number"
          value={formData.quantityAvailable}
          onChange={handleChange}
          placeholder="Cantidad existente"
          required={true}
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
        ></InputForm>
        <InputForm
          name="quantityLimit"
          type="number"
          value={formData.quantityLimit}
          onChange={handleChange}
          placeholder="Límite de material"
          required={true}
          inputClassCustom="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs"
        ></InputForm>
      </div>
      <div className="flex flex-wrap mb-6 py-8">
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
        >
          Registrar material
        </button>
      </div>
    </form>
  );
};

export default MaterialForm;
