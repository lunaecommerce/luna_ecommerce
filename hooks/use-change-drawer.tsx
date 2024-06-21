import { create } from 'zustand';

interface ChangeDrawerState {
  isOpenChangeDrawer: boolean;
  clientId: string;
  changeValue: number;
}

interface ChangeDrawerStateActions {
  onOpenChangeDrawer: (clientId: string) => void;
  onCloseChangeDrawer: () => void;
  setChangeValue: (data: number | 0) => void;
}

type formAddressModal = ChangeDrawerState & ChangeDrawerStateActions;

export const useChangeDrawer = create<formAddressModal>(set => ({
  isOpenChangeDrawer: false,
  clientId: '',
  changeValue: 0,
  onOpenChangeDrawer: (clientId: string) => set({ isOpenChangeDrawer: true, clientId }),
  onCloseChangeDrawer: () => set({ isOpenChangeDrawer: false }),
  setChangeValue: (data: number | 0) => set({ changeValue: data }),
}));
