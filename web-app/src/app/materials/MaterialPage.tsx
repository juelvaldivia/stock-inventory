'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import MaterialList from '@/app/materials/components/MaterialList.tsx';
import SearchBar from '@/app/components/SearchBar.tsx';
import { useListMaterialsHandler } from '@/app/common/ContextsHandlers.tsx';

const MaterialsPage: React.FC = () => {
  const listMaterialsHandler = useListMaterialsHandler();

  const onSearchMaterials = (name: string) => {
    listMaterialsHandler.search(name);
  };

  return (
    <div className="container pl-14">
      <div className="flex flex-col px-10 md:flex-row md:items-center md:justify-between">
        <div className=" md:ml-14 mb-4 md:mb-0">
          <a
            href="/materials/register"
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Registrar Material
          </a>
        </div>
        <div className="flex items-center md:ml-auto">
          <SearchBar onSearch={onSearchMaterials} placeholder="Buscar por nombre..." />
        </div>
      </div>
      <MaterialList></MaterialList>
    </div>
  );
};

export default MaterialsPage;
