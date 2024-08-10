import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
  return (
    <Container>
      <div className='flex flex-col justify-evenly items-center bg-white min-h-screen px-6'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-bold'>Nós perdemos essa página!</h2>
          <p>
            Procuramos de cima a baixo mas não encontramos o que você estava
            procurando. Vamos levar você para um lugar melhor.
          </p>
        </div>
        <div className='overflow-hidden '>
          <Image
            width={500}
            height={500}
            src='/ilustration_404.svg'
            alt='Página não encontrada'
            // className='object-cover object-center'
          />
        </div>
        <Link
          href='/'
          className='flex items-center rounded-2xl bg-g-yellow py-4 px-16 text-white'
        >
          <p>Voltar para página principal</p>
        </Link>
      </div>
    </Container>
  );
};

export default NotFoundPage;
