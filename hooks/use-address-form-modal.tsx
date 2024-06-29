import { Address, ClientAddress } from '@/types';
import { create } from 'zustand';

interface FormAddressModalState {
  isOpenFormAddress: boolean;
  initialData?: ClientAddress | null;
  clientId: string;
}

interface FormAddressModalActions {
  onOpenFormAddress: (initialData: ClientAddress | null, clientId: string) => void;
  onCloseFormAddress: () => void;
  setAddress: (data: ClientAddress | null) => void;
}

type formAddressModal = FormAddressModalState & FormAddressModalActions;

export const useFormAddressModal = create<formAddressModal>(set => ({
  isOpenFormAddress: false,
  initialData: null,
  clientId: '',
  onOpenFormAddress: (initialData: ClientAddress | null, clientId: string) =>
    set({ isOpenFormAddress: true, initialData, clientId }),
  onCloseFormAddress: () => set({ isOpenFormAddress: false, initialData: null  }),
  setAddress: (data: ClientAddress | null) => set({ initialData: data }),
}));
