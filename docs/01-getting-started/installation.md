# Installation & Setup Guide

Komplexní průvodce instalací a spuštěním SW Beauty projektu.

## Table of Contents

- [Požadavky](#požadavky)
- [Instalace Bun](#instalace-bun)
- [Clone Repository](#clone-repository)
- [Instalace Dependencies](#instalace-dependencies)
- [Environment Variables](#environment-variables)
- [Verifikace Instalace](#verifikace-instalace)
- [První Spuštění](#první-spuštění)
- [Troubleshooting](#troubleshooting)

---

## Požadavky

Před instalací projektu se ujistěte, že máte nainstalováno:

### Základní Requirements

| Software | Minimální Verze | Doporučená Verze | Účel |
|----------|-----------------|------------------|------|
| **Bun** | 1.0.0+ | Latest | JavaScript runtime a package manager |
| **Node.js** | 18.17.0+ | 20.x+ | Fallback runtime (optional) |
| **Git** | 2.0+ | Latest | Version control |
| **Code Editor** | - | VS Code | Development |

### Operační Systémy

- **macOS** (Apple Silicon i Intel)
- **Linux** (Ubuntu 20.04+, Debian 11+, Fedora 36+)
- **Windows** (WSL2 required pro Bun)

### Hardware Requirements

- **RAM**: Minimum 4GB (8GB doporučeno)
- **Disk Space**: 500MB pro projekt + dependencies
- **CPU**: Moderní procesor (2015+)

---

## Instalace Bun

Bun je preferovaný runtime pro tento projekt díky své rychlosti.

### macOS / Linux

```bash
# Instalace Bun přes curl
curl -fsSL https://bun.sh/install | bash

# Nebo přes Homebrew (macOS)
brew install oven-sh/bun/bun
```

### Windows (WSL2)

```bash
# Nejdřív nainstalujte WSL2
wsl --install

# Pak v WSL terminálu nainstalujte Bun
curl -fsSL https://bun.sh/install | bash
```

### Verifikace Instalace Bun

```bash
# Zkontrolujte verzi Bun
bun --version

# Mělo by vrátit např: 1.0.15
```

---

## Clone Repository

```bash
# HTTPS
git clone https://github.com/your-org/sw-bun.git

# SSH (preferred)
git clone git@github.com:your-org/sw-bun.git

# Přejděte do složky projektu
cd sw-bun
```

---

## Instalace Dependencies

### Instalace pomocí Bun (Doporučeno)

```bash
# Instalace všech dependencies
bun install

# Mělo by trvat 5-15 sekund
```

**Output by měl vypadat nějak takto:**

```
bun install v1.0.15 (macOS arm64)
  + @hookform/resolvers@5.2.2
  + @radix-ui/react-popover@1.1.15
  + @radix-ui/react-select@2.2.6
  ...
  329 packages installed [2.45s]
```

### Instalace pomocí npm (Fallback)

```bash
# Pokud z nějakého důvodu nemůžete použít Bun
npm install
```

### Ověření Instalace

```bash
# Zkontrolujte node_modules
ls -la node_modules | wc -l

# Mělo by vrátit ~330+ složek
```

---

## Environment Variables

### Vytvoření .env.local souboru

```bash
# Vytvořte .env.local v root složce projektu
touch .env.local
```

### Template .env.local

Zkopírujte následující template do `.env.local`:

```bash
# ============================================
# SW BEAUTY - Environment Variables
# ============================================

# ------------------------------
# Email Service (REQUIRED)
# ------------------------------
# Resend API klíč pro odesílání emailů
# Získejte na: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# ------------------------------
# Site Configuration (REQUIRED)
# ------------------------------
# URL vašeho webu (pro production)
NEXT_PUBLIC_SITE_URL=https://swbeauty.cz

# Pro development použijte:
# NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ------------------------------
# Analytics (OPTIONAL)
# ------------------------------
# Vercel Analytics ID
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=

# ------------------------------
# Development Settings (OPTIONAL)
# ------------------------------
# Nastavte na 'development' pro debug logs
NODE_ENV=development
```

### Jak Získat RESEND_API_KEY

1. Přejděte na [resend.com](https://resend.com)
2. Zaregistrujte se nebo přihlaste
3. Přejděte do **API Keys** sekce
4. Klikněte na **Create API Key**
5. Pojmenujte klíč (např. "SW Beauty Production")
6. Zkopírujte vygenerovaný klíč (začíná `re_`)
7. Vložte do `.env.local`

### Validace Environment Variables

Po nastavení `.env.local` ověřte proměnné:

```bash
# Zobrazte environment variables (bez hodnot)
grep -v "^#" .env.local | grep -v "^$"
```

**Očekávaný výstup:**

```
RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

---

## Verifikace Instalace

### Kontrola TypeScript

```bash
# Zkontrolujte TypeScript kompilaci
bun run tsc --noEmit

# Mělo by proběhnout bez chyb
```

### Kontrola Linting

```bash
# Spusťte Biome lint
bun run lint

# Očekávaný výstup:
# Checked 50 files in 125ms. No errors found.
```

### Kontrola Formátování

```bash
# Zkontrolujte formátování kódu
bun run format:check

# Očekávaný výstup:
# All files are formatted correctly.
```

### Kontrola Závislostí

```bash
# Zkontrolujte nainstalované dependencies
bun pm ls

# Mělo by vypsat všechny dependencies
```

---

## První Spuštění

### Development Server

```bash
# Spusťte development server s Turbopack
bun run dev

# Nebo explicitně:
bun run dev --turbopack
```

**Očekávaný výstup:**

```
  ▲ Next.js 15.5.4
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 1.8s
```

### Otevřete Prohlížeč

1. Otevřete [http://localhost:3000](http://localhost:3000)
2. Měli byste vidět homepage SW Beauty
3. Zkontrolujte konzoli prohlížeče (F12) - neměly by být žádné chyby

### Testování Klíčových Funkcí

#### 1. Navigace

```
✓ Otevřete hlavní stránku
✓ Klikněte na "Služby" v menu
✓ Vyberte kategorii (např. "Kosmetika")
✓ Otevřete detail služby
```

#### 2. Booking Modal

```
✓ Klikněte na "Rezervovat" tlačítko
✓ Vyplňte formulář
✓ Zkontrolujte validaci
```

#### 3. API Endpoints

```bash
# Testujte API endpoint (v novém terminálu)
curl http://localhost:3000/api/pricelist

# Mělo by vrátit JSON s ceníkem
```

---

## Troubleshooting

### Problém: "Command not found: bun"

**Řešení:**

```bash
# Zkontrolujte PATH
echo $PATH | grep .bun

# Pokud chybí, přidejte do ~/.bashrc nebo ~/.zshrc
export PATH="$HOME/.bun/bin:$PATH"

# Načtěte config
source ~/.bashrc  # nebo source ~/.zshrc
```

### Problém: "RESEND_API_KEY not set"

**Řešení:**

```bash
# Zkontrolujte .env.local
cat .env.local | grep RESEND_API_KEY

# Pokud chybí, přidejte:
echo "RESEND_API_KEY=re_your_key_here" >> .env.local
```

### Problém: Port 3000 je již používán

**Řešení:**

```bash
# Zjistěte proces na portu 3000
lsof -i :3000

# Zabijte proces
kill -9 <PID>

# Nebo použijte jiný port
PORT=3001 bun run dev
```

### Problém: TypeScript chyby při buildu

**Řešení:**

```bash
# Vymažte cache a node_modules
rm -rf .next node_modules

# Znovu nainstalujte
bun install

# Znovu buildněte
bun run build
```

### Problém: CSV data se nenačítají

**Řešení:**

```bash
# Zkontrolujte existenci CSV souboru
ls -la public/services/services.csv

# Pokud chybí, vytvořte ho nebo zkopírujte z backupu
```

### Problém: GSAP animace nefungují

**Řešení:**

1. Zkontrolujte konzoli prohlížeče
2. Ověřte, že GSAP je nainstalováno: `bun pm ls | grep gsap`
3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

### Problém: Slow build times

**Řešení:**

```bash
# Použijte Turbopack (Next.js 15 feature)
bun run dev --turbopack

# Nebo upravte next.config.ts:
// Přidejte experimental features
experimental: {
  turbo: true
}
```

---

## Next Steps

Po úspěšné instalaci pokračujte na:

- [Folder Structure](../02-architecture/folder-structure.md) - Pochopte organizaci projektu
- [API Routes](../04-backend/api-routes.md) - Seznamte se s API endpointy
- [Services Data](../05-data/services-data.md) - Naučte se pracovat s daty služeb

---

## Užitečné Příkazy - Cheat Sheet

```bash
# Development
bun run dev              # Start dev server
bun run build            # Production build
bun run start            # Start production server

# Code Quality
bun run lint             # Lint check
bun run lint:fix         # Lint and fix
bun run format           # Format code
bun run check            # Complete check + fix

# Utilities
bun install              # Install dependencies
bun add <package>        # Add new package
bun remove <package>     # Remove package
bun update               # Update all packages

# Debugging
bun run dev --turbopack  # Dev with Turbopack
PORT=3001 bun run dev    # Custom port
NODE_ENV=production bun run build  # Production build
```

---

**Další:** [Folder Structure →](../02-architecture/folder-structure.md)
