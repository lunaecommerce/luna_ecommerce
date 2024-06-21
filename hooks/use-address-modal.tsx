import { Address } from '@/types';
import { create } from 'zustand';

interface AddressModalState {
  isOpen: boolean;
  clientId: string;
  addresses?: Address[];
  selectedAddress: Address | null; // Adicionando selectedAddressId
}

interface AddressModalActions {
  onOpen: (addresses: Address[], clientId: string) => void;
  onClose: () => void;
  setSelectedAddress: (id: Address | null) => void; // Nova ação para atualizar selectedAddressId
  setAdresses: (data: Address[] | []) => void;
}

type addressModal = AddressModalState & AddressModalActions;

export const useAddressModal = create<addressModal>(set => ({
  isOpen: false,
  clientId: '',
  addresses: [],
  selectedAddress: null, // Inicializando selectedAddressId com null
  onOpen: (addresses: Address[], clientId: string) =>
    set({ isOpen: true, addresses, clientId }),
  onClose: () => set({ isOpen: false }),
  setSelectedAddress: (data: Address | null) => set({ selectedAddress: data }), // Definindo ação para atualizar selectedAddressId
  setAdresses: (data: Address[] | []) => set({ addresses: data }),
}));



