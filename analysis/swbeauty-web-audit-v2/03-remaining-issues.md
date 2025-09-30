# Zbývající problémy - SW Beauty V2

**Datum analýzy:** 30. září 2025  
**Projekt:** swbeauty-bun

---

## 1. Střední priority problémy

### 1.1 Formuláře stále používají mailto (Původně 🟡 → stále 🟡)
**Problém:**
- Kontakt, Voucher a Subscribe formuláře používají `mailto:` protokol
- Žádný backend pro zpracování zpráv
- Žádná email notifikace pro majitele
- Žádná databáze pro ukládání zpráv
- Žádná CAPTCHA (spam protection)

**Dopad:**
- Uživatelé musí mít nastavený email klient
- Žádné záznamy o zprávách
- Potenciální ztráta leadů
- Žádná automatizace

**Řešení:**
1. **Formspree** (doporučeno) - 2 hodiny
   ```bash
   npm install @formspree/react
   ```
2. **Netlify Forms** - 1 hodina (pokud deploy na Netlify)
3. **Custom backend** - 8 hodin (Node.js/Next.js API)

**Priorita:** VYSOKÁ - business kritické pro získávání klientů

---

### 1.2 Chybí error boundaries (Původně 🟢 → stále 🟢)
**Problém:**
- Žádné error boundaries komponenty
- React errors mohou crashnout celou aplikaci
- Špatná uživatelská zkušenost při chybách

**Dopad:**
- Potenciální crash aplikace
- Špatná UX při runtime chybách
- Žádný fallback pro error stavy

**Řešení:**
```typescript
// src/components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Něco se pokazilo. Zkuste to znovu.</h1>;
    }

    return this.props.children;
  }
}
```

**Čas:** 1 hodina
**Priorita:** STŘEDNÍ

---

### 1.3 Neoptimalizované obrázky (Původně 🟡 → stále 🟡)
**Problém:**
- Obrázky nejsou komprimované pro web
- Potenciálně velké file sizes
- Žádná WebP konverze mimo Next.js

**Aktuální stav:**
- Next.js Image komponenta automaticky optimalizuje
- Responsive images s různými velikostmi
- Lazy loading

**Dopad:**
- Pomalnější loading times
- Vyšší bandwidth usage
- Horší Core Web Vitals

**Řešení:**
1. **ImageOptim** nebo **TinyPNG** - zkomprimovat existující obrázky (2 hodiny)
2. **Next.js Image optimization** - již implementováno
3. **WebP generation** - Next.js automaticky

**Priorita:** STŘEDNÍ

---

## 2. Nízká priority problémy

### 2.1 Chybí analytics (Původně 🟢 → stále 🟢)
**Problém:**
- Žádný tracking uživatelského chování
- Žádné conversion měření
- Žádná data pro optimalizaci

**Dopad:**
- Nemožnost měřit efektivitu webu
- Žádná data pro A/B testování
- Slepé rozhodování o změnách

**Řešení:**
1. **Google Analytics 4** - 30 minut
   ```typescript
   // src/components/GoogleAnalytics.tsx
   import Script from 'next/script'
   export default function GoogleAnalytics() {
     return (
       <>
         <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
         <Script id="google-analytics">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', 'GA_MEASUREMENT_ID');
           `}
         </Script>
       </>
     )
   }
   ```
2. **Plausible Analytics** - 15 minut (privacy-friendly)
3. **Custom analytics** - 4 hodiny

**Priorita:** NÍZKÁ (nice-to-have)

---

### 2.2 Blog články stále hardcoded (Původně 🟢 → stále 🟢)
**Problém:**
- 3 blog články jsou statické JSX
- Žádný CMS pro správu obsahu
- Těžká editace pro klienta

**Dopad:**
- Nemožnost přidávat nové články bez developer intervence
- Žádná WYSIWYG editace
- Statický obsah

**Řešení:**
1. **Markdown files** + next-mdx-remote - 4 hodiny
2. **Sanity CMS** - 8 hodin (headless CMS)
3. **Strapi** - 12 hodin (self-hosted CMS)
4. **Contentful** - 6 hodin (cloud CMS)

**Priorita:** NÍZKÁ (blog není core business)

---

### 2.3 Legal links v footeru nefunkční (Původně 🟢 → stále 🟢)
**Problém:**
- Footer má legal links (#) které nikam nevedou
- Chybí stránky pro Obchodní podmínky, Ochrana osobních údajů

**Dopad:**
- Neprofesionální vzhled
- Potenciální právní problémy
- Špatná user experience

**Řešení:**
1. **Vytvořit statické stránky** - 2 hodiny
   - `/obchodni-podminky`
   - `/ochrana-osobnich-udaju`
   - `/cookies`
2. **Externí právní texty** - 1 hodina (copy-paste)

**Priorita:** NÍZKÁ (cosmetic issue)

---

### 2.4 Chybí loading states pro API volání (Původně 🟢 → stále 🟢)
**Problém:**
- Ceník stránka fetchuje data bez loading indicatoru
- Služby stránky fetchují ceny bez loading stavu

**Dopad:**
- Špatná UX při pomalém internetu
- Uživatelé neví, že se data načítají

**Řešení:**
```typescript
// src/components/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
    </div>
  )
}

