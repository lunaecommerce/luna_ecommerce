'use client';

import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { ProfileOptions } from '@/components/profile-options';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className='flex items-center md:gap-x-8 gap-x-4'>
      <ProfileOptions />
      <Button
        onClick={() => router.push('/cart')}
        className='flex items-center rounded-full bg-g-yellow px-4 py-2'
      >
        <ShoppingBag size={20} color='white' />
        <span className='ml-2 text-sm font-medium text-white'>
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
