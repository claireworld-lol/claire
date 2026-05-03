'use client';

import { useFirebase } from './FirebaseProvider';
import { signOut } from 'firebase/auth';

export default function Navbar({ onLoginClick }) {
  const { auth, user } = useFirebase();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div>
        <span className="logo-text">CLAIRE</span>
        <div className="badge-sub">academic · creative · dev</div>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {!user ? (
          <button
            id="nav-login-btn"
            className="btn-outline"
            style={{ padding: '8px 22px' }}
            onClick={onLoginClick}
            aria-label="Sign in to your account"
          >
            <i className="fa-regular fa-user" aria-hidden="true"></i> Login
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span style={{ fontWeight: 500, color: '#2563eb' }}>
              👋 {user.displayName ? user.displayName.split(' ')[0] : user.email.split('@')[0]}
            </span>
            <button
              onClick={handleLogout}
              style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              aria-label="Sign out"
            >
              <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
