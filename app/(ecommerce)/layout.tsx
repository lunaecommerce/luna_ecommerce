import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <div>
      <Navbar />
      <div className='mx-auto max-w-7xl'>{children}</div>
      <Footer />
    </div>
  );
}
