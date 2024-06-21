import { PaymentMethod } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/paymentMethod`;

const getPayments = async (): Promise<PaymentMethod[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getPayments;
