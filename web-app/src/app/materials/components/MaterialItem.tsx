import React, { useEffect, useState } from 'react';

import { Material } from '@/core/entities/Material.ts';

import InputForm from '@/app/components/Input.tsx';
import { useAddMaterialHandler, useListMaterialsHandler } from '@/app/common/ContextsHandlers.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';

interface MaterialListProps {
  material: Material;
  color: string;
}

const MaterialItem: React.FC<MaterialListProps> = ({ material }) => {
  const addMaterialHandler = useAddMaterialHandler();
  const materialHandler = useListMaterialsHandler();
  const materialsState = useObserverState(materialHandler);

  const [formData, setFormData] = useState({
    quantity: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addMaterialHandler.addMaterial(material, parseInt(formData.quantity));

    setFormData({ ...formData, quantity: '' });

    materialHandler.search(materialsState.searchTerm);
  };

  return (
    <div
      className={`item--green shadow-custom w-15em h-auto rounded-custom p-2em m-1em
                  overflow-hidden relative flex-auto`}
    >
      <div className="flex items-center flex-col flex-wrap">
        <form onSubmit={handleSubmit}>
          <p className="text-xl font-bold">{material.name}</p>
          <div className="flex flex-col mt-4">
            <p className="text-gray-700 text-sm">
              <span>En existencia:</span> {material.quantityAvailable}
            </p>
            <p className="text-gray-700 text-xs">
              <span>Límite:</span> {material.quantityLimit}
            </p>
          </div>
          <div className="mt-4 py-6 flex items-center">
            <InputForm
              name="quantity"
              classNameCustom="w-full mr-2"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Agrega material"
              required={true}
            ></InputForm>
            <button
              type="submit"
              className="border border-white border-opacity-50 text-black border-solid rounded
                           px-4 py-2 bg-white bg-opacity-50 hover:bg-white hover:text-gray-800
                           transition duration-250 ease-in"
            >
              +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaterialItem;
