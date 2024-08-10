"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';

import Summary from './components/summary'
import CartItem from './components/cart-item';
import { auth } from '@clerk/nextjs/server';

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className='bg-white min-h-screen relative'>
      <Container>
        <div className='px-4 sm:px-6 lg:px-8 grid gap-8'>
        <h1 className='text-3xl font-bold text-black'>Carrinho</h1>
          <div className='lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
            <div className='lg:col-span-7'>
              {cart.items.length === 0 && (
                <p className='text-neutral-500'>Sem itens no carrinho.</p>
              )}
              <ul>
                {cart.items.map(item => (
                  <CartItem key={item.product.id} data={item} />
                ))}
              </ul>
            </div>
            <div className="col-span-5 w-full max-lg:fixed bottom-0 left-0 max-lg:z-50">
            <Summary />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
