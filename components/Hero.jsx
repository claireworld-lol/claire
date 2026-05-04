'use client';

import FadeIn from './FadeIn';
import { useFirebase } from './FirebaseProvider';

export default function Hero({ onLoginClick }) {
  const { user } = useFirebase();

  const handleCta = () => {
    if (user) {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onLoginClick();
    }
  };

  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">
          Where ideas meet<br />
          <span className="gradient-text">precision &amp; elegance</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', margin: '20px 0 15px' }}>
          Premium academic, creative &amp; development solutions — powered by AI &amp; human expertise.
        </p>
        <div className="features-grid">
          {[
            { icon: 'fa-regular fa-clock', text: 'On-time delivery' },
            { icon: 'fa-regular fa-star', text: 'High quality' },
            { icon: 'fa-solid fa-headset', text: '24/7 support' },
            { icon: 'fa-regular fa-gem', text: 'AI + human hybrid' },
          ].map((f, i) => (
            <FadeIn key={f.text} delay={100 + i * 100} direction="up">
              <div className="feat-pill">
                <i className={f.icon} aria-hidden="true"></i> {f.text}
              </div>
            </FadeIn>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
          <button className="btn-primary" id="hero-cta" onClick={handleCta}>
            Begin journey <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
          <a
            href="https://instagram.com/claireworld.lol"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
              background: '#f1f5f9', padding: '10px 22px', borderRadius: '40px',
              color: 'var(--text-dark)', transition: '0.2s',
            }}
            aria-label="Visit CLAIRE on Instagram"
          >
            <i className="fa-brands fa-instagram" style={{ color: '#bc1888' }} aria-hidden="true"></i>
            @claireworld.lol
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="mockup-card glass-panel">
          <i className="fa-regular fa-file-lines" style={{ fontSize: '2rem', color: '#2563eb' }} aria-hidden="true"></i>
          <h3 style={{ margin: '12px 0' }}>Projects, Papers &amp; Websites</h3>
          <p style={{ color: '#475569' }}>From research papers to full-stack platforms</p>
          <div style={{
            width: '100%', height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
            borderRadius: '10px', margin: '20px 0 10px',
          }}></div>
          <span style={{ fontSize: '0.8rem' }}>Trusted by 500+ clients</span>
        </div>
      </div>
    </section>
  );
}
