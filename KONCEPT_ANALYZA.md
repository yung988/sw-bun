# 🔍 Analýza konceptu a logiky SW Beauty webu

## 📋 Současná struktura

### **Navigace (hlavní menu)**
```
/ (Domů)
#products (Služby - anchor na homepage)
/cenik (Ceník)
/o-salonu (O salonu)
/kontakt (Kontakt)
```

### **Informační architektura**

#### **Homepage (326 řádků)** - PŘEPLNĚNÁ
Sekce v pořadí:
1. Hero (Objevte svou ideální krásu)
2. Highlights carousel (Naše přednosti)
3. Why section (Proč si vybrat nás) - 6 důvodů
4. Services (#products) - 4 hlavní služby
5. Testimonials (Reference)
6. Subscribe form (Newsletter)
7. FAQ
8. Blog preview (3 články)
9. Instagram feed
10. Carousel (galerie salonu)

**🔴 PROBLÉM:** Homepage má 10 sekcí - to je příliš mnoho!

#### **Služby**
Struktura:
```
/sluzby (přehled všech)
/sluzby/[slug] (dynamické detaily z CSV)
/sluzby/hifu-facelift (statické stránky)
/sluzby/endos-roller
/sluzby/ems-budovani-svalu
/sluzby/kavitace
/sluzby/kosmetika
```

**🔴 PROBLÉM:** Duplicitní přístup - jsou statické i dynamické stránky služeb!

#### **Kategorie služeb v CSV**
```
KOSMETIKA
HYDRAFACIAL  
HIFU FACELIFT
HIFU TĚLO
ENDOS-ROLLER
BUDOVÁNÍ SVALŮ
KAVITACE
LPG
OSTATNÍ SLUŽBY
```

**🔴 PROBLÉM:** 9 kategorií, ale v navigaci jen odkaz #products

#### **Blog**
3 statické články:
- `/blog/hifu-7d-revoluce-v-omlazovani`
- `/blog/ems-budovani-svalu`
- `/blog/jak-funguje-endos-roller`

**🔴 PROBLÉM:** Blog není v hlavní navigaci, jen na homepage

### **Footer navigace**
- Rychlé odkazy → anchor linky na homepage (#highlights, #why, #products, #faq)
- Služby → 3 služby + ceník
- Kontakt
- Právní odkazy (neexistují!)

**🔴 PROBLÉM:** Footer odkazuje na neexistující stránky (/ochrana-osobnich-udaju, /obchodni-podminky)

---

## 🚨 Hlavní koncepční problémy

### 1. **Chaotická homepage**
- **Příliš mnoho informací** (10 sekcí)
- **Špatné pořadí** - FAQ před blogem?
- **Duplicity** - "Proč nás" + "Přednosti" říkají podobné věci
- **Newsletter uprostřed** - měl by být na konci

**Doporučení:**
```
1. Hero
2. Services (hlavní nabídka)
3. Why us (1 sekce, ne 2)
4. Testimonials
5. FAQ
6. Blog preview
7. Instagram
8. Newsletter/CTA
```

### 2. **Nejasná struktura služeb**

**Současný stav:**
- CSV má 9 kategorií
- Statické stránky jen pro 5 služeb
- `/sluzby/[slug]` vs `/sluzby/hifu-facelift` - co se kdy použije?

**🤔 Otázky:**
- Proč existují statické stránky, když máš dynamické?
- Chybí kategorizace - např. `/sluzby/kosmetika` vs `/sluzby/kosmetika/[slug]`
- Jak uživatel najde "LPG" nebo "Prodlužování vlasů"?

**Doporučení:**
```
Buď:
A) Jen dynamické stránky z CSV
   /sluzby → přehled kategorií
   /sluzby/[kategorie] → služby v kategorii
   /sluzby/[kategorie]/[slug] → detail

NEBO:

B) Hybrid s přehlednější strukturou
   /sluzby → grid kategorií
   /sluzby/hifu → kategorie detail
   /sluzby/hifu/[slug] → konkrétní služba
```

### 3. **Blog bez strategie**
- Jen 3 články
- Není v navigaci
- Není dynamický (hardcoded)
- Není /blog landing page

**Doporučení:**
- Přidat `/blog` stránku
- Přidat do navigace
- Nebo úplně odstranit (3 články nestojí za složitost)

### 4. **Navigace neodpovídá obsahu**

**Navbar:**
```
❌ #products → mělo by být /sluzby
❌ Chybí Blog
❌ Chybí Rezervace (existuje stránka!)
```

**Footer:**
```
❌ "Produkty" → mělo by být "Služby"
❌ Odkaz na /sluzby/kosmetika → ale to je "Péče o vlasy"?
❌ Chybí kategorie (jen 3 konkrétní služby)
```

### 5. **Informační hierarchie**

**Co chce uživatel rychle najít:**
1. ✅ Jaké služby nabízíte? → **OK** (#products)
2. ❌ Kolik to stojí? → **Špatně** (ceník odkazuje na CSV, ne přehledné)
3. ✅ Kde jste? → **OK** (/kontakt)
4. ❌ Můžu se objednat? → **Špatně** (/rezervace není v navigaci!)
5. ❓ Jak to funguje? → **Chybí** (není průvodce/proces)

---

## 💡 Doporučené změny

### **Priorita 1: Zjednodušit homepage**
```diff
- 10 sekcí → 7 sekcí
- Sloučit "Highlights" + "Why" do jedné sekce
- Přesunout Newsletter na konec
- Lépe strukturovat flow
```

### **Priorita 2: Opravit navigaci**
```diff
Navbar:
  Domů
+ Služby (/sluzby - ne #products!)
  Ceník
  O nás
  Kontakt
+ Rezervace (nebo CTA tlačítko)
```

### **Priorita 3: Vyřešit služby**
**Doporučuji:**
```
/sluzby 
  → Grid 9 kategorií (KOSMETIKA, HIFU, ENDOSPHERE...)
  
/sluzby/[kategorie] 
  → Seznam služeb v kategorii
  
/sluzby/[kategorie]/[slug]
  → Detail služby
```

**Smazat:**
- Statické stránky služeb (použít jen dynamické)
- Nebo naopak - smazat dynamické a mít jen 5 hlavních

### **Priorita 4: Blog - rozhodnout**
**Buď:**
A) Udělat pořádně (CMS, landing page, navigace)
B) Nebo odstranit úplně (3 články jsou málo)

### **Priorita 5: Footer logika**
```diff
Navigace:
- "Produkty" → "Služby"
- Ne konkrétní služby, ale kategorie
+ Rezervace
+ Blog (pokud zůstane)

Právní:
+ Vytvořit /ochrana-osobnich-udaju
+ Vytvořit /obchodni-podminky
```

---

## ❓ Otázky k zodpovězení

1. **Služby:**
   - Chceš kategorizaci nebo flat seznam?
   - Smazat statické stránky a použít jen dynamické z CSV?
   - Nebo naopak - jen 5 hlavních služeb staticky?

2. **Blog:**
   - Plánuješ pravidelně psát články?
   - Pokud ne → smazat?
   - Pokud ano → udělat CMS (např. Contentlayer)

3. **Booking flow:**
   - Je /rezervace hotové?
   - Funguje booking formulář?
   - Má být v navigaci nebo jen CTA tlačítko?

4. **Ceník:**
   - CSV je pro adminy - chceš hezčí UI?
   - Filtrování po kategoriích?
   - Nebo jen odkaz na PDF?

5. **O salonu:**
   - Obsah je OK?
   - Chybí něco? (tým, certifikace, historie?)

---

## 🎯 Ideální informační architektura

```
Homepage (zjednodušená)
├── Hero + CTA
├── Služby (top 4-6)
├── Proč SW Beauty (1 sekce)
├── Reference
├── FAQ
├── Instagram
└── Newsletter

/sluzby
├── Přehled kategorií (9 karet)
└── /[kategorie]
    ├── Seznam služeb
    └── /[slug] → Detail

/cenik
└── Filtrovatelný ceník (ne CSV!)

/rezervace
└── Booking formulář

/o-nas
└── O salonu + tým

/kontakt
└── Kontakt + mapa

/blog (volitelné)
├── Články
└── /[slug] → Detail

Footer
├── Služby (kategorie)
├── Firma (O nás, Kontakt)
├── Rezervace
└── Právní (GDPR, OP, Cookies)
```

---

## 🚀 Akční plán

**Co udělat HNED:**
1. Vyčistit homepage (10→7 sekcí)
2. Opravit navigaci (přidat Rezervace, změnit #products→/sluzby)
3. Rozhodnout o službách (dynamické vs statické)
4. Smazat nebo dodělat blog
5. Vytvořit chybějící právní stránky

**Chceš, abych začal?** 
Řekni mi:
- Homepage: ano/ne vyčistit?
- Služby: dynamické/statické/hybrid?
- Blog: nechat/smazat?
