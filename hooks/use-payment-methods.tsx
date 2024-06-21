import { PaymentMethod } from '@/types';
import { create } from 'zustand';

interface PaymentMethodState {
  paymentsMethods: PaymentMethod | null;
}

interface PaymentMethodsStateActions {
  setPaymentMethods: (data: PaymentMethod | null) => void;
}

type formAddressModal = PaymentMethodState & PaymentMethodsStateActions;

export const usePaymentMethods = create<formAddressModal>(set => ({
  paymentsMethods: null,
  setPaymentMethods: (data: PaymentMethod | null) =>
    set({ paymentsMethods: data }),
}));
