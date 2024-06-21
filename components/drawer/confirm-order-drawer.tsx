'use client';
import * as React from 'react';
import { MouseEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import Currency from '@/components/ui/currency';

import { useConfirmOrderDrawer } from '@/hooks/use-confirm-order-drawer';
import { useAddressModal } from '@/hooks/use-address-modal';
import { useChangeDrawer } from '@/hooks/use-change-drawer';
import useCart, { calculateSubtotal, calculateTotal } from '@/hooks/use-cart';
import postOrder from '@/actions/orders/post-order';
import { Order, OrderAddress, OrderItem } from '@/types';
import { useRouter } from 'next/navigation';

export const revalidate = 0;

export function ConfirmOrderDrawer() {
  const { isOpenConfirmOrderDrawer, onCloseConfirmOrderDrawer } =
    useConfirmOrderDrawer();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog
        open={isOpenConfirmOrderDrawer}
        onOpenChange={onCloseConfirmOrderDrawer}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <ConfirmOrderForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isOpenConfirmOrderDrawer}
      onClose={() => onCloseConfirmOrderDrawer()}
    >
      <DrawerContent className='pb-4'>
        <ConfirmOrderForm className='px-4' />
      </DrawerContent>
    </Drawer>
  );
}

function ConfirmOrderForm({ className }: React.ComponentProps<'form'>) {
  const [loading, setLoading] = useState(false);
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;
  const handleCloseDrawer = async () => {
    onCloseConfirmOrderDrawer();
  };

  const { onCloseConfirmOrderDrawer, selectedPaymentMethod } =
    useConfirmOrderDrawer();
  const { selectedAddress } = useAddressModal();
  const { changeValue } = useChangeDrawer();
  const { clientId } = useConfirmOrderDrawer();

  const items = useCart(state => state.items);

  const removeAll = useCart(state => state.removeAll);
  const subtotalPrice = calculateSubtotal(items);
  const totalPrice = calculateTotal(items);

  const router = useRouter();
  const onSubmit = async () => {
    try {
      setLoading(true);

      const orderItems: Partial<OrderItem[]> = items.map(item => ({
        productId: item.product.id,
        description: item.product.name,
        color: item.product.color?.name || '',
        size: item.product.size?.name || '',
        brand: item.product.brand?.name || '',
        category: item.product.category?.name || '',
        price: parseFloat(item.product.price),
        quantity: item.quantity,
        image: item.product.images[0].url || '',
      }));

      const orderAddress: Partial<OrderAddress> = {
        zipcode: selectedAddress?.zipcode || '',
        state: selectedAddress?.state || '',
        city: selectedAddress?.city || '',
        district: selectedAddress?.district || '',
        street: selectedAddress?.street || '',
        complement: selectedAddress?.complement || '',
        number: selectedAddress?.number || '',
        reference: '', //Implementar campo de ponto de referencia
        isDefault: true,
        clientName: selectedAddress?.clientName || '',
        clientPhone: selectedAddress?.clientPhone || '',
      };

      const requestData: Partial<Order> = {
        storeId: storeId,
        clientId: clientId,
        isPaid: false, //implementar verificação para adicionar pagamento via site
        phone: selectedAddress?.clientPhone || '',
        address: orderAddress,
        status: 1,
        total: totalPrice,
        orderPayment: {
          moneyChange: changeValue,
          paymentDescription: selectedPaymentMethod?.paymentDescription,
          totalDiscount: selectedPaymentMethod?.totalDiscount,
          totalIncrease: selectedPaymentMethod?.totalIncrease,
          totalPayment: totalPrice,
          totalShipping: selectedPaymentMethod?.totalShipping,
          paymentId: selectedPaymentMethod?.id,
        },
        paymentMoment: 2, // implementar verificação para adicionar pagamento via site
        observation: '',
        orderItems: orderItems as OrderItem[], // Adicionando a lista de itens do pedido
      };
      const order = await postOrder(requestData);
      console.log(order);
      toast.success('Pedido realizado com sucesso.');
      removeAll();
      onCloseConfirmOrderDrawer()
      router.push(`/orders/${order.orderId}`);
    } catch (error) {
      console.error(error);
      toast.error('Não foi possivel confirmar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  const paymentDescription =
    selectedPaymentMethod?.id === 1
      ? changeValue > 0
        ? `Troco para `
        : 'Sem troco'
      : selectedPaymentMethod?.paymentId === 2
      ? 'Parcele em até 3x'
      : '';

  return (
    <div className={cn('grid items-start gap-4 py-4', className)}>
      <h2 className='text-center text-lg font-semibold'>Confirme a entrega</h2>
      <div className='flex flex-col gap-1 border p-4 rounded-2xl'>
        <p className='font-semibold capitalize'>
          {selectedAddress?.district},<br /> {selectedAddress?.street},{' '}
          {selectedAddress?.number}
        </p>
        <p className='text-xs'>
          {selectedAddress?.city} - {selectedAddress?.state}
        </p>
      </div>
      <div className='flex flex-col gap-1 border p-4 rounded-2xl'>
        <p className='font-semibold'>{`Pagamento na entrega`}</p>
        <div>
          <p className='text-sm'>{`${selectedPaymentMethod?.paymentDescription}`}</p>
          <p className='flex gap-1 text-sm'>
            {`${paymentDescription}`}{' '}
            {changeValue > 0 && (
              <Currency value={changeValue} className='!font-normal' />
            )}
          </p>
          <div className='flex items-center gap-1'>
            <p className='font-semibold '>Total do pedido</p>
            <Currency value={totalPrice} />
          </div>
        </div>
      </div>
      <div className='flex gap-4 w-full'>
        <Button
          className='w-full p-6'
          variant='outline'
          onClick={handleCloseDrawer}
        >
          Voltar
        </Button>
        <Button
          disabled={loading}
          className='w-full p-6'
          type='submit'
          variant='primary'
          onClick={() => onSubmit()}
        >
          Fazer pedido
        </Button>
      </div>
    </div>
  );
}
