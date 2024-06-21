import { Brand } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/brands`;

const getBrands = async (): Promise<Brand[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getBrands;
