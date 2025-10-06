# 🎯 Konverzní strategie SW Beauty

## Problém současného stavu

### 🔴 Duplicita a zmatek:
1. **Ceník** = CSV tabulka (64 služeb)
2. **Služby** = `/sluzby/[slug]` (64 detailů)
3. **Kategorie** = `/sluzby/[kategorie]` (7 kategorií)

→ **Uživatel neví, kam jít!** Ceník vs Služby = stejná data, jiný design

### 🔴 Aktuální user flow:
```
Homepage → "Všechny služby" → Kategorie → Služba (detail) → Rezervace
        ↘ "Ceník" → CSV tabulka (dead end!)
```

**Problém:** 
- Ceník = dead end (jen tabulka, žádné CTA)
- Detail služby = má booking formulář ✅
- Ale jak se tam dostat? 3 kliky!

---

## ✅ Optimální řešení

### **Strategie: Služby = Ceník (MERGE)**

#### 1. Odstranit samostatný ceník
- `/cenik` → **redirect na `/sluzby`**
- Ceník tab v navigaci → **"Služby & Ceny"**

#### 2. Nová struktura `/sluzby`:
```
/sluzby (hlavní stránka)
├── Filtry (kategorie)
├── Grid služeb s cenami ✅
├── Rychlý náhled (modal)
└── CTA: "Rezervovat" na každé kartě
```

#### 3. User flow optimalizace:

**Scénář A: Vím co chci**
```
Homepage → Služby → Vyhledávání/Filter → Detail → Rezervace
(1 klik)    (najde)      (reserve)
```

**Scénář B: Nevím co chci**
```
Homepage → Služby → Kategorie → Služba → Rezervace
(1 klik)   (browse)  (detail)  (convert)
```

**Scénář C: Znám cenu**
```
Homepage → Služby → Seřadit dle ceny → Rezervace
(1 klik)   (compare)              (convert)
```

---

## 🎨 Design optimalizace

### **Homepage CTA strategie:**

1. **Hero:** 
   - Primární CTA: "Prohlédnout služby" → `/sluzby`
   - Sekundární: "Objednat konzultaci" → `/rezervace`

2. **Služby sekce:**
   - Zobrazit 4 TOP služby
   - CTA: "Zobrazit všechny služby & ceny" → `/sluzby`

3. **FAQ:**
   - CTA: "Máte dotaz? Objednejte konzultaci" → `/rezervace`

### **Služby stránka (`/sluzby`) design:**

```
┌─────────────────────────────────────┐
│  🔍 Vyhledávání                      │
│  [Kategorie filter] [Cena filter]   │
└─────────────────────────────────────┘

┌─────────────────┬─────────────────┐
│ HIFU Facelift   │ Endos-roller    │
│ Od 2000 Kč      │ Od 1050 Kč      │
│ [Detail] [Book] │ [Detail] [Book] │
└─────────────────┴─────────────────┘
```

**Features:**
- ✅ Živé vyhledávání
- ✅ Filter po kategoriích (pills)
- ✅ Řazení (cena, popularita)
- ✅ Zobrazit balíčky/jednotlivé
- ✅ Každá karta = 2 CTA (Detail + Rezervovat)

### **Detail služby optimalizace:**

```
┌──────────────────────────────────────┐
│ HIFU Facelift                        │
│ 5 500 Kč · 60 min                    │
│                                      │
│ [Rezervovat nyní] ← STICKY!         │
└──────────────────────────────────────┘

│ 📝 Popis                             │
│ ✨ Výhody                             │
│ ⚠️  Kontraindikace                    │
│ 📅 Doporučená frekvence               │
│                                      │
│ [Rezervovat] [Konzultace]            │
└──────────────────────────────────────┘
```

**Sticky CTA:** Vždy viditelné tlačítko "Rezervovat"

---

## 🧭 Navigace optimalizace

### **Současná:**
```
Domů | Služby | Ceník | O salonu | Kontakt | [Rezervace]
```

### **Nová (doporučená):**
```
Domů | Služby & Ceny | O nás | Kontakt | [Rezervace]
```

**Nebo ještě jednodušeji:**
```
Služby | O nás | Kontakt | [Rezervace]
```

**Důvod:** 
- Méně = lépe
- "Domů" = logo
- "Služby & Ceny" = merge → rychlejší rozhodování

### **Mobile navigace:**
```
☰ Menu
  → Služby & Ceny
  → O salonu  
  → Kontakt
  ──────────
  🎯 Rezervovat (prominent)
```

---

## 🔄 Propojení Ceník ↔ Služby

