import Product from "../entities/Product";


export default interface ProductRepository {
    get(filter: string):Promise<Array<Product>> ;
}
