import { Product } from '@/types';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  brandId?: string;
  featured?: string;
}

const getProducts = async (query?: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query?.colorId,
      sizeId: query?.sizeId,
      categoryId: query?.categoryId,
      isFeatured: query?.isFeatured,
      brandId: query?.brandId,
      featuredId: query?.brandId
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;
