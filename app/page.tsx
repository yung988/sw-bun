'use client';

import { useEffect, useState } from 'react';
import AnimationProvider from '@/components/providers/AnimationProvider';
import ModalProvider from '@/components/providers/ModalProvider';
import { useModal } from '@/components/providers/ModalContext';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PhilosophySection from '@/components/sections/PhilosophySection';
import FounderSection from '@/components/sections/FounderSection';
import FAQSection from '@/components/sections/FAQSection';
import GallerySection from '@/components/sections/GallerySection';
import GiftCardsSection from '@/components/sections/GiftCardsSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import InstagramSection from '@/components/sections/InstagramSection';
import Footer from '@/components/layout/Footer';

function HomeContent() {
  const { openModal } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (window as any).isModalOpen = isModalOpen;
  }, [isModalOpen]);

  return (
    <>
      <Navbar />
      <HeroSection onOpenBooking={() => { setIsModalOpen(true); openModal('booking'); }} />
      <ServicesSection
        onOpenPriceList={() => { setIsModalOpen(true); openModal('price-list'); }}
        onOpenServiceDetail={(id) => { setIsModalOpen(true); openModal('service-detail', { serviceId: id }); }}
      />
      <PhilosophySection />
      <FounderSection />
      <FAQSection />
      <GallerySection />
      <GiftCardsSection onOpenGiftCard={() => { setIsModalOpen(true); openModal('gift-card'); }} />
      <ReviewsSection />
      <InstagramSection />
      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <AnimationProvider>
      <ModalProvider>
        <LoadingScreen />
        <HomeContent />
      </ModalProvider>
    </AnimationProvider>
  );
}