import {OrderPayment, PaymentMethod } from '@/types';
import { create } from 'zustand';

interface ConfirmOrderDrawerState {
  isOpenConfirmOrderDrawer: boolean;
  clientId: string;
  changeValue: number;
  selectedPaymentMethod: Partial<OrderPayment> | null;
}

interface ConfirmOrderDrawerStateActions {
  onOpenConfirmOrderDrawer: (clientId: string | '') => void;
  onCloseConfirmOrderDrawer: () => void;
  setConfirmOrderValue: (data: number | 0) => void;
  setSelectedPaymentMethod: (data: Partial<OrderPayment>) => void;
}

type formAddressModal = ConfirmOrderDrawerState &
  ConfirmOrderDrawerStateActions;

export const useConfirmOrderDrawer = create<formAddressModal>(set => ({
  isOpenConfirmOrderDrawer: false,
  clientId: '',
  changeValue: 0,
  selectedPaymentMethod: null,
  onOpenConfirmOrderDrawer: (clientId: string | '') =>
    set({ isOpenConfirmOrderDrawer: true, clientId }),
  onCloseConfirmOrderDrawer: () => set({ isOpenConfirmOrderDrawer: false }),
  setConfirmOrderValue: (data: number | 0) => set({ changeValue: data }),
  setSelectedPaymentMethod: (data: Partial<OrderPayment>) =>
    set({ selectedPaymentMethod: data }),
}));
