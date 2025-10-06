# 🚀 Plán dokončení a spuštění SW Beauty webu

## 📊 Současný stav
- ✅ Tailwind 4 migrace hotová
- ✅ Build funguje (175 kB)
- ✅ Dark mode odstraněn
- ✅ 55 souborů (komponenty + stránky)
- ✅ Základní SEO metadata
- ✅ Booking API připravené

## 🔴 Kritické problémy k řešení

### 1. **Optimalizace obrázků** (PRIORITA 1)
- ❌ PNG obrázky 1.8-2.3 MB (!!)
- ❌ Logo 547 KB SVG
- **Akce:**
  - Převést PNG → WebP/AVIF
  - Optimalizovat SVG logo
  - Použít Next.js Image optimization
  - **Očekávaný výsledek:** 90% úspora velikosti

### 2. **SEO & Metadata** (PRIORITA 1)
- ⚠️  Chybí metadata na podstránkách
- ⚠️  Chybí strukturovaná data (Schema.org)
- ⚠️  Chybí meta description na detailech služeb
- **Akce:**
  - Přidat metadata do každé stránky
  - Přidat JSON-LD structured data
  - Přidat Open Graph images

### 3. **Konfigurace & ENV** (PRIORITA 1)
- ❌ Chybí .env.example
- ❌ Chybí RESEND_API_KEY dokumentace
- **Akce:**
  - Vytvořit .env.example
  - Dokumentovat všechny ENV proměnné

### 4. **Performance** (PRIORITA 2)
- ⚠️  Velké CSS bundle kvůli Tailwind
- ⚠️  Možná duplikace stylů
- **Akce:**
  - Purge unused CSS
  - Lazy load komponent
  - Implementovat loading states

### 5. **Funkčnost** (PRIORITA 2)
- ❓ Booking formulář - testovat
- ❓ Email notifikace - otestovat Resend
- ❓ Instagram feed - API klíč?
- **Akce:**
  - Otestovat celý booking flow
  - Nastavit Resend + test email

### 6. **Content** (PRIORITA 3)
- ⚠️  Kontrola textů (překlepy?)
- ⚠️  Kontrola cen v ceníku
- ⚠️  Kontrola kontaktních údajů
- **Akce:**
  - Content review
  - Validace dat v CSV

### 7. **Analytics & Monitoring** (PRIORITA 3)
- ❌ Chybí Google Analytics
- ❌ Chybí error monitoring (Sentry?)
- **Akce:**
  - Přidat GA4/Plausible
  - Přidat error tracking

### 8. **Legal & GDPR** (PRIORITA 1)
- ❌ Chybí Cookie consent
- ❌ Chybí GDPR prohlášení
- ❌ Chybí Obchodní podmínky
- **Akce:**
  - Přidat cookie banner
  - Přidat právní stránky

### 9. **Testing** (PRIORITA 2)
- ❌ Žádné testy
- ❌ Netestováno na mobilech
- **Akce:**
  - Manuální testing na všech zařízeních
  - Otestovat všechny formuláře

### 10. **Deployment** (PRIORITA 1)
- ❌ Není nastavený hosting
- ❌ Není nastavená doména
- **Akce:**
  - Nastavit Vercel/Netlify
  - Připojit doménu swbeauty.cz
  - Nastavit SSL

## 📝 Doporučený postup (3-5 dní)

### Den 1: Kritické opravy
1. Optimalizace obrázků (2h)
2. Přidání metadat na všechny stránky (2h)
3. ENV konfigurace + dokumentace (1h)
4. GDPR stránky + cookie consent (2h)

### Den 2: Funkčnost & Testing
1. Test booking formuláře + Resend (2h)
2. Oprava bugů (2h)
3. Manuální testing na mobilech (2h)
4. Content review (1h)

### Den 3: Deployment & Monitoring
1. Setup Vercel deployment (1h)
2. Připojení domény (1h)
3. Přidání analytics (1h)
4. Finální testing na produkci (2h)

## ✅ Checklist před spuštěním

- [ ] Všechny obrázky optimalizované
- [ ] SEO metadata na všech stránkách
- [ ] Booking formulář funguje
- [ ] Email notifikace fungují
- [ ] Cookie consent + GDPR
- [ ] Testováno na mobilech
- [ ] Google Analytics připojené
- [ ] Doména připojená + SSL
- [ ] Error monitoring aktivní
- [ ] Backup plán připravený

## 📈 Metriky úspěchu
- **Performance:** Lighthouse score > 90
- **SEO:** Lighthouse score > 95
- **Accessibility:** Lighthouse score > 90
- **First Load:** < 200 kB
- **LCP:** < 2.5s
- **CLS:** < 0.1

## 🎯 Co můžeme udělat teď?
Řekni mi, kde chceš začít:
1. **Optimalizace obrázků** (nejvíc urgentnÍ)
2. **SEO & Metadata**
3. **GDPR & Legal**
4. **Testing & Deployment**
