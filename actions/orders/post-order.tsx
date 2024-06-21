import { Order, PostOrderResponse } from '@/types';

const ORDER_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/orders`;

const postOrder = async (data: Partial<Order>): Promise<PostOrderResponse> => {
  const res = await fetch(`${ORDER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to post order');
  }
  return res.json();
};

export default postOrder;
