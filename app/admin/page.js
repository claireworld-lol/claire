import AdminClient from '../../components/AdminClient';

export const metadata = {
  title: 'Admin Portal',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
