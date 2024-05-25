import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

import './globals.css';

const AppBar = dynamic(() => import('@/app/components/AppBar.tsx'), { ssr: false });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StockIn',
  description: 'Stock e inventario'
};

const options = [
  {
    name: 'Materiales',
    url: '/materials',
    icon: 'materials',
    subOptions: [
      {
        name: 'Registrar',
        url: '/materials/register',
        icon: 'register'
      }
    ]
  },
  {
    name: 'Productos',
    url: '/',
    icon: 'products',
    subOptions: [
      {
        name: 'Registrar',
        url: '/products/register',
        icon: 'register'
      }
    ]
  }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AppBar options={options} />

        {children}
      </body>
    </html>
  );
}
