import { Address } from '@/types';
import { create } from 'zustand';

interface FormAddressModalState {
  isOpenFormAddress: boolean;
  initialData?: Address | null;
  clientId: string;
}

interface FormAddressModalActions {
  onOpenFormAddress: (initialData: Address | null, clientId: string) => void;
  onCloseFormAddress: () => void;
  setAddress: (data: Address | null) => void;
}

type formAddressModal = FormAddressModalState & FormAddressModalActions;

export const useFormAddressModal = create<formAddressModal>(set => ({
  isOpenFormAddress: false,
  initialData: null,
  clientId: '',
  onOpenFormAddress: (initialData: Address | null, clientId: string) =>
    set({ isOpenFormAddress: true, initialData, clientId }),
  onCloseFormAddress: () => set({ isOpenFormAddress: false, initialData: null  }),
  setAddress: (data: Address | null) => set({ initialData: data }),
}));
