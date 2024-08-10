import { GoogleAnalytics } from '@next/third-parties/google'
import { Urbanist } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';

import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import Footer from '@/components/footer';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import DrawerProvider from '@/providers/drawer-provider';

const font = Urbanist({ subsets: ['latin'] });

export const metadata = {
  title: 'Gacessórios',
  description: 'A melhor experiência para comprar importados.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={ptBR}
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      appearance={{
        variables: {
          colorPrimary: '#FF9500',
        },
      }}
    >
      <html lang='pt-BR'>
        <body className={font.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <ModalProvider />
            <DrawerProvider />
            <main className='md:mt-20 mt-28 mx-auto overflow-x-hidden'>{children}</main>
          </ThemeProvider>
        </body>
        
      <GoogleAnalytics gaId="G-VS1LRTQ90J" />
      </html>
    </ClerkProvider>
  );
}
