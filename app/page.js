import HomeClient from '../components/HomeClient';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'CLAIRE',
    url: 'https://claire.vercel.app',
    logo: 'https://claire.vercel.app/claire_logo.jpg',
    image: 'https://claire.vercel.app/claire_logo.jpg',
    telephone: '+916354315878',
    description: 'Premium academic writing, graphic design, website development & project solutions. PPT presentations, assignments, research papers, eBooks, engineering projects & more.',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PPT & Presentations' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Reports & Assignments' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engineering Projects' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Research & Conference Papers' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'eBooks & Books' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphic Designing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Payment Integration' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Blog & CMS Setup' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Premium Certificates' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conference Support' } },
      ],
    },
    sameAs: ['https://instagram.com/claireworld.lol'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
