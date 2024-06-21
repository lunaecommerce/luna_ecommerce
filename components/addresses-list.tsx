'use client';

import deleteAddress from '@/actions/addresses/delete-address';
import getAddresses from '@/actions/addresses/get-addreses';
import { AddressFormModal } from '@/components/modals/form-address-modal';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import { useFormAddressModal } from '@/hooks/use-address-form-modal';
import { useAddressModal } from '@/hooks/use-address-modal';
import { Address } from '@/types';
import { Edit, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface AddressesProps {
  clientId: string | null;
  initialClientAddresses: Address[] | null;
}

const AddressesList: React.FC<AddressesProps> = ({
  clientId,
  initialClientAddresses,
}) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [loading, setLoading] = useState(false);
  const formAddressModal = useFormAddressModal();
  const {
    selectedAddress,
    setSelectedAddress,
    setAdresses,
    isOpen,
    onClose,
    addresses,
  } = useAddressModal();

  useEffect(() => {
    if (initialClientAddresses !== null) {
      setAdresses(initialClientAddresses);
      setIsInitialRender(false);
    }
  }, [initialClientAddresses, setAdresses]);

  if (isInitialRender) {
    return null;
  }

  const handleSelectAddress = (addressSelected: Address) => {
    setSelectedAddress(addressSelected);
    onClose();
  };

  const onDeleteAddress = async (data: Address) => {
    try {
      if (clientId) {
        if (data.isDefault === true) {
          toast.error('Não e possivel excluir um endereço padrão');
          return;
        }
        setLoading(true);
        await deleteAddress(data.id);
        toast.success('Endereço excluído.');

        const newAddresses = await getAddresses(clientId);
        setAdresses(newAddresses);
      } else {
        toast.error('Faça login para excluir endereços.');
      }
    } catch (error: any) {
      toast.error('Algo de errado ocorreu, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddress = (address: Address | null) => {
    if (clientId) {
      formAddressModal.onOpenFormAddress(address, clientId);
    }
  };
  return (
    <div className='h-full'>
      <div className='space-y-4 py-4 pb-4 mx-4'>
        <div className='pb-2'>
          <Button
            className='flex justify-center align-center p-8 gap-4 w-full hover:scale-101 transition'
            onClick={() => handleOpenAddress(null)}
            variant='outline'
          >
            <Plus /> Adiconar novo endereço
          </Button>
        </div>
        {addresses?.length ? (
          addresses.map(address => (
            <div
              className='relative items-center justify-center'
              key={address.id}
            >
              <Button
                key={address.id}
                className={`flex justify-between px-4 py-8 items-center w-full hover:scale-101 transition ${
                  selectedAddress?.id === address.id &&
                  'border-g-yellow border-2'
                }`}
                variant='outline'
                size='fit'
                onClick={() => handleSelectAddress(address)}
              >
                <div className='flex flex-col text-start'>
                  <h4 className='text-xl font-bold'>
                    {address.street}, {address.number}
                  </h4>
                  <p className='text-sm'>
                    {address.district}, {address.city} - {address.state}
                  </p>
                </div>
              </Button>
              <div className='absolute right-5 top-10 flex gap-4'>
                <IconButton
                  icon={<Edit className='h-4 w-4' />}
                  disabled={loading}
                  onClick={() => handleOpenAddress(address)}
                />
                <IconButton
                  icon={<Trash className='h-4 w-4' />}
                  disabled={loading}
                  onClick={() => onDeleteAddress(address)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <div className='relative w-72 h-72 sm:h-96 sm:w-96 mx-auto'>
              <Image
                fill
                src='/ilustration_address.svg'
                alt='Endereço não encontrado'
              />
            </div>
            <p className='text-xl text-center'>
              Uh-oh! Parece que o Bruno está um pouco perdido por aqui.
              <br /> Parece que alguém esqueceu de cadastrar um endereço de
              entrega...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressesList;
