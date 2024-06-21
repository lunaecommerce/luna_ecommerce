import React from 'react';
import Container from '@/components/ui/container';
import OrdersList from './components/ordersList';
import { auth } from '@clerk/nextjs/server';

const OrdersPage = () => {
  // const userId = 'user_2e0X5mtbM0Y4ROcLZn6v3ERVJhl';
  const { userId } = auth();

  return (
    <div className='bg-white h-fit'>
      <Container>
        <div className='px-4 py-6 sm:px-6 lg:px-8'>
          <div className='flex flex-col min-h-screen h-full'>
            <h1 className='text-3xl font-bold text-black pb-4'>Pedidos</h1>
            <OrdersList clientId={userId || ''} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrdersPage;
