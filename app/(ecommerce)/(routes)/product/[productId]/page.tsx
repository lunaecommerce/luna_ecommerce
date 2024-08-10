import { Metadata } from 'next';
import getProduct from '@/actions/products/get-product';
import getProducts from '@/actions/products/get-products';
import Container from '@/components/ui/container';
import Image from 'next/image';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import ProductList from '@/components/product-list';

interface ProductPageParams {
  params: {
    productId: string;
  };
}

// Armazenando o produto em uma variável compartilhada
let productCache: any = null;

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  if (!productCache) {
    productCache = await getProduct(params.productId);
  }

  if (!productCache) {
    return {
      title: 'Produto não encontrado',
      description: 'Esse produto não existe ou está indisponível',
    };
  }

  return {
    title: productCache.name,
    description: productCache.description,
    openGraph: {
      title: productCache.name,
      description: productCache.description,
      images: [
        {
          url: productCache.images[0]?.url,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${params.productId}`,
    },
  };
}

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = productCache || await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  if (!product) {
    return null;
  }

  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8 mt-6'>
          <div className='space-y-16'>
            <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 relative'>
              <Image src={"/oferta_dia_dos_pais.svg"} width={150} height={32} alt="oferta 20% off" className="absolute left-0 top-0 z-10" />
              <Gallery product={product} />
              <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                <Info data={{ product: product, quantity: 1 }} />
              </div>
            </div>
            <div className=''>
              <h3 className='text-2xl font-bold half-underline w-fit'>
                Descrição
              </h3>
              <div className='mx-auto bg-white py-8 rounded-lg'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {
                    product.description
                  }
                </div>
              </div>
            </div>
          </div>
          <hr className='my-10' />
          <ProductList title='Produtos similares' items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
