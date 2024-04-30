import type { NextPage } from 'next';

import App from '@/app/App.tsx';

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

      <App />
    </>
  );
};

export default Index;
