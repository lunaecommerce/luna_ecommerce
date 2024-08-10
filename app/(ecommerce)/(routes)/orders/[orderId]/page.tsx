'use client';
import React, { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
import { getOrderById } from '@/actions/orders/get-orders';
import { useParams } from 'next/navigation';
import { Order } from '@/types';
import Currency from '@/components/ui/currency';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Loader } from '@/components/ui/loader';

const statusDescriptions: { [key: number]: string } = {
  1: 'Aguardando Aprovação',
  2: 'Em preparação',
  3: 'Saiu para entrega',
  4: 'Finalizado',
  5: 'Cancelado',
};

const OrdersDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const order = await getOrderById(orderId as string);
        setOrder(order);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className='flex justify-center w-full min-h-screen'><Loader /></div>;
  }

  if (!order) {
    return <div>Nenhum pedido encontrado.</div>;
  }

  return (
    <div className='bg-white h-fit '>
      <Container>
        <div className='px-4 sm:px-6 lg:px-8'>
          <Breadcrumb className='mb-6'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href='/'>Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href='/orders'>Pedidos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detalhes do pedido</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='border rounded-xl p-8 mb-8'>
            <div className='lg:flex justify-between mb-6'>
              <div>
                <h1 className='text-3xl font-bold text-black'>
                  Detalhes do pedido #{order.id}
                </h1>
                <p>Você receberá atualizações do seu pedido via Whatsapp</p>
              </div>
              <div className='text-end'>
                <h2 className='text-2xl font-bold text-black'>
                  {statusDescriptions[order.status]}
                </h2>
                <p>
                  Pedido realizado
                  {order.createdAt &&
                    format(new Date(order.createdAt), ' dd/MM/yyyy, HH:mm')}
                </p>
              </div>
            </div>
            <Separator />
            <div className='flex flex-col h-full gap-4 my-6'>
              <div className='flex max-lg:flex-col justify-evenly gap-4 h-full'>
                <div className='w-full'>
                  <h3 className='font-bold'>Endereço de entrega</h3>
                  <p className='text-sm'>
                    {order.address.district}, {order.address.street},{' '}
                    {order.address.number}
                  </p>
                  <p className='text-sm'>
                    {order.address.city}, {order.address.state}
                  </p>
                </div>
                <div className='w-full'>
                  <h3 className='font-bold'>Forma de pagamento</h3>
                  <p className='text-sm'>
                    {order.paymentMoment === 1
                      ? 'Pagamento via site'
                      : 'Pagamento na entrega'}
                  </p>
                  <div className='flex gap-1 text-sm'>
                    {order.orderPayment.paymentDescription}
                    <Currency
                      value={order.orderPayment.totalPayment || 0}
                      className='!font-normal'
                    />
                  </div>
                </div>
                <div className='w-full text-start'>
                  <h3 className='font-bold text-start'>Total do pedido</h3>
                  <div className='space-y-1'>
                    <div className='flex justify-between space-x-2 text-sm'>
                      <p>Acréscimo</p>
                      <Currency
                        value={order.orderPayment.totalIncrease || 0}
                        className='!font-normal'
                      />
                    </div>
                    <div className='flex justify-between space-x-2 text-sm'>
                      <p>Frete</p>
                      <Currency
                        value={order.orderPayment.totalShipping || 0}
                        className='!font-normal'
                      />
                    </div>
                    <div className='flex justify-between space-x-2 text-sm'>
                      <p>Desconto </p>
                      <Currency
                        value={order.orderPayment.totalDiscount || 0}
                        className='!font-normal'
                      />
                    </div>
                    <div className='flex justify-between space-x-2 text-sm font-bold'>
                      <p>Total </p>
                      <Currency value={order.total || 0} />
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className='flex flex-col justify-between gap-4 h-full'>
                <h3 className='text-2xl font-bold'>Produtos</h3>
                <div className='flex w-full overflow-x-auto gap-2'>
                  {order.orderItems && order.orderItems.length ? (
                    order.orderItems.map(item => (
                      <div
                        className='flex justify-between gap-2 text-start'
                        key={item.id}
                      >
                        <div className='flex flex-col gap-1'>
                          <div className='relative'>
                            <div className='aspect-square rounded-xl bg-gray-100 relative'>
                              <Image
                                key={item.id}
                                src={item.image}
                                alt=''
                                fill
                                className='aspect-square object-cover rounded-md'
                              />
                            </div>
                          </div>
                          <p className='text-sm font-semibold'>
                            {item.description}
                          </p>
                          <div className=''>
                            <div className='flex gap-4'>
                              <p className='text-xs '>
                                {item.color}, {item.size}
                              </p>
                              <Currency
                                className='text-xs !font-normal'
                                value={item.price}
                              />
                              <p className='text-xs'>{item.quantity}x</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className=''>
                      <p>Não foi possivel carregar os itens.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrdersDetailsPage;
