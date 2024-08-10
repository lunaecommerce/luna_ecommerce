"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart, { calculateDiscount } from "@/hooks/use-cart";
import { Product } from "@/types";

interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem({ product: data, quantity: 1 });
  };

  const price: number = parseFloat(data?.price) || 0;
  const planPrice = price / 3;
  const discountedPrice = price - calculateDiscount(price, 0.20)
  const planPriceWithDiscount = discountedPrice / 3;

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl shadow p-3 space-y-4 relative">
      {/* Image & actions */}
      <Image src={"/oferta_dia_dos_pais.svg"} width={150} height={32} alt="oferta 20% off" className="absolute right-0 top-0 z-10" />
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        {/* <div className="bg-red-400 absolute right-0 z-10 rounded-2xl p-2">
          <p className="font-bold text-white text-center">Oferta <br></br>Dia dos Pais</p>
        </div> */}
        <Image
          src={data.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="md:opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center gap-2">
        <div className="text-xl"><Currency value={discountedPrice} /></div>
        <div className="text-red-500 line-through"><Currency value={data?.price} /></div>
      </div>
    </div>
  );
}

export default ProductCard;
