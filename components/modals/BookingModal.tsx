'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useModal } from '../providers/ModalProvider';
import { Service, Price, loadData } from '@/lib/data';
import PhoneInput from '../ui/PhoneInput';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BookingModalProps {
  initialData?: {
    serviceId?: string;
    packageName?: string;
    price?: string;
  };
}

export default function BookingModal({ initialData }: BookingModalProps) {
  const { closeModal } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Price | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const load = async () => {
      const { services, prices } = await loadData();
      setServices(services);
      setPrices(prices);

      // Pokud přicházíme z ServiceDetailModal s předvybranými daty
      if (initialData?.serviceId && initialData?.packageName && !isInitialized) {
        const foundService = services.find(s => s.service_id === initialData.serviceId);
        const foundPackage = prices.find(p =>
          p.service_id === initialData.serviceId && p.name === initialData.packageName
        );

        if (foundService && foundPackage) {
          setSelectedService(foundService);
          setSelectedPackage(foundPackage);
          setCurrentStep(3); // Přeskočit na výběr termínu
        }
        setIsInitialized(true);
      }
    };
    load();

    // Lock body scroll (better iOS support)
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [initialData, isInitialized]);

  const getTomorrowDate = (): Date => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/booking-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService?.category_name,
          packageName: selectedPackage?.name,
          date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
          time: selectedTime,
          name,
          email,
          phone,
          note
        }),
      });
      if (res.ok) {
        alert('Rezervace odeslána! Brzy vám zavoláme s potvrzením.');
        closeModal();
      } else {
        const data = await res.json();
        alert(data.error || 'Chyba při odesílání rezervace. Zkuste to prosím znovu.');
      }
    } catch (error) {
      alert('Chyba při odesílání rezervace. Zkuste to prosím znovu.');
    }
  };

  const servicePrices = selectedService
    ? prices.filter(p => p.service_id === selectedService.service_id)
    : [];

  const steps = ['Služba', 'Balíček', 'Termín', 'Kontakt'];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 isolate"
      onClick={closeModal}
    >
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />

      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] shadow-2xl relative animate-fade-in-up overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-6 pb-4 border-b border-stone-100">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-cormorant text-stone-900">Rezervace termínu</h2>
            <button onClick={closeModal} className="text-stone-400 hover:text-stone-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          {/* Progress bar */}
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < currentStep ? 'bg-stone-900' : 'bg-stone-200'}`} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain p-6 touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch' }}
          data-lenis-prevent
        >

          {/* Step 1: Služby */}
          {currentStep === 1 && (
            <div>
              <p className="text-sm text-stone-500 text-center mb-6 font-geist">Vyberte si službu, která odpovídá vašim požadavkům</p>
              <h3 className="text-lg font-medium text-stone-900 mb-4">Vyberte službu</h3>
              <div className="grid grid-cols-2 gap-3">
                {services.map(service => {
                  const svcPrices = prices.filter(p => p.service_id === service.service_id);
                  const minPrice = svcPrices.length > 0 ? Math.min(...svcPrices.map(p => parseInt(p.price_in_czk))) : null;
                  const isSelected = selectedService?.service_id === service.service_id;

                  return (
                    <button
                      key={service.service_id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 text-left border transition-all ${isSelected ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-400'}`}
                    >
                      <div className="font-medium text-stone-900 mb-1">{service.category_name}</div>
                      <div className="text-xs text-stone-500 mb-2 line-clamp-1">{service.short_description}</div>
                      {minPrice && <div className="text-xs text-stone-500">od {minPrice.toLocaleString()} Kč</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Balíčky */}
          {currentStep === 2 && selectedService && (
            <div>
              <p className="text-sm text-stone-500 text-center mb-6 font-geist">Vyberte balíček, který vám vyhovuje</p>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-stone-900">{selectedService.category_name}</h3>
                <button
                  onClick={() => { setSelectedService(null); setSelectedPackage(null); setCurrentStep(1); }}
                  className="text-xs text-stone-500 hover:text-stone-900 font-geist uppercase tracking-wider"
                >
                  ← Změnit službu
                </button>
              </div>
              <div className="space-y-2">
                {servicePrices.map(pkg => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <button
                      key={pkg.name}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`w-full p-4 border transition-all cursor-pointer hover:border-stone-400 text-left ${isSelected ? 'border-stone-900 bg-stone-50' : 'border-stone-200'}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div className="flex-1 min-w-0">
                          <span className="text-stone-900 block sm:inline">{pkg.name}</span>
                          {pkg.duration_in_minutes && (
                            <span className="text-stone-400 text-sm ml-0 sm:ml-2 block sm:inline">({pkg.duration_in_minutes} min)</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0">
                          <span className="text-stone-900 font-medium whitespace-nowrap">{parseInt(pkg.price_in_czk).toLocaleString()} Kč</span>
                          <span
                            className={`text-xs uppercase tracking-wider font-geist whitespace-nowrap ${isSelected ? 'text-stone-900 font-medium' : 'text-stone-500'}`}
                          >
                            {isSelected ? '✓ Vybráno' : 'Vybrat'}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Termín */}
          {currentStep === 3 && (
            <div>
              <p className="text-sm text-stone-500 text-center mb-6 font-geist">Vyberte termín, který vám vyhovuje</p>

              {/* Zobrazení vybrané služby a balíčku */}
              {selectedService && selectedPackage && (
                <div className="mb-6 p-4 bg-stone-50 border border-stone-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-stone-400 font-geist">Vybraná služba</span>
                      <h4 className="text-lg font-cormorant text-stone-900 mt-1">{selectedService.category_name}</h4>
                      <p className="text-sm text-stone-600 font-geist">{selectedPackage.name}</p>
                      {selectedPackage.duration_in_minutes && (
                        <span className="text-xs text-stone-400">({selectedPackage.duration_in_minutes} min)</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-medium text-stone-900">{parseInt(selectedPackage.price_in_czk).toLocaleString()} Kč</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="mt-3 text-xs text-stone-500 hover:text-stone-900 font-geist uppercase tracking-wider"
                  >
                    ← Změnit službu
                  </button>
                </div>
              )}

              <h3 className="text-lg font-medium text-stone-900 mb-4">Vyberte termín</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-geist">Datum</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-geist h-12 px-4 border-stone-200 hover:border-stone-900 hover:bg-transparent ${
                          !selectedDate ? 'text-stone-400' : 'text-stone-900'
                        }`}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 text-stone-400" />
                        {selectedDate ? format(selectedDate, 'd. M. yyyy', { locale: cs }) : 'Vyberte datum'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border-stone-200" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < getTomorrowDate()}
                        locale={cs}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-geist">Čas</label>
                  <div className="flex flex-wrap gap-2">
                    {times.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2.5 border text-sm font-geist transition-all ${selectedTime === time
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'border-stone-200 hover:border-stone-900 text-stone-900'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Kontakt */}
          {currentStep === 4 && (
            <div>
              <p className="text-sm text-stone-500 text-center mb-6 font-geist">Zanechte nám prosím své kontaktní údaje</p>
              <h3 className="text-lg font-medium text-stone-900 mb-4">Kontaktní údaje</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-geist">Jméno a příjmení</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jana Nováková"
                    className="w-full p-3 border border-stone-200 font-geist focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-geist">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jana@example.com"
                    className="w-full p-3 border border-stone-200 font-geist focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-geist">Telefon</label>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-geist">Poznámka (volitelné)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-stone-200 font-geist focus:outline-none focus:border-stone-900 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex-shrink-0 p-6 pt-4 border-t border-stone-100 flex justify-between items-center"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
        >
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="text-sm text-stone-500 hover:text-stone-900 font-geist uppercase tracking-wider"
            >
              Zpět
            </button>
          ) : <div />}

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={
                (currentStep === 1 && !selectedService) ||
                (currentStep === 2 && !selectedPackage) ||
                (currentStep === 3 && (!selectedDate || !selectedTime))
              }
              className="px-6 py-3 bg-stone-900 text-white font-geist uppercase tracking-wider text-sm hover:bg-stone-800 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              Pokračovat
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!name || !email || !phone}
              className="px-6 py-3 bg-stone-900 text-white font-geist uppercase tracking-wider text-sm hover:bg-stone-800 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              Odeslat rezervaci
            </button>
          )}
        </div>
      </div>
    </div>
  );
}