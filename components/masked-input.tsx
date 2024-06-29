import * as React from "react";
import InputMask from "react-input-mask";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string; // Adicionamos uma propriedade opcional para a máscara
}

const MaskedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, ...props }, ref) => {
    // Se a máscara for fornecida, usamos InputMask, caso contrário, usamos o input padrão
    const inputElement = mask ? (
      <InputMask
        mask={mask}
        className={cn(
          "flex h-10 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-g-yellow disabled:cursor-not-allowed disabled:opacity-50 ",
          className
        )}
        ref={ref as React.Ref<any>} // TypeScript pode precisar de uma conversão de tipo aqui
        {...props}
      />
    ) : (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-g-yellow disabled:cursor-not-allowed disabled:opacity-50 ",
          className
        )}
        ref={ref}
        {...props}
      />
    );

    return inputElement;
  }
);

MaskedInput.displayName = "Input";

export { MaskedInput };
