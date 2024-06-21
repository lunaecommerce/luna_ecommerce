import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, cartItem } from '@/types';

interface CartStore {
  items: cartItem[];
  addItem: (data: cartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: cartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === data.product.id
        );

        if (existingItem) {
          return toast('O produto já está no carrinho.');
        }

        set({ items: [...get().items, data] });
        toast.success('Produto adicionado ao carrinho.');
      },
      removeItem: (id: string) => {
        set({
          items: [
            ...get().items.filter((item) => item.product.id !== id),
          ],
        });
        toast.success('Produto removido do carrinho.');
      },
      updateItemQuantity: (id: string, quantity: number) => {
        set({
          items: get().items.map((item) =>
            item.product.id === id
              ? { ...item, quantity }
              : item
          ),
        });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;

// Função para calcular o subtotal dos itens no carrinho
export const calculateTotal = (items: cartItem[]): number => {
  return items.reduce((total, item) => {
    return total + Number(item.product.price) * Number(item.quantity);
  }, 0);
};

// Função para calcular o total (incluindo impostos, frete, etc., se necessário)
export const calculateSubtotal = (items: cartItem[]): number => {
  return items.reduce((total, item) => {
    return total + Number(item.product.price) * Number(item.quantity);
  }, 0);
};
