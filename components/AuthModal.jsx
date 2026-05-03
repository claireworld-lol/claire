'use client';

import { useState } from 'react';
import { useFirebase } from './FirebaseProvider';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const { auth } = useFirebase();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) { setError('Email and password required'); return; }
    if (isSignup && !name) { setError('Full name required'); return; }

    setError('');
    setLoading(true);

    try {
      let userCred;
      if (isSignup) {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });
      } else {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess?.(userCred.user);
      onClose();
      setEmail(''); setPassword(''); setName(''); setError('');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAuth();
  };

  return (
    <div
      className={`modal-overlay${isOpen ? ' active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 id="auth-modal-title" style={{ fontWeight: 700 }}>
            {isSignup ? 'Create account' : 'Welcome back'}
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
        <p style={{ color: '#475569', marginBottom: '20px' }}>
          {isSignup ? 'Join CLAIRE to unlock premium services' : 'Sign in to continue to checkout'}
        </p>

        {isSignup && (
          <input
            type="text"
            className="modal-input"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}
        <input
          type="email"
          className="modal-input"
          placeholder="Email address"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          className="modal-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="btn-primary"
          style={{ width: '100%', margin: '12px 0' }}
          onClick={handleAuth}
          disabled={loading}
        >
          {loading ? 'Processing...' : (isSignup ? 'Sign up' : 'Sign in')}
        </button>

        {error && (
          <p style={{ color: '#e11d48', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span>{isSignup ? 'Already a member?' : 'No account yet?'} </span>
          <button
            onClick={() => { setIsSignup(!isSignup); setError(''); }}
            style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}
