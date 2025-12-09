'use client';

import { useState, ReactNode } from 'react';
import { ModalContext, useModal } from './ModalContext';
import GiftCardModal from '../modals/GiftCardModal';
import BookingModal from '../modals/BookingModal';
import PriceListModal from '../modals/PriceListModal';
import ServiceDetailModal from '../modals/ServiceDetailModal';

type ModalType = 'gift-card' | 'booking' | 'price-list' | 'service-detail' | null;

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (type: ModalType, data?: any) => {
    setActiveModal(type);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {activeModal === 'gift-card' && <GiftCardModal />}
      {activeModal === 'booking' && <BookingModal initialData={modalData} />}
      {activeModal === 'price-list' && <PriceListModal onClose={closeModal} />}
      {activeModal === 'service-detail' && <ServiceDetailModal serviceId={modalData?.serviceId} onClose={closeModal} />}
    </ModalContext.Provider>
  );
}

export { useModal };