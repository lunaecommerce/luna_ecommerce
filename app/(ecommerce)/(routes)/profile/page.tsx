'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import { UserProfile } from '@clerk/nextjs';

export const revalidate = 0;

const ProfilePage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='bg-white min-h-screen h-fit'>
      <Container>
        <div className='px-4 py-6 sm:px-6 lg:px-8'>
          <div className='flex flex-col h-full'>
            <UserProfile path='/profile' routing='path' />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
