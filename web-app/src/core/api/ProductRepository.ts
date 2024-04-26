import { Product } from '@/core/entities/Product';

export default interface ProductRepository {
    get(filter: string):Promise<Array<Product>> ;
}
