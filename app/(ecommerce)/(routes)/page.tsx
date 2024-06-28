import getProducts from '@/actions/products/get-products';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import { InfoCards } from '@/components/info-cards';
import getCategories from '@/actions/categories/get-categories';

export const revalidate = 0;

const HomePage = async () => {
  const newProducts = await getProducts({ isFeatured: true });
  const allProducts = await getProducts({});
  const categories = await getCategories();

  // Agrupar produtos por categoria
  const productsByCategory = categories.map(category => ({
    ...category,
    products: allProducts.filter(product => product.categoryId === category.id),
  }));

  // Dividir o array de categorias em duas partes
  const midpoint = Math.ceil(productsByCategory.length / 2);
  const firstHalf = productsByCategory.slice(0, midpoint);
  const secondHalf = productsByCategory.slice(midpoint);

  return (
    <div className='overflow-x-hidden'>
      <Container>
        <div className='space-y-10 pb-10'>
          <div className='px-4 sm:px-6'>
            <h1 className='text-3xl sm:text-4xl font-medium text-slate-700'>
              <span className='text-g-yellow'>Garanhuns Acessórios.</span> A
              melhor experiência para comprar importados.
            </h1>
          </div>

          <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
            <ProductList title='Novidades' items={newProducts} />
          </div>

          {firstHalf.map(({ id, name, products }) => (
            <div key={id} className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
              <ProductList title={name} items={products} />
            </div>
          ))}

          <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
            <h2 className='font-bold text-4xl'>Nossas vantagens</h2>
            <InfoCards />
          </div>

          {secondHalf.map(({ id, name, products }) => (
            <div key={id} className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
              <ProductList title={name} items={products} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
