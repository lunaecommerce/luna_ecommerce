"use client";

import { useEffect, useState } from "react";

import { ConfirmOrderDrawer } from '@/components/drawer/confirm-order-drawer';
import { ChangeDrawer } from '@/components/drawer/change-drawer';

const DrawerProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ConfirmOrderDrawer />
      <ChangeDrawer />
    </>
  );
}
 
export default DrawerProvider;
