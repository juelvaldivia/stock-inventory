import { Product } from '@/core/entities/Product';
import { API } from '../api';

export default class GetProducts {
    private api: API;

    constructor(api: API) {
        this.api = api;
    }

    execute(filter:string): Promise<Product[]>{
        return this.api.products().get(filter);
    }
}
