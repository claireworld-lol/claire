import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
        <div>
          <span className="logo-text" style={{ fontSize: '1.5rem' }}>CLAIRE</span>
          <br />
          <span style={{ fontSize: '0.7rem' }}>© {new Date().getFullYear()} — Academic &amp; Creative Partner</span>
          <br />
          <span style={{ fontSize: '0.7rem', color: 'var(--text-soft)' }}>Vadodara, Gujarat, India</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+916354315878" style={{ color: '#2563eb' }} aria-label="Call CLAIRE">
            <i className="fa-solid fa-phone" aria-hidden="true"></i> +91 63543 15878
          </a>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <a
            href="https://wa.me/916354315878"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#25d366' }}
            aria-label="Chat on WhatsApp"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
          </a>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <a
            href="https://instagram.com/claireworld.lol"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
            aria-label="CLAIRE on Instagram"
          >
            <i className="fa-brands fa-instagram" aria-hidden="true"></i> Instagram
          </a>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <Link href="/admin" style={{ color: 'var(--text-soft)', fontSize: '0.85rem' }}>
            <i className="fa-solid fa-lock" aria-hidden="true"></i> Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
