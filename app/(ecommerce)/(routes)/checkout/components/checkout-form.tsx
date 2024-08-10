'use client';

import { MouseEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Check, MapPinIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Currency from '@/components/ui/currency';
import { Pix, CreditCard, MoneyBill } from '@/components/icons';

import { Address, ClientAddress, PaymentMethod } from '@/types';
import getAddresses from '@/actions/addresses/get-addreses';
import useCart, { calculateDiscount } from '@/hooks/use-cart';
import { useAddressModal } from '@/hooks/use-address-modal';
import { useChangeDrawer } from '@/hooks/use-change-drawer';
import { useConfirmOrderDrawer } from '@/hooks/use-confirm-order-drawer';
import { calculateSubtotal, calculateTotal } from '@/hooks/use-cart';

import CartItem from './cart-item';

interface CheckoutFormProps {
  clientId: string | null;
  clientAddresses: ClientAddress[] | null;
  paymentMethods: PaymentMethod[] | null;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientId,
  clientAddresses,
  paymentMethods,
}) => {
  const { selectedAddress, setSelectedAddress } = useAddressModal();
  const addressModal = useAddressModal();
  const { onOpenChangeDrawer, changeValue } = useChangeDrawer();
  const newAddresses = getAddresses(clientId || '');
  const {
    onOpenConfirmOrderDrawer,
    setSelectedPaymentMethod,
    selectedPaymentMethod,
  } = useConfirmOrderDrawer();

  useEffect(() => {
    const defaultAddress = clientAddresses?.find(
      address => address.isDefault === true
    );
    setSelectedAddress(defaultAddress || null);
    if (clientAddresses !== null && clientAddresses.length <= 1) {
      setSelectedAddress(clientAddresses[0])
    }
  }, [clientAddresses]);

  const onViewAddresses: MouseEventHandler<HTMLButtonElement> = async event => {
    event.stopPropagation();
    try {
      const clientAddresses = await getAddresses(clientId || '');
      if (clientId) {
        addressModal.onOpen(clientAddresses, clientId);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const items = useCart(state => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handlePaymentMethod = (data: PaymentMethod) => {
    if (data.id === 1) {
      onOpenChangeDrawer(clientId || '');
    }
    setSelectedPaymentMethod({
      paymentDescription: data.description,
      paymentId: data.id,
      id: data.id,
      totalShipping: 0,
      totalIncrease: 0,
      totalDiscount: 0,
    });
  };

  // Calcular o subtotal e o total com base nos itens do carrinho
  const subtotalPrice = calculateSubtotal(cart.items);
  const totalDiscount = calculateDiscount(subtotalPrice, 0.20)
  const totalPrice = calculateTotal(cart.items, 0.20);
  
  const handleConfirmOrder = () => {
    if (selectedAddress === null || selectedAddress === undefined) {
      toast.error('Por favor, informe um endereço.');
    } else if (!selectedPaymentMethod) {
      toast.error('Por favor, selecione uma forma de pagamento.');
    } else if (!clientId) {
      toast.error('Ocorreu um erro ao obter informações tente novamente.');
    } else {
      onOpenConfirmOrderDrawer(clientId);
    }
  };

  return (
    <>
      <Separator />
      <div className='h-full flex max-md:flex-col justify-between my-8 gap-16'>
        <div className='flex flex-col gap-8 w-full'>
          <Button
            className='flex flex-col w-full gap-2 text-start p-8'
            onClick={onViewAddresses}
            size='fit'
            variant='outline'
          >
            <div className='flex w-full gap-4'>
              <MapPinIcon />
              <h4 className='text-xl font-bold tracking-tight'>Endereço</h4>
            </div>
            <div className='flex justify-between w-full gap-4'>
              {selectedAddress ? (
                <div className='flex flex-col'>
                  <p className='text-lg'>
                    {selectedAddress.street}, {selectedAddress.number}
                  </p>
                  <p>
                    {selectedAddress.city}/{selectedAddress.state}
                  </p>
                </div>
              ) : (
                <p>Informe o endereço que será entregue seu pedido.</p>
              )}
              {selectedAddress && <p className='text-g-yellow'>Trocar</p>}
            </div>
          </Button>
          <Tabs defaultValue='delivery_payment' className='w-full'>
            <TabsList>
              <TabsTrigger value='delivery_payment'>
                Pague na entrega
              </TabsTrigger>
              <TabsTrigger disabled value='website_payment'>
                Pague pelo site
              </TabsTrigger>
            </TabsList>
            <TabsContent value='delivery_payment'>
              <div className='grid grid-cols-2 items-center justify-center gap-4 py-4'>
                {paymentMethods !== null &&
                  paymentMethods.map(payment => (
                    <Button
                      className={`border py-8 md:px-8 px-6 rounded-2xl text-sm ${selectedPaymentMethod?.id === payment.id &&
                        'bg-g-yellow-100 dark:text-black'
                        }`}
                      key={payment.id}
                      onClick={() => handlePaymentMethod(payment)}
                    >
                      <div className='grid grid-cols-8 w-full justify-center items-center'>
                        <div className='col-span-2'>
                          {payment.id === 1 && (
                            <MoneyBill
                              width={24}
                              height={24}
                              className='text-g-yellow'
                            />
                          )}
                          {payment.id === 2 && (
                            <CreditCard
                              width={24}
                              height={24}
                              className='text-g-yellow'
                            />
                          )}
                          {payment.id === 3 && (
                            <CreditCard
                              width={24}
                              height={24}
                              className='text-g-yellow'
                            />
                          )}
                          {payment.id === 4 && (
                            <Pix
                              width={24}
                              height={24}
                              className='text-g-yellow'
                            />
                          )}
                        </div>
                        <div className='col-span-5'>
                          {payment.description}
                          {payment.id === 1 &&
                            selectedPaymentMethod?.id === payment.id &&
                            (changeValue > 0 ? (
                              <p className='text-xs text-gray-500'>
                                Troco para R$ {changeValue}
                              </p>
                            ) : (
                              <p className='text-xs text-gray-500'>Sem troco</p>
                            ))}
                        </div>
                        <div className='col-span-1 flex justify-end'>
                          {selectedPaymentMethod?.id === payment.id && (
                            <Check className='text-g-yellow' size={24} />
                          )}
                        </div>
                      </div>
                    </Button>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value='website_payment'>Indisponível.</TabsContent>
          </Tabs>
          <Button
            disabled={cart.items.length <= 0}
            className='p-8 w-full'
            variant={'primary'}
            onClick={() => handleConfirmOrder()}
            type='button'
          >
            Confirmar
          </Button>
        </div>

        <div className='flex flex-col border rounded-2xl h-full gap-2 w-full'>
          {cart.items.length === 0 && (
            <p className='text-neutral-500'>Sem itens no carrinho.</p>
          )}
          <ul>
            {cart.items.map(item => (
              <CartItem key={item.product.id} data={item} />
            ))}
          </ul>
          <div className='flex flex-col gap-2 p-4'>
            <div className='flex justify-between '>
              <p>Subtotal</p>
              <Currency value={subtotalPrice} className='font-normal' />
            </div>
            <div className='flex justify-between'>
              <p>Taxa de entrega</p>
              <Currency value={0} className='font-normal' />
            </div>
            <div className='flex justify-between'>
              <p>Descontos</p>
              <Currency value={-totalDiscount} className='font-normal' />
            </div>
            <div className='flex justify-between text-lg font-bold'>
              <p>Total</p>
              <Currency value={totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
