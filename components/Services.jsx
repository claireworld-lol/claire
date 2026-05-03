import FadeIn from './FadeIn';

const services = [
  { icon: 'fa-solid fa-chart-pie', name: 'PPT & Presentations', desc: 'Stunning slides that make an impact' },
  { icon: 'fa-regular fa-file-alt', name: 'Reports & Assignments', desc: 'Well researched, well written' },
  { icon: 'fa-solid fa-code', name: 'Engineering Projects', desc: 'Diploma / BE complete project solutions' },
  { icon: 'fa-solid fa-search', name: 'Research & Conference Papers', desc: 'IEEE/Springer publication-ready work' },
  { icon: 'fa-solid fa-book', name: 'eBooks & Books', desc: 'Professional content, perfectly written' },
  { icon: 'fa-solid fa-paint-brush', name: 'Graphic Designing', desc: 'All types of design solutions' },
  { icon: 'fa-regular fa-image', name: 'Flyers & Banners', desc: 'Creative designs that stand out' },
  { icon: 'fa-solid fa-globe', name: 'Website Development', desc: 'Fast, responsive & modern websites' },
  { icon: 'fa-regular fa-credit-card', name: 'Payment Integration', desc: 'Secure & smooth payment systems' },
  { icon: 'fa-solid fa-cogs', name: 'Blog & CMS Setup', desc: 'Manage content with ease' },
  { icon: 'fa-solid fa-certificate', name: 'Premium Certificates', desc: 'Verified certificates from Google, Microsoft, Amazon & more' },
  { icon: 'fa-solid fa-users', name: 'Conference Support', desc: 'Research, paper & presentation support' },
];

export default function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-heading">
      <FadeIn>
        <h2 className="section-title" id="services-heading">Our Services</h2>
      </FadeIn>
      <div className="service-grid">
        {services.map((s, i) => (
          <FadeIn key={s.name} delay={50 + i * 40} direction="up">
            <div className="service-item">
              <i className={`${s.icon} service-icon`} aria-hidden="true"></i>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
