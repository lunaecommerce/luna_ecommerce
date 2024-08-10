'use client';

import { useEffect, useState } from 'react';
import { MenuIcon, X } from 'lucide-react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import IconButton from '@/components/ui/icon-button';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';
import Link from 'next/link';

interface MobileNavbarProps {
  data: Category[];
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ data }) => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const routes = data.map(route => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const onOpenNav = () => setOpenNav(true);
  const onCloseNav = () => setOpenNav(false);

  if (!isMounted) {
    return null;
  }
  return (
    <div className='flex flex-col z-50'>
      <Button
        onClick={onOpenNav}
        className='flex items-center lg:hidden bg-transparent'
        aria-label='menu button'
      >
        <MenuIcon size={24} color='black' />
      </Button>

      <Dialog
        open={openNav}
        as='div'
        className='relative z-40 lg:hidden'
        onClose={onCloseNav}
      >
        {/* Background color and opacity */}
        <div className='fixed inset-0 bg-black bg-opacity-25' />

        {/* Dialog position */}
        <div className='fixed inset-0 z-40 flex'>
          <DialogPanel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>
            {/* Close button */}
            <div className='flex items-center justify-end px-4'>
              <IconButton icon={<X size={18} />} onClick={onCloseNav} />
            </div>
            <div className='flex flex-col p-4'>
              <h3 className='text-lg font-semibold'>Categorias</h3>
              <hr className='my-4' />
              <div className='flex flex-col gap-4'>
                {routes.map(route => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      'font-medium transition-colors hover:text-black capitalize',
                      route.active ? 'text-black' : 'text-neutral-500'
                    )}
                    onClick={onCloseNav}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default MobileNavbar;
