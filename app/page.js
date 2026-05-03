import HomeClient from '../components/HomeClient';

const SITE_URL = 'https://www.claireworld.lol';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'CLAIRE',
    url: SITE_URL,
    logo: `${SITE_URL}/claire_logo.jpg`,
    image: `${SITE_URL}/claire_logo.jpg`,
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

      {/* SSR content for search engine crawlers — this text is in the initial HTML */}
      <article aria-hidden="true" style={{
        position: 'absolute', width: '1px', height: '1px',
        padding: 0, margin: '-1px', overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0,
      }}>
        <h1>CLAIRE — Academic, Creative &amp; Development Services in Vadodara</h1>
        <p>Premium academic writing, graphic design, website development and project solutions — powered by AI and human expertise. Trusted by 500+ clients in Vadodara, Gujarat, India.</p>

        <h2>Our Services</h2>
        <ul>
          <li>PPT and Presentations — Stunning slides that make an impact</li>
          <li>Reports and Assignments — Well researched, well written</li>
          <li>Engineering Projects — Diploma / BE complete project solutions</li>
          <li>Research and Conference Papers — IEEE/Springer publication-ready work</li>
          <li>eBooks and Books — Professional content, perfectly written</li>
          <li>Graphic Designing — All types of design solutions</li>
          <li>Flyers and Banners — Creative designs that stand out</li>
          <li>Website Development — Fast, responsive and modern websites</li>
          <li>Payment Integration — Secure and smooth payment systems</li>
          <li>Blog and CMS Setup — Manage content with ease</li>
          <li>Premium Certificates — Verified certificates from Google, Microsoft, Amazon and more</li>
          <li>Conference Support — Research, paper and presentation support</li>
        </ul>

        <h2>Why Choose CLAIRE</h2>
        <ul>
          <li>AI + Human synergy — Hybrid precision for every project</li>
          <li>On-time delivery — Zero delays guaranteed</li>
          <li>Affordable premium — Value driven pricing</li>
          <li>24/7 concierge — Always available support</li>
        </ul>

        <h2>Pricing Plans</h2>
        <ul>
          <li>Starter Package — ₹4,799 — 1-3 page website, responsive design, basic SEO</li>
          <li>Growth Package — ₹8,799 — 5-8 page custom website, WhatsApp integration, speed optimization + SEO, 2 weeks free support</li>
          <li>Premium Package — ₹17,599 — Advanced features + payment gateway, custom admin panel, Blog/CMS setup, 24/7 priority support</li>
        </ul>

        <h2>Contact CLAIRE</h2>
        <p>Phone: +91 63543 15878 | WhatsApp: +91 63543 15878 | Instagram: @claireworld.lol</p>
        <p>Location: Vadodara, Gujarat, India</p>
        <p>Website: <a href="https://www.claireworld.lol">www.claireworld.lol</a></p>
      </article>

      <HomeClient />
    </>
  );
}
