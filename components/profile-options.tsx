'use client';

import * as React from 'react';
import {
  DoorOpen,
  LogIn,
  LogOut,
  Map,
  MapPin,
  Package,
  User,
  UserCog,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { SignInButton, SignOutButton, useAuth, useClerk } from '@clerk/nextjs';

export function ProfileOptions() {
  const { sessionId } = useAuth();
  const { signOut } = useClerk();

  if (!sessionId) {
    return (
      <SignInButton mode='modal'>
        <DoorOpen className='cursor-pointer hover:text-g-yellow' />
      </SignInButton>
    );
  }

  const handleSignOut = async () => {
    await signOut({redirectUrl: '/'})
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon'>
          <User size={24} color='black' />
          <span className='sr-only'>Opções do perfil</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <Link href='/profile'>
          <DropdownMenuItem className='flex px-6 py-4 gap-4 items-center text-start'>
            <UserCog size={18} />
            Sua Conta
          </DropdownMenuItem>
        </Link>
        <Link href='/addresses'>
          <DropdownMenuItem className='flex px-6 py-4 gap-4 items-center text-start'>
            <MapPin size={18} />
            Endereços
          </DropdownMenuItem>
        </Link>
        <Link href='/orders'>
          <DropdownMenuItem className='flex px-6 py-4 gap-4 items-center text-start'>
            <Package size={18} />
            Pedidos
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className='flex px-6 py-4 gap-4 items-center text-start' onClick={handleSignOut}>
          <LogOut size={18} />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
