'use client';

import { useState, useCallback } from 'react';
import { useFirebase } from './FirebaseProvider';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Pricing from './Pricing';
import WhyClaire from './WhyClaire';
import Footer from './Footer';
import AuthModal from './AuthModal';

export default function HomeClient() {
  const { user } = useFirebase();
  const [showModal, setShowModal] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(null);

  const handleLoginClick = useCallback((plan = null) => {
    setPendingPlan(plan);
    setShowModal(true);
  }, []);

  const handleAuthSuccess = useCallback((authUser) => {
    if (pendingPlan) {
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
    setPendingPlan(null);
  }, [pendingPlan]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setPendingPlan(null);
  }, []);

  return (
    <>
      <div className="glass-orb orb-1" aria-hidden="true"></div>
      <div className="glass-orb orb-2" aria-hidden="true"></div>

      <Navbar onLoginClick={() => handleLoginClick(null)} />

      <main>
        <Hero onLoginClick={() => handleLoginClick(null)} />
        <Services />
        <Pricing onLoginClick={handleLoginClick} />
        <WhyClaire />
      </main>

      <Footer />

      <AuthModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
