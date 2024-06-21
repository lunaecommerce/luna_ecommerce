import { Address } from '@/types';

const ADDRESS_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/clientAddress`;

const deleteAddress = async (addressId: string): Promise<Address> => {
  const res = await fetch(`${ADDRESS_URL}/${addressId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to delete client address');
  }

  return res.json();
};

export default deleteAddress;
