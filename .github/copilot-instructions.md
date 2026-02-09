# Copilot Instructions für biszet Website

## Projekt-Übersicht
Dies ist eine mehrsprachige Next.js 14 Website (Deutsch/Englisch) für biszet - einen Luxus-Kosmetikkühlschrank. Die Seite wird auf Netlify gehostet und nutzt TypeScript mit React Bootstrap für Styling.

## Architektur & Kernkonzepte

### Internationalisierung (i18n)
- **Standardsprache**: Deutsch (`de`) - definiert in `middleware.ts` (wichtig: unterscheidet sich von `i18n-config.ts`)
- **Routing**: Alle Routen sind unter `src/app/[lang]/` organisiert mit dynamischem Sprachparameter
- **Middleware**: Leitet automatisch auf `/de/*` oder `/en/*` weiter basierend auf Browser-Sprache (siehe `src/middleware.ts`)
- **Übersetzungen**: Content wird aus `src/dictionaries/{de,en}.json` geladen via `getDictionary(locale)`
- **Wichtig**: Übersetzungsdateien enthalten vollständige Inhalte inklusive Meta-Tags, Module und Komponenten-Props

### Content-Struktur
- **Modularer Ansatz**: Seiten bestehen aus wiederverwendbaren Komponenten (Stage, Carousel, Editorial, etc.)
- **Content aus JSON**: Alle Inhalte, Bilder und Meta-Daten kommen aus den Dictionary-Dateien
- **Props-Spreading**: Komponenten erhalten Props direkt aus dem Dictionary via Spread-Operator:
  ```tsx
  <Stage {...home.modules.stage} variant={home.modules.stage.variant as "overlay" | "default"}/>
  ```

### Komponenten-Patterns
- **Variant-System**: Viele Komponenten unterstützen `variant` Prop für visuelle Variationen:
  - `Stage`: `'default' | 'overlay'`
  - `EditorialSplit`: `'default' | 'subtle' | 'overlay' | 'background'`
  - `TextTeaser`: Legacy `variant` + neuer `backgroundColor` Prop
- **Image-Handling**: Komponenten unterstützen `imageType` Prop (`'image' | 'gif'`) für unterschiedliche Medientypen
- **Mobile/Desktop**: Separate Bild-URLs für responsive Darstellung (z.B. `imageSrc` + `imageSrcMobile`)

### Styling
- **SCSS Modules**: Jede Komponente hat eigenes `.module.scss` File
- **Bootstrap Integration**: React Bootstrap Komponenten mit Custom Styles in `src/styles/`
- **CSS Variables**: Custom Properties für Fonts (`--biszet-body-font-family`, etc.) definiert via `next/font`
- **Google Fonts**: Noto Serif, Noto Serif Display, Noto Sans Display mit Variable Font Support

### Meta-Tags & SEO
- **Zentrale Funktion**: `getMetadata()` in `src/utils/getMetadata.tsx` generiert alle Meta-Tags
- **Content aus Dictionary**: Meta-Daten (Title, Description, OG-Tags) sind Teil der JSON-Struktur
- **Per-Page**: Jede Route kann eigene Meta-Daten via `generateMetadata()` definieren

## Entwickler-Workflows

### Development
```bash
npm run dev          # Entwicklungsserver auf localhost:3000
npm run build        # Produktions-Build
npm run start        # Produktions-Server
npm run start:static # Statische Dateien aus /out serven
```

### Deployment
- **Plattform**: Netlify mit `@netlify/plugin-nextjs` Plugin
- **Config**: `netlify.toml` im Root
- **Static Generation**: Pre-rendering für beide Sprachen via `generateStaticParams()`

## Wichtige Konventionen

### TypeScript
- **Path Aliases**: `@/*` mapped zu `./src/*`
- **Type Safety**: Props sollten typisiert sein, aber `@ts-ignore` ist bei `params` akzeptiert
- **Strict Mode**: Aktiviert in `tsconfig.json`

### File Organization
- **Components**: `src/components/` - React-Komponenten mit Co-Located Styles
- **Pages**: `src/app/[lang]/` - File-based Routing mit Sprach-Parameter
- **Utilities**: `src/utils/` - Helper-Funktionen
- **Public Assets**: `public/images/`, `public/downloads/`, `public/videos/`
- **Dokumentation**: `docs/` - Alle Dokumentations-Dateien (md, csv, txt)
  - Incident Reports, technische Dokumentation, Kunden-Emails
  - **Wichtig**: Neue Dokumentations-Dateien IMMER in `docs/` erstellen

### Navigation
- **Client-Side**: Navigation-Komponente nutzt `'use client'` und `usePathname()` Hook
- **Scroll-Behavior**: Intersection Observer für transparente → weiße Navigation beim Scrollen
- **Active States**: React Bootstrap Nav mit `activeKey={pathname}`

## Neue Features hinzufügen

### Neue Seite erstellen
1. Ordner unter `src/app/[lang]/` anlegen (z.B. `newpage/`)
2. `page.tsx` mit `generateMetadata()` und Default-Export erstellen
3. Content in beiden Dictionary-Dateien (`de.json`, `en.json`) hinzufügen
4. Navigation in `Navigation.tsx` updaten

### Neue Komponente erstellen
1. `.tsx` File und `.module.scss` File in `src/components/` anlegen
2. Props-Interface mit TypeScript definieren (inkl. `variant` wenn nötig)
3. In Dictionary-Dateien die Props-Struktur für Content vorbereiten
4. Komponente importieren und mit Spread-Operator in Page einbinden

### Content anpassen
- **Nie** hardcoded Strings in Komponenten - immer über Dictionary
- Struktur in beiden Sprachdateien synchron halten
- Images in `public/images/` ablegen und Pfad in Dictionary referenzieren

## Python Script Management

### Excel/CSV Operations
- **Skill verwenden**: IMMER `.github/skills/excel-writer/` Beispiele als Referenz nutzen für Excel-Operationen
  - `example-read.py` - Excel-Dateien lesen und analysieren
  - `example-basic.py` - Einfache Excel-Erstellung
  - `example-advanced.py` - Formatierung, Formeln, etc.
  - `example-modify.py` - Bestehende Excel-Dateien bearbeiten
- **One-off Scripts**: Temporäre Python-Scripts für Excel/CSV-Operationen (mit openpyxl) nach erfolgreichem Ausführen löschen
- **Cleanup**: `rm scriptname.py` direkt im selben Terminal-Befehl mit `&&` anhängen
- **Pattern**: `python3 script.py && rm script.py` für automatische Aufräumung
- **Ausnahme**: Dokumentierte, wiederverwendbare Scripts (wie `create_excel_v2.py`) in `docs/` behalten
- **Package**: Immer `uvx --with openpyxl python3` oder `python3` mit installiertem openpyxl verwenden
