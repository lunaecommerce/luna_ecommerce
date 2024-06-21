'use client';
import * as React from 'react';
import { useEffect, useState, forwardRef, Ref } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from './ui/scroll-area';

interface Option {
  id: number;
  value: string;
  desc: string;
}

interface ComboboxProps extends Omit<ButtonProps, 'onChange'> {
  options: Option[];
  value: string;
  onChange: (value: Option) => void;
}

export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  ({ options, value, onChange, ...props }, ref: Ref<HTMLButtonElement>) => {
    const [open, setOpen] = useState(false);

    // // Inicializa o estado do Combobox com o valor fornecido
    const [selectedOption, setSelectedOption] = useState<Option | null>(
      value ? options.find(option => option.value === value) || null : null
    );

    // Atualiza o estado do Combobox quando o valor é alterado
    useEffect(() => {
      setSelectedOption(
        value ? options.find(option => option.value === value) || null : null
      );
    }, [value, options]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between'
            ref={ref as Ref<HTMLButtonElement>} // Ajuste de tipo aqui
            {...props}
          >
            {selectedOption
              ? `${selectedOption.desc} (${selectedOption.value})`
              : 'Selecione um Estado'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent >
          <Command>
            <CommandInput />
            <CommandList>
              <CommandEmpty>Não encontrado.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className='h-72 rounded-md '>
                  {options.map(option => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        setSelectedOption(option);
                        setOpen(false);
                        onChange(option); // Passando apenas o valor do estado, que é uma string
                      }}
                      className='p-4'
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedOption &&
                            selectedOption.value === option.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      <p>
                        {option.desc} ({option.value})
                      </p>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = 'Combobox';
