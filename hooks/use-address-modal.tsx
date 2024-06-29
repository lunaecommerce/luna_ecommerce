import { Address, ClientAddress } from '@/types';
import { create } from 'zustand';

interface AddressModalState {
  isOpen: boolean;
  clientId: string;
  addresses?: ClientAddress[];
  selectedAddress: ClientAddress | null; // Adicionando selectedAddressId
}

interface AddressModalActions {
  onOpen: (addresses: ClientAddress[], clientId: string) => void;
  onClose: () => void;
  setSelectedAddress: (id: ClientAddress | null) => void; // Nova ação para atualizar selectedAddressId
  setAdresses: (data: ClientAddress[] | []) => void;
}

type addressModal = AddressModalState & AddressModalActions;

export const useAddressModal = create<addressModal>(set => ({
  isOpen: false,
  clientId: '',
  addresses: [],
  selectedAddress: null, // Inicializando selectedAddressId com null
  onOpen: (addresses: ClientAddress[], clientId: string) =>
    set({ isOpen: true, addresses, clientId }),
  onClose: () => set({ isOpen: false }),
  setSelectedAddress: (data: ClientAddress | null) => set({ selectedAddress: data }), // Definindo ação para atualizar selectedAddressId
  setAdresses: (data: ClientAddress[] | []) => set({ addresses: data }),
}));



