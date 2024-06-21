import { auth } from '@clerk/nextjs/server';

import Container from '@/components/ui/container';
import AddressesList from '@/components/addresses-list';
import getAddresses from '@/actions/addresses/get-addreses';

import Addresses from './components/addresses';

const OrdersPage = async () => {
  const { userId } = auth();
  // const userId = 'user_2e0X5mtbM0Y4ROcLZn6v3ERVJhl';
  const clientAddresses = await getAddresses(userId || '');

  return (
    <div className='bg-white h-fit'>
      <Container>
        <div className='px-4 py-6 sm:px-6 lg:px-8'>
          <div className='flex flex-col min-h-screen h-full'>
            <h1 className='text-3xl font-bold text-black pb-4'>Endereços</h1>
            <AddressesList
              initialClientAddresses={clientAddresses}
              clientId={userId}
            />
            <Addresses />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrdersPage;
