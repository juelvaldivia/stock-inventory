'use client';

import MaterialList from '@/app/materials/components/MaterialList.tsx';
import SearchBar from '@/app/components/SearchBar.tsx';
import { useMaterialsHandler } from '@/app/common/ContextsHandlers.tsx';

const MaterialsPage: React.FC = () => {
  const materialsHandler = useMaterialsHandler();

  const onSearchMaterials = (name: string) => {
    materialsHandler.search(name);
  };

  return (
    <div className="container pl-14">
      <div className="mx-auto pl-14 px-4 flex justify-end">
        <SearchBar onSearch={onSearchMaterials} placeholder="Buscar por nombre..." />
      </div>

      <MaterialList></MaterialList>
    </div>
  );
};

export default MaterialsPage;
