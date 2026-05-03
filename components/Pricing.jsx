'use client';

import { useFirebase } from './FirebaseProvider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import FadeIn from './FadeIn';

const plans = [
  {
    name: 'Testing', price: '1', desc: 'Test Package',
    subtitle: 'Live payment test',
    oldPrice: '₹10', discount: '-90%',
    features: ['Tests Razorpay flow', 'Verifies Firestore sync'],
  },
  {
    name: 'Starter', price: '4799', desc: 'Starter Package',
    subtitle: 'Essential web presence',
    oldPrice: '₹5,999', discount: '-20%',
    features: ['1-3 page website', 'Responsive design', 'Basic SEO'],
  },
  {
    name: 'Growth', price: '8799', desc: 'Growth Package',
    subtitle: 'Best for growing brands', popular: true,
    oldPrice: '₹10,999', discount: '-20%',
    features: ['5-8 page custom website', 'WhatsApp integration', 'Speed optimization + SEO', '2 weeks free support'],
  },
  {
    name: 'Premium', price: '17599', desc: 'Premium Package',
    subtitle: 'Full-scale business suite',
    oldPrice: '₹21,999', discount: '-20%',
    features: ['Advanced features + payment gateway', 'Custom admin panel', 'Blog/CMS setup', '24/7 priority support'],
  },
];

export default function Pricing({ onLoginClick }) {
  const { user, db } = useFirebase();

  async function handleSelectPlan(plan) {
    if (!user) {
      onLoginClick(plan);
      return;
    }
    await startPayment(plan);
  }

  async function startPayment(plan) {
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: plan.price, planName: plan.name }),
      });

      if (!res.ok) throw new Error('Order creation failed');
      const { orderId, amount, currency } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency,
        name: 'CLAIRE Studio',
        description: plan.desc,
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const { verified } = await verifyRes.json();

            if (verified) {
              await addDoc(collection(db, 'payments'), {
                uid: user.uid,
                userName: user.displayName || user.email,
                userEmail: user.email,
                planName: plan.name,
                amount: plan.price,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                timestamp: serverTimestamp(),
                status: 'Completed',
              });
              alert('✅ Payment successful! We\'ll reach out within 24h.');
            } else {
              alert('⚠️ Payment verification failed. Please contact support.');
            }
          } catch (e) {
            console.error(e);
            alert('Payment recorded. Contact support for verification.');
          }
        },
        prefill: { name: user.displayName || '', email: user.email },
        theme: { color: '#2563eb' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Could not initiate payment. Please try again.');
    }
  }

  return (
    <section className="section" id="pricing" aria-labelledby="pricing-heading">
      <FadeIn>
        <h2 className="section-title" id="pricing-heading">Plans crafted for scale</h2>
      </FadeIn>
      <div className="pricing-wrapper">
        {plans.map((plan, i) => (
          <FadeIn key={plan.name} delay={i * 100} direction="up">
            <div className={`pricing-card${plan.popular ? ' popular' : ''}`}>
              {plan.popular && (
                <div style={{
                  background: '#2563eb20', borderRadius: '60px', padding: '4px 12px',
                  fontSize: '0.7rem', display: 'inline-block', marginBottom: '10px',
                }}>
                  ⭐ MOST POPULAR
                </div>
              )}
              <h3>{plan.name}</h3>
              <p style={{ color: '#64748b' }}>{plan.subtitle}</p>
              <div>
                <span className="old-price">{plan.oldPrice}</span>
                <span style={{ fontWeight: 700 }}>{plan.discount}</span>
              </div>
              <div className="price-num">₹{Number(plan.price).toLocaleString('en-IN')}</div>
              <ul style={{ listStyle: 'none', margin: '20px 0' }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ marginBottom: '8px' }}>
                    <i className="fa-regular fa-circle-check" style={{ color: '#2563eb', marginRight: '8px' }} aria-hidden="true"></i>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.name === 'Testing' ? 'Test Payment' : 'Select plan'}
              </button>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
