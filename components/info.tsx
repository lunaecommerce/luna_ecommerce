'use client';

import { PackageCheck, Share, ShieldCheck, ShoppingCart, Wallet } from 'lucide-react';

import Currency from '@/components/ui/currency';
import { Button } from '@/components/ui/button';
import { cartItem } from '@/types';
import useCart, { calculateDiscount } from '@/hooks/use-cart';

interface InfoProps {
  data: cartItem;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };
  const price: number = parseFloat(data.product.price) || 0;
  const planPrice = price / 3;
  const discountedPrice = price - calculateDiscount(price, 0.20)
  const planPriceWithDiscount = discountedPrice / 3;
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>{data.product.name}</h1>
      <div className='mt-3 flex flex-col items-start '>
        <div className="flex gap-2">
          <div className='text-xl text-red-500 line-through'>
            <Currency value={data.product.price} />
          </div>
          <div className='text-3xl text-gray-900'>
            <Currency value={discountedPrice} />
          </div>
        </div>
        <div className='flex w-full justify-between text-g-yellow items-center'>
          <div className="flex gap-1">
            <p>Ou 3x de</p>
            <Currency value={planPriceWithDiscount} />
            <p>sem juros</p>
          </div>
        </div>
      </div>
      <hr className='my-4' />
      <div className='flex flex-col gap-y-6'>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>Tamanho:</h3>
          <div>{data.product.size?.value}</div>
        </div>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>Cores:</h3>
          <div
            className='h-6 w-6 rounded-full border border-gray-600 hover:cursor-pointer'
            style={{ backgroundColor: data.product.color?.value }}
          />
        </div>
        <div className='space-y-2'>
          <h3 className='font-semibold text-black'>Características:</h3>
          <ul>
            <li>{data.product.attribute001}</li>
            <li>{data.product.attribute002}</li>
            <li>{data.product.attribute003}</li>
          </ul>
        </div>
        <hr />

        <div className='flex flex-col gap-4 justify-between'>
          <div className='flex items-center gap-2'>
            <Wallet size={24} className='text-g-yellow' />
            <p className='text-sm'>Pague com confiança na entrega</p>
          </div>
          <div className='flex items-center gap-2'>
            <ShieldCheck size={24} className='text-g-yellow' />
            <p className='text-sm'>3 meses de garantia contra defeitos</p>
          </div>
          <div className='flex items-center gap-2'>
            <PackageCheck size={24} className='text-g-yellow' />
            <p className='text-sm'>Entrega rápida para Garanhuns e São João</p>
          </div>
        </div>
        <div className='flex items-center gap-x-3'>
          <Button
            variant='primary'
            onClick={onAddToCart}
            className='flex items-center gap-x-2 w-full p-8'
          >
            Adicionar Ao Carrinho
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
