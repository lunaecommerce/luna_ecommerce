
import { getOrderById } from '@/actions/orders/get-orders';
import React from 'react';
export const OrderDetails = () =>{;
  return (
    <div className='h-full w-full'>
      <h1 className='text-3xl font-bold text-black pb-4'>
        Detalhes do pedido #{order.id}
      </h1>
    </div>
  );
};
