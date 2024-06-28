import * as React from 'react';

import * as z from 'zod';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useChangeDrawer } from '@/hooks/use-change-drawer';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import useCart from '@/hooks/use-cart';
import toast from 'react-hot-toast';

export function ChangeDrawer() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { isOpenChangeDrawer, onCloseChangeDrawer } = useChangeDrawer();

  if (isDesktop) {
    return (
      <Dialog open={isOpenChangeDrawer} onOpenChange={onCloseChangeDrawer}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Precisa de Troco?</DialogTitle>
            <DialogDescription>
              Digite quanto pagará em dinheiro para receber o troco.
            </DialogDescription>
          </DialogHeader>
          <ChangeForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpenChangeDrawer} onClose={() => onCloseChangeDrawer()}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Precisa de Troco?</DrawerTitle>
          <DrawerDescription>
            Digite quanto pagará em dinheiro para receber o troco.
          </DrawerDescription>
        </DrawerHeader>
        <ChangeForm className='px-4 pb-8' />
      </DrawerContent>
    </Drawer>
  );
}

const formSchema = z.object({
  changeValue: z.coerce.number(),
});

type ChangeDrawerValues = z.infer<typeof formSchema>;

function ChangeForm({ className }: React.ComponentProps<'form'>) {
  const { setChangeValue, onCloseChangeDrawer } = useChangeDrawer();
  const items = useCart(state => state.items);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.product.price);
  }, 0);

  const maxChangeValue = 50;

  const form = useForm<ChangeDrawerValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      changeValue: 0,
    },
  });

  const onSubmit = async (data: ChangeDrawerValues) => {
    if (data?.changeValue > 0) {
      if (data.changeValue - totalPrice > maxChangeValue) {
        toast.error(
          `A quantia máxima para troco é de R$ ${maxChangeValue}`
        );
        return;
      } else {
        setChangeValue(data.changeValue);
      }
    } else {
      setChangeValue(0);
    }
    onCloseChangeDrawer();
  };

  const handleCloseChangeDrawer = async () => {
    form.setValue('changeValue', 0);
    onCloseChangeDrawer();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid items-start gap-4', className)}
      >
        <div className='grid gap-2'>
          <FormField
            control={form.control}
            name='changeValue'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Troco para</FormLabel>
                <FormControl>
                  <Input placeholder='R$100' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex gap-4 w-full'>
          <Button
            className='w-full p-6'
            variant='outline'
            onClick={handleCloseChangeDrawer}
          >
            Não preciso de troco
          </Button>
          <Button className='w-full p-6' type='submit' variant='primary'>
            Confirmar
          </Button>
        </div>
      </form>
    </Form>
  );
}
