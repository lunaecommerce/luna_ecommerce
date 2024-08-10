import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart, { calculateDiscount } from "@/hooks/use-cart";
import { cartItem } from "@/types";
import NumberInput from "@/components/numberInput";

interface CartItemProps {
  data: cartItem;
}

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.product.id);
  };
  const handleQuantityChange = (newQuantity: number) => {
    cart.updateItemQuantity(data.product.id, newQuantity);
  };

  const price: number = parseFloat(data.product.price) || 0;
  const planPrice = price / 3;
  const discountedPrice = price - calculateDiscount(price, 0.20)
  const planPriceWithDiscount = discountedPrice / 3;

  return (
    <li className="relative flex py-6 border-b">
      <Image src={"/oferta_dia_dos_pais.svg"} width={150} height={32} alt="oferta 20% off" className="absolute left-0 top-0 z-10" />
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.product.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.product.name}
            </p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.product.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.product.size.name}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="text-red-500 line-through">
            <Currency value={data.product.price} />
            </div>
            <div className="text-lg">
            <Currency value={discountedPrice} />
            </div>
          </div>
        </div>
        <div className="">
          <NumberInput
            min={1}
            max={10}
            step={1}
            value={data.quantity} // Passa a quantidade atual do item
            onChange={handleQuantityChange} // Função para atualizar a quantidade
          />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
