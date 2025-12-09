'use client';

import { useEffect, useState } from 'react';
import { useModal } from '../providers/ModalProvider';
import { Service, Price, loadData, getImageUrl } from '@/lib/data';

interface PriceListModalProps {
  onClose: () => void;
}

export default function PriceListModal({ onClose }: PriceListModalProps) {
  const { openModal } = useModal();
  const [services, setServices] = useState<Service[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const load = async () => {
      const { services, prices } = await loadData();
      setServices(services);
      setPrices(prices);
    };
    load();
  }, []);

  const filterPriceList = (category: string) => {
    setSelectedCategory(category);
  };

  const groupedPrices = prices.reduce((acc: any, price) => {
    if (!acc[price.service_id]) acc[price.service_id] = [];
    acc[price.service_id].push(price);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"></div>
      <div className="bg-white w-full h-full md:h-auto md:max-h-[85vh] md:max-w-3xl shadow-2xl flex flex-col relative animate-fade-in-up overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 md:px-8 py-4 md:py-6 border-b border-stone-100 flex justify-between items-center bg-white z-10">
          <h2 className="text-2xl md:text-3xl font-cormorant text-stone-900">Ceník služeb</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 md:px-8 lg:px-12 pb-6 md:pb-8 lg:pb-12" data-lenis-prevent>
          {/* Filter buttons */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 pb-4 mb-6 border-b border-stone-200 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => filterPriceList('all')} className={`px-4 py-2 text-xs uppercase tracking-widest font-geist border transition-colors ${selectedCategory === 'all' ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 hover:border-stone-900'}`}>
                Vše
              </button>
              {services.map(service => (
                <button
                  key={service.service_id}
                  onClick={() => filterPriceList(service.service_id)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-geist border transition-colors ${selectedCategory === service.service_id ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 hover:border-stone-900'}`}
                >
                  {service.category_name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-10 md:space-y-12 pb-24 md:pb-12">
            {Object.entries(groupedPrices).map(([serviceId, servicePrices]: [string, any]) => {
              const service = services.find(s => s.service_id === serviceId);
              if (!service) return null;
              if (selectedCategory !== 'all' && serviceId !== selectedCategory) return null;

              return (
                <div key={serviceId} className="price-category">
                  <h3
                    className="font-cormorant text-2xl text-stone-900 mb-6 border-b border-stone-100 pb-2 cursor-pointer hover:text-stone-600 transition-colors"
                    onClick={() => openModal('service-detail', { serviceId })}
                  >
                    {service.category_name}
                  </h3>
                  <div className="space-y-6 md:space-y-4">
                    {servicePrices.map((price: Price) => (
                      <div key={price.name} className="flex justify-between items-center gap-4 group">
                        <div className="flex-1 pr-4 cursor-pointer" onClick={() => openModal('service-detail', { serviceId })}>
                          <span className="font-geist text-stone-600 group-hover:text-stone-900 transition-colors text-sm md:text-base">
                            {price.name}
                          </span>
                          {price.duration_in_minutes && <span className="text-xs text-stone-400 ml-2">({price.duration_in_minutes} min)</span>}
                          {price.session && <span className="text-xs text-stone-400 ml-2">({price.session}x ošetření)</span>}
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="font-geist font-medium text-stone-900 text-sm md:text-base whitespace-nowrap">
                            {price.price_in_czk} Kč
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose();
                              openModal('booking', { serviceId, packageName: price.name, price: price.price_in_czk });
                            }}
                            className="px-3 py-1.5 text-xs uppercase tracking-widest font-geist border border-stone-300 text-stone-600 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all"
                          >
                            Rezervovat
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-center items-center z-10">
          <button
            onClick={() => { onClose(); openModal('booking'); }}
            className="text-stone-900 border-b border-stone-900 pb-0.5 hover:text-stone-600 hover:border-stone-600 transition-colors font-geist text-sm uppercase tracking-widest"
          >
            Rezervovat termín
          </button>
        </div>
      </div>
    </div>
  );
}