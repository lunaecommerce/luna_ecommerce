'use client ';
import { useEffect, useState } from 'react';
import { useAddressModal } from '@/hooks/use-address-modal';
import { Modal } from '@/components/ui/modal';

import { useFormAddressModal } from '@/hooks/use-address-form-modal';
import { AddressFormModal } from './form-address-modal';
import AddressesList from '@/components/addresses-list';

export const AddressModal: React.FC = () => {
  const clientId = useAddressModal(state => state.clientId);
  const { setSelectedAddress, isOpen, onClose, addresses } = useAddressModal();
  const { isOpenFormAddress } = useFormAddressModal();

  useEffect(() => {
    const defaultAddress = addresses?.find(
      address => address.isDefault === true
    );
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [addresses]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className='flex flex-col gap-4 w-full'>
        <h2 className='text-2xl font-bold'>
          Qual endereço deseja receber seu pedido?
        </h2>
        <div className='relative'>
          <div className='z-10'>
            <AddressesList
              initialClientAddresses={addresses || null}
              clientId={clientId}
            />
          </div>
        </div>
      </div>
      {isOpenFormAddress && <AddressFormModal />}
    </Modal>
  );
};
