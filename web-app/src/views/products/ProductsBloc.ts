import GetProducts from '../../lib/products/GetProducts';
import { Bloc } from '../common/bloc';
import { ProductsState, productsInitialState } from './ProductsState';

export class ProductsBloc extends Bloc<ProductsState> {
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
