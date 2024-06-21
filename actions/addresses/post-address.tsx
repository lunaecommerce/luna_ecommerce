import { Address } from '@/types'

const ADDRESS_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/clientAddress`;

const postAddress = async (
  data: Partial<Address>
): Promise<Address> => {
  const res = await fetch(`${ADDRESS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to post client address');
  }

  return res.json();
};

export default postAddress