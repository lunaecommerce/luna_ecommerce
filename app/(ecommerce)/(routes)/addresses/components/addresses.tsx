'use client';

import { AddressFormModal } from '@/components/modals/form-address-modal';
import { useFormAddressModal } from '@/hooks/use-address-form-modal';

const Addresses = () => {
  const { isOpenFormAddress } = useFormAddressModal();
  return (
    <div>
      {isOpenFormAddress && <AddressFormModal />}
    </div>
  );
};

export default Addresses;
