'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart, { calculateTotal } from '@/hooks/use-cart';
import { toast } from 'react-hot-toast';

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart(state => state.items);
  const removeAll = useCart(state => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = calculateTotal(items, 0.20);

  const router = useRouter();
  return (
    <div className='mt-16 rounded-lg backdrop-blur-sm bg-white/90 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 max-md-absolute bottom-0'>
      <div className='flex items-center justify-between'>
        <div className='text-base font-medium text-gray-900'>
          Total do Pedido
        </div>
        <Currency value={totalPrice} />
      </div>
      <Button
        onClick={() => router.push(`/checkout`)}
        disabled={items.length === 0}
        className='w-full mt-6'
        variant='primary'
      >
        Finalizar
      </Button>
    </div>
  );
};

export default Summary;