### **Varianta 1: Hard merge (doporučuji)**
- Smazat `/cenik` úplně
- `/sluzby` = služby + ceny v jednom
- Navigace: "Služby" (obsahuje ceny)

### **Varianta 2: Redirect**
- `/cenik` → redirect na `/sluzby?view=table`
- `/sluzby` má 2 views: Grid (default) / Tabulka
- Toggle: [Grid 🔲] [Tabulka 📊]

### **Varianta 3: Tab system**
```
/sluzby
  ├── [Služby] (grid s CTA)
  └── [Ceník] (kompaktní tabulka)
```

**→ Doporučuji Variantu 1** (nejjednodušší, nejrychlejší konverze)

---

## 📊 Konverzní prvky

### **Psychologické triggery:**

1. **Social proof:**
   - "500+ spokojených klientů"
   - ⭐⭐⭐⭐⭐ 4.9/5 (přímo u služby)

2. **Scarcity:**
   - "Pouze 3 volné termíny tento týden"
   - "Nejoblíbenější služba" badge

3. **Trust:**
   - "✓ Certifikované přístroje"
   - "✓ 10+ let zkušeností"

4. **Value:**
   - Balíčky: "Ušetřete 15%" badge
   - "Nejlepší poměr cena/výkon" 

### **Mikro-konverze:**

Před hlavní konverzí (rezervace):
1. Newsletter → "Slevy a novinky"
2. Konzultace zdarma → "Nevím co chci"
3. Dárkový poukaz → "Pro někoho jiného"

---

## 🎯 Call-to-Actions hierarchie

### **Primární CTA:** "Rezervovat"
- Barva: Výrazná (černá/zlatá)
- Pozice: Sticky na detailu
- Text: Akční ("Rezervovat termín", ne "Více info")

### **Sekundární CTA:** "Zobrazit detail"
- Barva: Neutrální (outline)
- Pozice: Na kartě služby

### **Terciární CTA:** "Konzultace zdarma"
- Pro nerozhodné
- Menší tlačítko

---

## 📱 Mobile-first optimalizace

### **Homepage mobile:**
```
Hero
  ↓
Služby (swipe carousel)
  → [Všechny služby] button
  ↓
Proč SW Beauty (zkráceno)
  ↓
Reference
  ↓
Instagram
  ↓
[Rezervovat] sticky FAB (Floating Action Button)
```

### **Služby mobile:**
```
[Filter ▼] [Řazení ▼]
  ↓
Služba karta
  [Rezervovat] [Detail]
  ↓
Služba karta
  [Rezervovat] [Detail]
  
[Sticky] Rezervovat (FAB)
```

---

## 🚀 Quick Wins (implementovat ASAP)

### **1. Merge Ceník + Služby** (2h)
- `/cenik` redirect na `/sluzby`
- Navigace: "Služby & Ceny"

### **2. Sticky CTA na detailu** (30min)
- Tlačítko "Rezervovat" vždy viditelné

### **3. Quick booking na službě** (1h)
- Na kartě služby: [Detail] + [Rezervovat]
- Modal booking bez reload

### **4. Filter & Search** (2h)
- Živé vyhledávání
- Kategorie pills
- Řazení po ceně

### **5. Social proof badges** (1h)
- "Nejoblíbenější"
- "⭐ 4.9/5"
- "✓ Certifikováno"

---

## 📈 Měření úspěšnosti

### **Metriky:**
1. **Conversion rate:** % návštěvníků → rezervace
2. **Time to convert:** Čas od vstupu do rezervace
3. **Bounce rate na /sluzby:** Mělo by klesnout
4. **Exit rate:** Kde uživatelé odcházejí

### **A/B testy:**
1. CTA text: "Rezervovat" vs "Objednat" vs "Chci termín"
2. Ceny: Zobrazit hned vs po kliku
3. Filter: Pills vs Dropdown
4. Grid: 2 vs 3 vs 4 sloupce

---

## ✅ Akční plán

**Fáze 1: Struktura (teď)**
- [ ] Merge /cenik → /sluzby
- [ ] Nová navigace "Služby & Ceny"
- [ ] Redesign /sluzby s filtry

**Fáze 2: UX (pak)**
- [ ] Sticky CTA na detailu
- [ ] Quick booking modal
- [ ] Social proof badges

**Fáze 3: Optimalizace (později)**
- [ ] A/B testy
- [ ] Analytics
- [ ] Micro-optimalizace

---

**Chceš začít?** Řekni mi, které varianty preferuješ a začnu implementovat!
