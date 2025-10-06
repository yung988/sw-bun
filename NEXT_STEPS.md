# 🚀 Další kroky k spuštění SW Beauty

## ✅ Hotovo (právě teď)
- [x] Tailwind 4 migrace
- [x] Dark mode odstraněn
- [x] Blog smazán
- [x] Služby reorganizovány (dynamické z CSV)
- [x] Ceník sloučen se službami
- [x] Navigace zjednodušena
- [x] Konverzní optimalizace (sticky CTA, social proof)
- [x] Homepage vyčištěna (10→6 sekcí)
- [x] GDPR + Provozní řád

## 🔴 URGENTNÍ (před spuštěním)

### 1. **Optimalizace obrázků** ⚡ PRIORITA #1
**Problém:** 11+ MB obrázků!
```
ostatni.png    2.3 MB
poukaz.png     2.2 MB
cosmetic.png   1.9 MB
ems.png        1.8 MB
cavitace.png   1.8 MB
logo.svg       548 KB
```

**Řešení:**
```bash
# Převést PNG → WebP/AVIF
# Optimalizovat SVG logo
# Použít Next.js Image s kvalitou 75-80
```

**Dopad:** 90% úspora = stránka 10x rychlejší

---

### 2. **ENV konfigurace** ⚡ PRIORITA #1
**Problém:** Chybí `.env` soubory
- Booking formulář nefunguje (chybí RESEND_API_KEY)
- Instagram feed nefunguje

**Řešení:**
```bash
# Vytvořit .env.local
RESEND_API_KEY=re_xxx
NEXT_PUBLIC_SITE_URL=https://swbeauty.cz

# Vytvořit .env.example pro dokumentaci
```

---

### 3. **Telefonní číslo & Email** ⚡ PRIORITA #1
**Problém:** Placeholder data v Footeru
```
+420 123 456 789  ← ZMĚNIT!
info@swbeauty.cz  ← OVĚŘIT!
```

**Akce:** Doplnit správné kontakty

---

## 🟡 DŮLEŽITÉ (první týden)

### 4. **Test booking flow**
- [ ] Nastavit Resend API
- [ ] Otestovat rezervační formulář
- [ ] Ověřit email notifikace
- [ ] Zkontrolovat všechny formuláře

### 5. **Content review**
- [ ] Zkontrolovat všechny texty (překlepy)
- [ ] Ověřit ceny v CSV
- [ ] Validovat služby (jsou všechny aktuální?)
- [ ] Zkontrolovat kontakty na všech stránkách

### 6. **Mobile testing**
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Tablet
- [ ] Všechny formuláře na mobilu

### 7. **SEO základy**
- [ ] Google Search Console setup
- [ ] Sitemap.xml submit
- [ ] Robots.txt check
- [ ] Open Graph images

---

## 🟢 NICE TO HAVE (první měsíc)

### 8. **Analytics & Monitoring**
- [ ] Google Analytics 4 / Plausible
- [ ] Error monitoring (Sentry?)
- [ ] Conversion tracking
- [ ] Heatmapy (Hotjar?)

### 9. **Performance optimalizace**
- [ ] Lighthouse audit (cíl: 90+)
- [ ] Core Web Vitals
- [ ] Lazy loading komponent
- [ ] Font optimization

### 10. **Marketing**
- [ ] Dárkové poukazy design
- [ ] Email templates (Resend)
- [ ] Instagram integrace
- [ ] Google My Business

### 11. **Vylepšení UX**
- [ ] Živé vyhledávání na /sluzby
- [ ] Filtrování služeb po ceně
- [ ] Quick booking modal
- [ ] WhatsApp tlačítko

---

## 📋 Deployment checklist

### **Před nasazením:**
- [ ] ENV proměnné nastaveny
- [ ] Obrázky optimalizovány
- [ ] Build prochází (`bun run build`)
- [ ] Kontakty správné
- [ ] Všechny formuláře fungují
- [ ] Mobile testováno
- [ ] SSL certifikát připravený

### **Nasazení:**
1. **Hosting:** Vercel (doporučeno) / Netlify / Cloudflare Pages
2. **Doména:** swbeauty.cz připojená
3. **DNS:** Nastavené A/CNAME záznamy
4. **SSL:** Auto certifikát
5. **ENV:** Nastavené na produkci

### **Po nasazení:**
- [ ] Google Search Console submit
- [ ] Analytics tracking funguje
- [ ] Error monitoring aktivní
- [ ] Backup strategie
- [ ] Monitoring uptime

---

## 🎯 Quick wins (udělat dnes/zítra)

### **1. Optimalizace obrázků** (2-3h)
```bash
# Použít https://squoosh.app/ nebo
npm install -g @squoosh/cli
squoosh-cli --webp auto public/images/*.png

# Nebo použít Next.js Image s priority
```

### **2. ENV setup** (30min)
```bash
touch .env.local
# Přidat RESEND_API_KEY
# Přidat kontakty
```

### **3. Kontakty update** (15min)
- Footer
- Kontakt stránka
- Provozní řád
- GDPR

### **4. .env.example** (15min)
```env
# API Keys
RESEND_API_KEY=your_resend_api_key

# Site Config
NEXT_PUBLIC_SITE_URL=https://swbeauty.cz
NEXT_PUBLIC_CONTACT_EMAIL=info@swbeauty.cz
NEXT_PUBLIC_CONTACT_PHONE=+420123456789
```

---

## 📊 Metriky úspěchu

### **Technické:**
- Lighthouse Performance: >90
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Total Blocking Time: <200ms
- Cumulative Layout Shift: <0.1

### **Business:**
- Conversion rate: >2% (návštěvník → rezervace)
- Bounce rate: <50%
- Avg. session duration: >2min
- Pages per session: >3

---

## 🤔 Co udělat TEĎ?

Doporučuji začít v tomto pořadí:

**Dnes:**
1. ✅ Optimalizace obrázků (2h) → biggest impact!
2. ✅ ENV setup (30min)
3. ✅ Kontakty update (15min)

**Zítra:**
4. ✅ Test booking flow (1h)
5. ✅ Content review (1h)
6. ✅ Mobile testing (1h)

**Příští týden:**
7. ✅ Deployment (2h)
8. ✅ Analytics setup (1h)
9. ✅ Google Search Console (30min)

**Týden 2:**
10. Marketing & optimalizace

---

## 💡 Tipy

- **Netlify/Vercel:** Build automaticky při git push
- **Obrázky:** Použij WebP s fallbackem
- **Fonts:** Already optimized (next/font)
- **Analytics:** Plausible = lightweight, GDPR-friendly
- **Forms:** Resend = snadný setup, dobrá deliverability

---

**Chceš začít s optimalizací obrázků?** Nebo radši ENV setup a kontakty?
