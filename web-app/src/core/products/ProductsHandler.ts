import GetProducts from '@/core/products/GetProducts.ts';
import StateObserver from '@/core/common/StateObserver.ts';
import { ProductsState, productsInitialState } from '@/core/products/ProductsState';

class ProductsHandler extends StateObserver<ProductsState> {
    constructor(private getProductsUseCase: GetProducts) {
        super(productsInitialState)
    }

    async search(filter: string) {
        try {
            const products = await this.getProductsUseCase.execute(filter)
            const productsState: ProductsState = {
                kind: 'LoadedProductsState',
                products: products,
                searchTerm: this.state.searchTerm
            }

            this.changeState(productsState)
        } catch (error) {
            const errorState: ProductsState = {
                kind: 'ErrorProductsState',
                error: 'An error has ocurred loading products',
                searchTerm: this.state.searchTerm
            }

            this.changeState(errorState)
        }
    }
}

export default ProductsHandler;
