import ProductRepository from '../api/ProductRepository';
import Product from '../entities/Product';


export default class GetProducts {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    execute(filter:string): Promise<Array<Product>>{
        return this.productRepository.get(filter);
    }
}
