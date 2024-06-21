import { Image } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/images`;

const getImage = async (productId: string): Promise<Image[]> => {
  const res = await fetch(`${URL}/${productId}`);

  return res.json();
};

export default getImage;
