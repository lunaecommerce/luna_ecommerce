import ProductList from '@/components/product-list';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import getProduct from '@/actions/products/get-product';
import getProducts from '@/actions/products/get-products';
import Container from '@/components/ui/container';
import Image from 'next/image';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  if (!product) {
    return null;
  }

  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='space-y-16'>
            <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
              <Gallery images={product.images} />
              <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                <Info data={{product: product, quantity: 1}} />
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
            {/* <div className=''>
              <h3 className='text-2xl font-bold half-underline w-fit'>
                Especificações
              </h3>
              <div className='mx-auto bg-white py-8 rounded-lg'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div>
                    <h2 className='font-bold text-xl'>Total Wattage</h2>
                    <p>100W</p>
                  </div>
                  <div>
                    <h2 className='font-bold text-xl'>Input</h2>
                    <p>100V-240V~50/60Hz 2.1A</p>
                  </div>
                  <div>
                    <h2 className='font-bold text-xl'>Output</h2>
                    <p>USB-C 1 (Middle Port)</p>
                  </div>
                  <div>
                    <h2 className='font-bold text-xl'>1-Port Output</h2>
                    <p>
                      USB-C 1 / C 2: 5V=3A / 9V=3A / 12V=3A / 15V=3A / 20V=5A
                      (100W Max)
                    </p>
                    <p>
                      USB-A: 4.5V=5A / 5V=4.5A / 5V=3A / 9V=2A / 12V=1.5A /
                      10V=2.25A (22.5W Max)
                    </p>
                  </div>
                  <div>
                    <h2 className='font-bold text-xl'>2-Port Output</h2>
                    <p>USB-C 1 + USB-C 2: 65W + 35W</p>
                    <p>USB-C 1 + USB-A: 76W + 22.5W</p>
                  </div>
                  <div>
                    <h2 className='font-bold text-xl'>3 Ports Output</h2>
                    <p>USB-C 1 + USB-C 2 + USB-C 3: 46W + 30W + 22.5W</p>
                  </div>
                  <div>
                    <h2 className='font-bold text-xl'>Total Output</h2>
                    <p>100W Max</p>
                  </div>
                  <div>
                    <h2 className='font-bold text-xl'>Weight</h2>
                    <p>6.4 oz / 183.3 g</p>
                  </div>
                  <div>
                    <h2 className='font-bold text-xl'>Dimensions</h2>
                    <p>1.7 × 1.5 × 2.3 in / 44 × 39 × 60.5 mm</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <hr className='my-10' />
          <ProductList title='Produtos similares' items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
