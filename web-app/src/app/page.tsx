import type { NextPage } from 'next';
import ProductList from './products/ProductList';

const Index: NextPage = () => {
  return (
    <>
      <header className="w-95 flex justify-end flex-wrap">
        <ul className="pt-12">
          <i className="fa fa-shopping-cart">
            <span className="counter"></span>
          </i>
        </ul>
      </header>
      <ProductList />
    </>
  );
};

export default Index;
