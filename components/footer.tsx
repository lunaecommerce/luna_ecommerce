import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <div className='w-screen bg-g-yellow-700'>
        <div className='relative flex max-lg:flex-col justify-between mx-auto max-w-7xl p-12 text-white'>
          <div className='space-y-8 z-10'>
            <h2 className='text-5xl font-black'>
              <span>ENTREGA EM ATÉ 24 HORAS </span>
              <br />
              EM GARANHUNS
            </h2>
            <p className='text-xl text-bold lg:w-6/12'>
              Aproveite nosso serviço exclusivo de entrega rápida em Garanhuns!
              Garantimos que seu pedido chegue à sua porta em até 24 horas.
              Estamos aqui para proporcionar a você a melhor experiência de
              entrega, com a agilidade e segurança que você merece.
            </p>
          </div>
          <Image
            alt=''
            src='/truck_delivery_ss.svg'
            width={400}
            height={400}
            className='lg:absolute top-0 right-20'
          />
        </div>
      </div>
      <footer className='bg-white border-t'>
        <div className='mx-auto max-w-7xl flex justify-evenly items-center py-10'>
          <div className='mx-auto sm:grid sm:grid-cols-3 px-4 items-start flex flex-col gap-x-32 gap-y-16 text-sm'>
            <div className='grid items-center'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-semibold'>Politícas e termos</h2>
                <Link href='return-replacements-policy'>
                  <p>Politíca de trocas e devoluções</p>
                </Link>
                <Link href='shipping-policy'>
                  <p>Politíca de entrega e envio</p>
                </Link>
                <Link href='privacy-policy'>
                  <p>Politíca de privacidade</p>
                </Link>
                <Link href='useTerms-policy'>
                  <p>Termos de uso</p>
                </Link>
              </div>
            </div>
            <div className='grid items-center'>
              <div className='flex flex-col gap-2'>
                <div className="grid gap-2">
                  <h2 className='font-semibold'>
                    <p>Central de atendimento</p>
                  </h2>
                  <Link
                    href='https://api.whatsapp.com/send?phone=+5587999109356&text=Ol%C3%A1'
                    target='_blank'
                  >
                    <p>Fale pelo Whatsapp</p>
                  </Link>
                </div>
                {/* <div className="grid gap-2">
                  <h2 className='font-semibold'>SAC</h2>
                  <p>sac@gacessorios.com.br</p>
                </div> */}
                <div className='flex flex-col gap-2'>
                  <h2 className='font-semibold'>Nossas redes</h2>
                  <div className='flex gap-4'>
                    <Link
                      href={'https://instagram.com/garanhunsacessorios'}
                      target='_blank'
                      aria-label='facebook link'
                    >
                      <Facebook size={24} />
                    </Link>
                    <Link
                      href={'https://instagram.com/garanhunsacessorios'}
                      target='_blank'
                      aria-label='instagram link'
                    >
                      <Instagram size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid items-center'>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                  <h2 className=' font-semibold'>Horário de atendimento</h2>
                  <p>Segunda a Sábado, das 08h ás 18h</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <h2 className=' font-semibold'>Formas de pagamento</h2>
                  <div className="flex gap-4 h-6">
                    <Image
                      alt='mastercard logo'
                      src='/mastercard.svg'
                      width={32}
                      height={32}
                    />
                    <Image
                      alt='visa logo'
                      src='/visa.svg'
                      width={32}
                      height={32}
                    />
                    <Image
                      alt='elo logo'
                      src='/elo.svg'
                      width={32}
                      height={32}
                    />
                     <Image
                      alt='hipercard logo'
                      src='/hipercard.svg'
                      width={32}
                      height={32}
                    />
                    <Image
                      alt='american express logo'
                      src='/amex.svg'
                      width={32}
                      height={32}
                    />
                    <Image
                      alt='pix logo'
                      src='/Pix.svg'
                      width={32}
                      height={32}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-black mx-auto py-6 text-white'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='flex items-center text-sm gap-4'>
              <p>Powered by</p>
              <Link href={'https://anjotech.net/'} target='_blank'>
                <div className='relative flex-1 h-10 w-20'>
                  <Image
                    src='/logo_anjotech.svg'
                    fill
                    alt='Anjotech'
                    priority={true}
                  />
                </div>
              </Link>
            </div>
            <p className='text-center text-xs '>
              &copy; 2024 Gacessórios, Todos direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
