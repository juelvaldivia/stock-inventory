import { API } from '@/core/api/index.ts';
import { Material } from '@/core/entities/Material.ts';
import { Product } from '@/core//entities/Product';

export default class Inventory {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  async registerMaterial(material: Material): Promise<Material> {
    try {
      return await this.api.materials().register(material);
    } catch (error) {
      throw new Error('error registering material in inventory');
    }
  }

  async registerProduct(product: Product): Promise<Product> {
    try {
      return await this.api.products().register(product);
    } catch (error) {
      throw new Error('error registering product in inventory');
    }
  }

  async addMaterialQuantity(material: Material, quantity: number): Promise<Material> {
    try {
      return await this.api.materials().addQuantity(material, quantity);
    } catch (error) {
      throw new Error('error adding material quantity in inventory');
    }
  }

  async addProductQuantity(product: Product): Promise<Product> {
    try {
      return await this.api.products().produce(product);
    } catch (error) {
      throw new Error('error adding product in inventory');
    }
  }

  async sellProduct(productId: string, quantity: number): Promise<void> {}

  async searchMaterialsByName(name: string): Promise<Material[]> {
    return this.api.materials().get(name);
  }

  async searchProductsByName(name: string): Promise<Product[]> {
    return this.api.products().get(name);
  }

  // async generateInventoryReport(): Promise<void> {
  //   const products = await this.api.products().getAllProducts();
  //   const materials = await this.api.materials().getAllMaterials();

  //   console.log('Inventory Report:');
  //   console.log('Products:', products);
  //   console.log('Materials:', materials);
  // }

  // async updateProductStockLimit(productId: string, newLimit: number): Promise<void> {
  //   const product = await this.api.products().getProduct(productId);
  //   if (!product) throw new Error('Product not found');

  //   product.stockLimit = newLimit;
  //   await this.api.products().updateProduct(productId, product);
  // }

  // async updateMaterialStockLimit(materialId: string, newLimit: number): Promise<void> {
  //   const material = await this.api.materials().getMaterial(materialId);
  //   if (!material) throw new Error('Material not found');

  //   material.quantityLimit = newLimit;
  //   await this.api.materials().updateMaterial(materialId, material);
  // }

  // async deleteProduct(productId: string): Promise<void> {
  //   await this.api.products().deleteProduct(productId);
  // }

  // async deleteMaterial(materialId: string): Promise<void> {
  //   await this.api.materials().deleteMaterial(materialId);
  // }
}
