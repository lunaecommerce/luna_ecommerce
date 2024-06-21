import { Address } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getAddresses = async (clientId: string): Promise<Address[]> => {
  try {
    const res = await fetch(`${URL}/${clientId}/clientAddress`);

    if (!res.ok) {
      console.error(`Failed to fetch client address: ${res.statusText}`);
      return [];
    }

    // Tenta converter a resposta para JSON
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return [];
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export default getAddresses;
