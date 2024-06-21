import { Order, OrderData } from '@/types';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/orders`;

interface Query {
  storeId?: string;
  clientId?: string;
  orderId?: string;
  page?: number;
  pageSize?: number;
}

const getOrders = async (query: Query): Promise<OrderData> => {
  // Adiciona os parâmetros de páginação e clientId à consulta
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      clientId: query.clientId,
      page: query.page,
      pageSize: query.pageSize,
    },
  });
  const res = await fetch(url);
  return res.json();
};

const getOrderById = async (
  orderId: string,
): Promise<Order> => {
  console.log(orderId);

  const url = `${URL}/${orderId}`;

  const res = await fetch(url);
  return res.json();
};

export { getOrders, getOrderById };
