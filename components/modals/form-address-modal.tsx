'use client';

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import updateAddress from '@/actions/addresses/put-address';
import postAddress from '@/actions/addresses/post-address';
import { useFormAddressModal } from '@/hooks/use-address-form-modal';
import { Combobox } from '../combobox';
import { states } from '@/constants';
import axios from 'axios';
import getAddresses from '@/actions/addresses/get-addreses';
import { useAddressModal } from '@/hooks/use-address-modal';

const formSchema = z.object({
  zipcode: z.string().min(8, { message: 'CEP é um campo obrigatório' }),
  city: z.string().min(2, { message: 'Cidade é um campo obrigatório' }),
  state: z.string().min(2, { message: 'Estado é um campo obrigatório' }),
  district: z.string().min(2, { message: 'Bairro é um campo obrigatório' }),
  street: z.string().min(4, { message: 'Rua é um campo obrigatório' }),
  number: z.string().min(2, { message: 'Número é um campo obrigatório' }),
  complement: z.string(),
  clientName: z.string().min(2, { message: 'Nome é um campo obrigatório' }),
  clientPhone: z.string().min(2, { message: 'Celular é um campo obrigatório' }),
  clientId: z.string(),
});

type AddressFormModalValues = z.infer<typeof formSchema>;

export const AddressFormModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialData = useFormAddressModal(state => state.initialData);
  const { isOpenFormAddress, onCloseFormAddress } = useFormAddressModal();
  const clientId = useFormAddressModal(state => state).clientId;
  const { setAdresses } = useAddressModal();
  const [isValidCep, setIsValidCep] = useState(true);

  const title = initialData ? 'Editar endereço' : 'Cadastre um novo endereço';
  const toastMessage = initialData
    ? 'Endereço atualizado.'
    : 'Endereço criado.';

  const form = useForm<AddressFormModalValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      zipcode: '',
      city: '',
      state: '',
      district: '',
      street: '',
      number: '',
      complement: '',
      clientName: '',
      clientPhone: '',
      clientId: clientId,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: AddressFormModalValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateAddress(initialData.id, data);
      } else {
        console.log('oi', data)
        await postAddress(data);
      }
      toast.success(toastMessage);

      const newAddresses = await getAddresses(clientId);
      setAdresses(newAddresses);
      onCloseFormAddress();
    } catch (error: any) {
      toast.error('Algo de errado ocorreu, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  interface Iviacep {
    data: {
      cep: string;
      logradouro: string;
      complemento: string;
      bairro: string;
      localidade: string;
      uf: string;
      ibge: string;
      gia: string;
      ddd: string;
      siafi: string;
    };
  }

  const handleBlurCep = async (cep: string) => {
    try {
      if (cep.length < 7) {
        return false;
      }
      if (cep.length > 7) {
        const res: Iviacep = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        if (res.data.localidade !== 'Garanhuns' && res.data.localidade !== 'São João') {
          setIsValidCep(false);
        } else {
          setIsValidCep(true);
        }


        form.setValue('district', res.data.bairro);
        form.setValue('street', res.data.logradouro);
        form.setValue('state', res.data.uf.toUpperCase());
        form.setValue('city', res.data.localidade.toUpperCase());
      }
    } catch (error) { }
  };

  return (
    <Modal open={isOpenFormAddress} onClose={onCloseFormAddress}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full px-2'>
          <div className='text-2xl font-bold'>{title}</div>
          <div className='sm:grid sm:grid-cols-2 flex flex-col gap-4 py-4'>
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name='zipcode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Digite o cep'
                        {...field}
                        onBlur={() => handleBlurCep(field.value || '')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem className='flex flex-col justify-end gap-1'>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Combobox
                      disabled={loading}
                      options={states.map(option => ({
                        id: option.id,
                        value: option.sigla,
                        desc: option.nome,
                      }))}
                      value={field.value || ''} // Defina como uma string vazia caso seja null
                      onChange={newState => {
                        form.setValue('state', newState.value.toUpperCase());
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Cidade' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='district'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Bairro' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='street'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Rua' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Número da casa'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='complement'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Complemento'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className='sm:grid sm:grid-cols-2 flex flex-col gap-4 py-4'>
            <h4 className='col-span-2 text-2xl font-bold'>
              Informações para contato
            </h4>
            <FormField
              control={form.control}
              name='clientName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Seu Nome'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='clientPhone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Celular para contato'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='pt-6 space-x-2 flex flex-col gap-4 items-center justify-end w-full'>
            {!isValidCep && (
              <p className='text-red-400'>
                Desculpe, o endereço informado não pode ser atendido.
                Atualmente, realizamos entregas apenas nas cidades de Garanhuns
                e São João.
              </p>
            )}
            <Button
              variant='primary'
              disabled={loading || !isValidCep}
              type='submit'
              className='w-full'
            >
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
