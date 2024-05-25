import Api, { API } from '@/core/api/index.ts';

import Inventory from '@/core/inventory/index.ts';

import BrandsHandler from '@/core/brands/BrandsHandler.ts';

import AddMaterialHandler from '@/core/materials/AddMaterialHandler.ts';
import ListMaterialsHandler from '@/core/materials/ListMaterialsHandler.ts';
import RegisterMaterialHandler from '@/core/materials/RegisterMaterialHandler.ts';

import ListProductsHandler from '@/core/products/ListProductsHandler.ts';
import RegisterProductHandler from '@/core/products/RegisterProductHandler.ts';

import ListSelectorHandler from '@/core/listSelector/ListSelectorHandler.ts';

export class App {
  private api: API;
  private inventory: Inventory;

  constructor() {
    this.api = new Api();
    this.inventory = new Inventory(this.api);
  }

  brandsHandler(): BrandsHandler {
    return new BrandsHandler(this.api);
  }

  listMaterialsHandler(): ListMaterialsHandler {
    return new ListMaterialsHandler(this.inventory);
  }

  addMaterialHandler(): AddMaterialHandler {
    return new AddMaterialHandler(this.inventory);
  }

  listProductsHandler(): ListProductsHandler {
    return new ListProductsHandler(this.inventory);
  }

  registerProductHandler(): RegisterProductHandler {
    return new RegisterProductHandler(this.inventory);
  }

  registerMaterialHandler(): RegisterMaterialHandler {
    return new RegisterMaterialHandler(this.inventory);
  }

  listSelectorHandler(): ListSelectorHandler {
    return new ListSelectorHandler();
  }
}

export const AppHandlers = {
  app: new App()
};
