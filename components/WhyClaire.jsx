import FadeIn from './FadeIn';

const items = [
  { icon: 'fa-solid fa-microchip', title: 'AI + Human synergy', desc: 'Hybrid precision' },
  { icon: 'fa-regular fa-calendar-check', title: 'On-time delivery', desc: 'Zero delays' },
  { icon: 'fa-regular fa-gem', title: 'Affordable premium', desc: 'Value driven' },
  { icon: 'fa-regular fa-message', title: '24/7 concierge', desc: 'Always available' },
];

export default function WhyClaire() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <FadeIn>
        <h2 className="section-title" id="why-heading" style={{ marginBottom: '36px' }}>Why choose CLAIRE</h2>
      </FadeIn>
      <div className="why-grid">
        {items.map((item, i) => (
          <FadeIn key={item.title} delay={50 + i * 100} direction="up">
            <div className="why-card glass-panel">
              <i className={item.icon} style={{ fontSize: '2rem', color: '#2563eb', marginBottom: '10px', display: 'block' }} aria-hidden="true"></i>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
