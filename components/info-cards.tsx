import Image from 'next/image';
import React from 'react';

export const InfoCards = () => {
  return (
    <div className='flex max-lg:flex-col w-full gap-4'>
      <div className='p-6 w-full rounded-xl bg-g-yellow-300 h-96'>
        <div className='h-full flex flex-col justify-between align-center'>
          <h4 className='text-3xl font-black text-white '>
            Entrega rápida e garantida em até 24 horas
          </h4>
          <Image
            alt=''
            src='/3d_delivery_s.svg'
            width={300}
            height={300}
            className='mx-auto'
          />
        </div>
      </div>
      <div className='p-6 w-full rounded-xl bg-g-blue-100 h-96'>
        <div className='h-full flex flex-col justify-between align-center'>
          <h4 className='text-3xl font-black text-white'>
            Realize o pagamento ao receber seu pedido
          </h4>
          <Image
            alt=''
            src='/hand_payment_s.svg'
            width={200}
            height={200}
            className='mx-auto'
          />
        </div>
      </div>
      <div className='p-6 w-full rounded-xl bg-g-yellow-300 h-96'>
        <div className='h-full flex flex-col justify-between align-center'>
          <h4 className='text-3xl font-black text-white'>
            Parcelamento sem juros em todos os cartões
          </h4>
          <Image
            alt=''
            src='/card.svg'
            width={300}
            height={300}
            className='mx-auto'
          />
        </div>
      </div>
      <div className='p-6 w-full rounded-xl bg-g-blue-100 h-96'>
        <div className='h-full w-full flex flex-col justify-between align-center'>
          <h4 className='text-3xl font-black text-white'>
            Garantia exclusiva de 3 meses
          </h4>
          <Image
            alt=''
            src='/safe_w_s.svg'
            width={150}
            height={150}
            className='mx-auto'
          />
        </div>
      </div>
    </div>
  );
};
