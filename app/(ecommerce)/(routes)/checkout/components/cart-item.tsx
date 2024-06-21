import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product, cartItem } from "@/types";


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

  return ( 
    <li className="flex py-6 border-b">
      <div className="relative h-12 w-12 rounded-md overflow-hidden sm:h-32 sm:w-32">
        <Image
          fill
          src={data.product.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        {/* <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div> */}
        <div className="relative pr-9 flex flex-col sm:gap-x-6 sm:pr-0">
          <div className="flex flex-col justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.product.name}
            </p>
          <Currency value={data.product.price} />
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.product.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.product.size.name}</p>
          </div>
          <div className="">
            <p className="text-gray-500">{data.quantity}x</p>
          </div>
        </div>
      </div>
    </li>
  );
}
 
export default CartItem;
