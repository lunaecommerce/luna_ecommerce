"use client";

import NextImage from "next/image";
import { Product } from "@/types";
import copy from 'clipboard-copy'
import IconButton from '@/components/ui/icon-button';
import { Share2 } from 'lucide-react';
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import GalleryTab from "./gallery-tab";
import toast from "react-hot-toast";

interface GalleryProps {
  product: Product
}

const Gallery: React.FC<GalleryProps> = ({ product
}) => {
  const handleCopyUrl = async () => {
    try {
      await copy(`${process.env.NEXT_PUBLIC_SITE_URL}product/${product.id}`)
      toast.success("Link copiado.")
    } catch (err) {
      toast.success("Não foi possivel copiar o link.")
    }
  }
  return (
    <TabGroup as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
        <TabList className='grid grid-cols-4 gap-6'>
          {product.images.map(image => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
      <TabPanels className='aspect-square w-full'>
        {product.images.map(image => (
          <TabPanel key={image.id}>
            <div className='relative aspect-square h-full w-full sm:rounded-2xl overflow-hidden'>
              <NextImage
                fill
                src={image.url}
                alt='Image'
                className='object-cover object-center'
              />
              <div className="absolute top-2 right-2 max-lg:bottom-2 max-lg:left-2 z-30">
                <IconButton onClick={handleCopyUrl} icon={<Share2 size={18} />} />
              </div>
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}

export default Gallery;
