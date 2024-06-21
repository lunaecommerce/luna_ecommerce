import Container from '@/components/ui/container';

import { CheckoutForm } from './components/checkout-form';
import { auth } from '@clerk/nextjs/server';
import getAddresses from '@/actions/addresses/get-addreses';
import { AddressFormModal } from '@/components/modals/form-address-modal';
import { redirect } from 'next/navigation';
import getPayments from '@/actions/paymentMethod/get-payments';

export const revalidate = 0;

const CheckoutPage = async () => {
  const { userId } = auth();
  if (!userId) {
    console.error('User not authenticated');
    return redirect('/sign-in');
  }
  
  const clientAddresses = await getAddresses(userId);
  if (!clientAddresses || clientAddresses.length === 0) {
    console.error('No addresses found for the user');
  }

  const paymentMethods = await getPayments();
  return (
    <div className='bg-white mb-16 min-h-screen h-fit'>
      <Container>
        <div className='px-4 sm:py-12 py-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-black pb-4'>
            Finalize seu pedido
          </h1>
          <CheckoutForm clientId={userId} clientAddresses={clientAddresses} paymentMethods={paymentMethods}/>
       
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
