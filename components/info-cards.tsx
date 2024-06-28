import Image from 'next/image';
import React from 'react';

export const InfoCards = () => {
  return (
    <div className='flex max-lg:flex-col w-full gap-4'>
      <div className='p-6 w-full rounded-xl bg-g-yellow-700 h-96'>
        <div className='h-full flex flex-col justify-between align-center'>
          <h3 className='text-3xl font-black text-white '>
            Entrega rápida e garantida em até 24 horas
          </h3>
          <Image
            alt=''
            src='/3d_delivery_ss.svg'
            width={300}
            height={300}
            className='mx-auto'
          />
        </div>
      </div>
      <div className='p-6 w-full rounded-xl bg-g-blue h-96'>
        <div className='h-full flex flex-col justify-between align-center'>
          <h3 className='text-3xl font-black text-white'>
            Realize o pagamento ao receber seu pedido
          </h3>
          <Image
            alt=''
            src='/hand_payment_ss.svg'
            width={200}
            height={200}
            className='mx-auto'
          />
        </div>
      </div>
      <div className='p-6 w-full rounded-xl bg-g-yellow-700 h-96'>
        <div className='h-full flex flex-col justify-between align-center'>
          <h3 className='text-3xl font-black text-white'>
            Parcelamento sem juros em todos os cartões
          </h3>
          <Image
            alt=''
            src='/card_ss.svg'
            width={300}
            height={300}
            className='mx-auto'
          />
        </div>
      </div>
      <div className='p-6 w-full rounded-xl bg-g-blue h-96'>
        <div className='h-full w-full flex flex-col justify-between align-center'>
          <h3 className='text-3xl font-black text-white'>
            Garantia exclusiva de 3 meses
          </h3>
          <Image
            alt=''
            src='/safe_warranty_ss.svg'
            width={300}
            height={300}
            className='mx-auto'
          />
        </div>
      </div>
    </div>
  );
};
