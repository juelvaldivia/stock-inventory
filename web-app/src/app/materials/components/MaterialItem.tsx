import React from 'react';

import { Material } from '@/core/entities/Material.ts';

interface MaterialListProps {
  material: Material;
  color: string;
}

const MaterialItem: React.FC<MaterialListProps> = ({ material }) => {
  return (
    <div className={`item--green`}>
      <div className="">
        <p>{material.name}</p>
        <p>Stock: {material.description}</p>
        <p>Cantidad disponible: {material.quantityAvailable}</p>
        <p>Cantidad limite: {material.quantityLimit}</p>
        <button>Agregar venta</button>
      </div>
    </div>
  );
};

export default MaterialItem;
