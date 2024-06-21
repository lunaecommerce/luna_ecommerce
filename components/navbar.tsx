import Link from 'next/link';

import MainNav from '@/components/main-nav';
import Container from '@/components/ui/container';
import NavbarActions from '@/components/navbar-actions';
import getCategories from '@/actions/categories/get-categories';
import Image from 'next/image';
import MobileNavbar from './mobile-navbar';

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className='w-full border-b mb-4 sm:mb-6'>
      <Container>
        <div className='bg-black p-2'>
          <p className='text-white text-sm text-center'>
            Frete grátis para Garanhuns e São João 
          </p>
          {/* <p className='text-white text-sm text-center'>
            Frete grátis para Garanhuns e São João | Demais Regiões, para
            compras acima de R$199,90
          </p> */}
        </div>
        <div className='mx-auto max-w-7xl relative px-4 sm:px-6 lg:px-8 flex h-20 justify-between items-center'>
          <MobileNavbar data={categories} />
          <div>
            <Link
              href='/'
              className='uppercase font text-md h-16 flex items-center'
            >
              <div className='relative h-full w-36 sm:w-44 xl:w-52'>
                <Image
                  src={'/logo01Gacessorios.svg'}
                  alt='GACESSÓRIOS'
                  fill
                  priority={true}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
            </Link>
          </div>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
