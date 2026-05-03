'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';

export default function AdminClient() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    setTableLoading(true);
    const q = query(collection(db, 'payments'), orderBy('timestamp', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPayments(data);
      setTableLoading(false);
    }, () => {
      setTableLoading(false);
      setError('Permission denied. Ensure your UID matches Firestore rules.');
    });
    return () => unsub();
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) { setError('Please enter email and password.'); return; }
    setLoginLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError('Invalid credentials or unauthorized access.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setEmail('');
    setPassword('');
    setPayments([]);
  };

  if (loading) return null;

  return (
    <>
      <div className="glass-orb orb-1" aria-hidden="true"></div>
      <div className="glass-orb orb-2" aria-hidden="true"></div>

      <nav className="navbar">
        <div>
          <span className="logo-text">CLAIRE <span style={{ color: '#2563eb' }}>ADMIN</span></span>
        </div>
        <div>
          <Link href="/" className="btn-outline" style={{ textDecoration: 'none', padding: '8px 22px' }}>
            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to Site
          </Link>
        </div>
      </nav>

      <div className="admin-wrapper">
        {!user ? (
          <div className="glass-panel login-card">
            <i className="fa-solid fa-shield-halved" style={{ fontSize: '3rem', color: '#2563eb', marginBottom: '20px', display: 'block' }} aria-hidden="true"></i>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>Admin Portal</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>Sign in to access transaction records.</p>
            <input
              type="email"
              className="admin-input"
              placeholder="Admin Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <input
              type="password"
              className="admin-input"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              className="btn-primary"
              style={{ width: '100%', marginTop: '15px', padding: '14px' }}
              onClick={handleLogin}
              disabled={loginLoading}
            >
              {loginLoading ? 'Signing in...' : 'Sign In securely'}
            </button>
            {error && <p style={{ color: '#e11d48', marginTop: '15px', fontSize: '0.9rem', fontWeight: 500 }}>{error}</p>}
          </div>
        ) : (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-dark)' }}>Payment Records</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Real-time transaction history.</p>
              </div>
              <button className="btn-outline" style={{ background: 'white' }} onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt" aria-hidden="true"></i> Logout
              </button>
            </div>

            <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date &amp; Time</th>
                      <th>Client Name</th>
                      <th>Email Address</th>
                      <th>Purchased Plan</th>
                      <th>Amount</th>
                      <th>Payment ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableLoading ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '50px', fontWeight: 500, color: 'var(--accent-primary)' }}>
                          <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Loading...
                        </td>
                      </tr>
                    ) : payments.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                          No transaction records found.
                        </td>
                      </tr>
                    ) : (
                      payments.map((p) => (
                        <tr key={p.id}>
                          <td style={{ fontWeight: 500, color: '#334155' }}>
                            {p.timestamp?.toDate ? p.timestamp.toDate().toLocaleString('en-IN', {
                              day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            }) : 'Just now'}
                          </td>
                          <td><strong style={{ color: '#0f172a' }}>{p.userName}</strong></td>
                          <td>{p.userEmail}</td>
                          <td><span className="plan-badge">{p.planName}</span></td>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>₹{p.amount}</td>
                          <td style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '0.85rem' }}>{p.paymentId}</td>
                          <td><span className="status-badge"><i className="fa-solid fa-check" aria-hidden="true"></i> {p.status}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
