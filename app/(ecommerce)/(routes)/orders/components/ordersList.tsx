'use client';
import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Order, OrderData } from '@/types';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getOrders } from '@/actions/orders/get-orders';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/loader';

interface OrdersListProps {
  clientId: string;
  // orderData: Order[];
}

const statusDescriptions: { [key: number]: string } = {
  1: 'Aguardando Aprovação',
  2: 'Em preparação',
  3: 'Saiu para entrega',
  4: 'Finalizado',
  5: 'Cancelado',
};

const OrdersList: React.FC<OrdersListProps> = ({ clientId }) => {
  const router = useRouter();
  const pageSize = 10;

  const [orders, setOrders] = useState<OrderData>();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const orderData = async (page: number) => {
    try {
      const ordersData = await getOrders({
        clientId: clientId,
        page,
        pageSize,
      });
      setOrders(ordersData);
    } catch (error) {
      console.error('Erro ao obter pedidos:', error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      orderData(currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleSeeDetails = (orderId: number) => {
    router.push(`/orders/${orderId}`);
  };
  if (loading) {
    return (
      <div className='flex justify-center w-full min-h-screen'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='h-full'>
      <div className='space-y-4 py-4 bg-4 mx-4'>
        {orders?.orders?.length ? (
          orders.orders.map(order => (
            <div
              className='relative items-center justify-center border rounded-2xl p-8'
              key={order.id}
            >
              <div className='flex flex-col w-full items-center justify-between'>
                <div className='flex justify-between w-full'>
                  <h4 className='text-start text-xl font-bold'>
                    {statusDescriptions[order.status]}
                  </h4>
                  <div className='text-start pb-4'>
                    <p className='text-sm'>ID do pedido: {order.id}</p>
                    <p className='text-sm'>
                      Pedido feito em:
                      {order.createdAt &&
                        format(new Date(order.createdAt), ' dd/MM/yyyy, HH:mm')}
                    </p>
                  </div>
                </div>
                <Separator className='mb-4' />
                <div className='flex max-md:flex-col max-md:gap-16 gap-8 w-full'>
                  <div className='flex gap-4 w-full overflow-x-auto'>
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
                  <div className='flex flex-col gap-2 md:w-2/4'>
                    <div className='flex gap-2 font-semibold text-start'>
                      <p>Total:</p>
                      <Currency className='' value={order.total} />
                    </div>
                    <div className='space-y-2 text-start text-sm'>
                      {order.paymentMoment === 1 ? (
                        <p className='text-g-yellow'>Pagamento na entrega</p>
                      ) : (
                        <p className='text-g-yellow'>Pagamento no site</p>
                      )}
                      <div className='space-y-2' key={order.address.clientId}>
                        <p>
                          {order.address.district}, {order.address.street},{' '}
                          {order.address.number}
                        </p>
                        <p>
                          {order.address.city}, {order.address.state}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant='outline'
                      onClick={() => handleSeeDetails(order.id)}
                    >
                      <p>Ver detalhes</p>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Não há pedidos</p>
          </div>
        )}
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                disabled={currentPage === orders?.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default OrdersList;
