import { Address } from '@/types'

const ADDRESS_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/clientAddress`;

const updateAddress = async (
  addressId: string,
  data: Partial<Address>
): Promise<Address> => {
  const res = await fetch(`${ADDRESS_URL}/${addressId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update client address');
  }

  return res.json();
};

export default updateAddress