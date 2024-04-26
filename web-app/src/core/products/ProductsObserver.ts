import GetProducts from '@/core/products/GetProducts.ts';
import StateObserver from '@/core/common/StateObserver.ts';
import { ProductsState, productsInitialState } from '@/core/products/ProductsState';

class ProductsObserver extends StateObserver<ProductsState> {
    constructor(private getProductsUseCase: GetProducts) {
        super(productsInitialState)
    }

    search(filter: string) {
        this.getProductsUseCase.execute(filter)
            .then(products => this.changeState({
                kind: 'LoadedProductsState',
                products: products,
                searchTerm: this.state.searchTerm
            }))
            .catch(error => {
                console.error(error);
                this.changeState({
                kind: 'ErrorProductsState',
                error: 'An error has ocurred loading products',
                searchTerm: this.state.searchTerm
            })
        });
    }
}

export default ProductsObserver;
