import Container from '@/components/ui/container';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';

import getProducts from '@/actions/products/get-products';
import getCategory from '@/actions/categories/get-category';
import getSizes from '@/actions/sizes/get-sizes';
import getColors from '@/actions/colors/get-colors';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';
import getBrands from '@/actions/brands/get-brands';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
    brandId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
    brandId: searchParams.brandId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const brands = await getBrands();
  const category = await getCategory(params.categoryId);

  return (
    <div className='bg-white h-screen'>
      <Container>
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            <MobileFilters sizes={sizes} colors={colors} />
            <div className='hidden lg:block'>
              <Filter valueKey='sizeId' name='Tamanhos' data={sizes} />
              <Filter valueKey='colorId' name='Cores' data={colors} />
              <Filter valueKey='brandId' name='Marcas' data={brands} />
            </div>
            <div className='mt-6 lg:col-span-4 lg:mt-0'>
              {products.length === 0 && <NoResults />}
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {products.map(item => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