// Použití v komponentách
const [loading, setLoading] = useState(true)
```

**Čas:** 1 hodina
**Priorita:** NÍZKÁ

---

## 3. Technické dluhy

### 3.1 Metadata warningy (Původně ❌ → stále ⚠️)
**Problém:**
- Next.js warning: "metadata export should be type of Metadata from next"
- Některé stránky mají tento warning

**Dopad:**
- Neovlivňuje funkcionalnost
- Nepříjemné v konzoli

**Řešení:**
```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  // správný typ
}
```

**Čas:** 30 minut
**Priorita:** NÍZKÁ

---

### 3.2 Nepoužitý import v homepage (Původně ❌ → stále ⚠️)
**Problém:**
- `Slide` typ je importován ale nepoužit
- Warning v konzoli

**Řešení:**
- Odstranit nepouzitý import
- Nebo použít typ pokud je potřeba

**Čas:** 5 minut
**Priorita:** NÍZKÁ

---

## 4. Prioritizace řešení

### 4.1 Kritické (MUST - business impact)
1. **Formuláře backend** - Ztráta leadů (8 hodin)
2. **Error boundaries** - Crash prevention (1 hodina)

### 4.2 Důležité (SHOULD - UX improvement)
1. **Optimalizovat obrázky** - Performance (2 hodiny)
2. **Loading states** - Lepší UX (1 hodina)

### 4.3 Nice-to-have (COULD - enhancement)
1. **Google Analytics** - Tracking (30 minut)
2. **Legal stránky** - Professionalismus (2 hodiny)
3. **CMS pro blog** - Content management (8 hodin)
4. **Metadata warningy** - Code quality (30 minut)

---

## 5. Rizika nevyřešených problémů

### 5.1 Vysoká rizika
- 🔴 **Formuláře bez backendu** - Ztráta potenciálních klientů
- 🔴 **Žádné error boundaries** - Možný crash aplikace

### 5.2 Střední rizika
- 🟡 **Neoptimalizované obrázky** - Pomalý loading
- 🟡 **Chybí loading states** - Špatná UX

### 5.3 Nízká rizika
- 🟢 **Chybí analytics** - Žádná data pro optimalizaci
- 🟢 **Blog hardcoded** - Statický obsah
- 🟢 **Legal links nefunkční** - Neprofesionální vzhled

---

## 6. Závěr

**Celkový stav problémů:**
- ✅ **Všechny kritické problémy z V1 vyřešeny**
- 🔄 **Zbývající problémy jsou převážně střední/nízká priorita**
- 📈 **Projekt se zlepšil z 7/10 na 9/10**

**Doporučený akční plán:**
1. **Krátkodobě (1 týden):** Formuláře backend + error boundaries
2. **Střednědobě (1 měsíc):** Optimalizace obrázků + loading states
3. **Dlouhodobě (3 měsíce):** Analytics + CMS + legal stránky

Projekt je nyní stabilní a profesionální, zbývající problémy jsou spíše vylepšení než kritické opravy.