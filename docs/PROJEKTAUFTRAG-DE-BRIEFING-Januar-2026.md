# De-Briefing: Projektauftrag Januar 2026

**Datum:** 26. Januar 2026  
**Gesamtaufwand:** 4-5 Stunden (inkl. Planung/Vorbereitung)

| Nr. | Aufgabe | Aufwand | Status |
|-----|---------|---------|--------|
| 0 | Planung & Excel-Vorbereitung (Meta/Alt-Texte) | 1h | ✅ Abgeschlossen |
| 1 | Telefonnummer-Validierung entfernen | 0.5h | ✅ Bereit |
| 2 | Meta Descriptions optimieren | 1h | ✅ Bereit |
| 3 | Alt-Texte SEO-Optimierung | 2-3h | ⚠️ 7 kritisch, 24 zu verbessern |

## 0. Planung & Excel-Vorbereitung (1h)

**Was wurde gemacht:** Analyse der bestehenden Meta Descriptions und Alt-Texte der Website. Erstellung von zwei Excel-Dateien mit detaillierten Vergleichen, Optimierungsvorschlägen und SEO-Bewertungen. Diese Vorarbeit bildet die Grundlage für die nachfolgenden Umsetzungsschritte.

**Ergebnis:** Zwei CSV-Dateien (`meta-descriptions-vergleich.csv`, `biszet-alt-texte-seo-optimierung.csv`) mit vollständiger Dokumentation aller Änderungsvorschläge.

---

## 1. Telefonnummer-Validierung (0.5h)

**Was muss gemacht werden:** Die zu restriktive Pattern-Validierung im Kontaktformular entfernen. Aktuell verlangt das Formular das internationale Format `+491234567890`, was viele Nutzer verwirrt oder blockiert. Da das Telefonfeld optional ist, sollte die Validierung komplett entfernt werden, um Nutzer nicht unnötig einzuschränken.

**Technische Umsetzung:** Im `Contact.tsx` das `pattern`-Attribut vom Telefon-Input-Feld entfernen.

```typescript
// Contact.tsx - Pattern-Attribut löschen
<Form.Control type="tel" placeholder={...} />
```


## 2. Meta Descriptions (1h)

**Was muss gemacht werden:** Seitenspezifische Meta Descriptions für alle Hauptseiten erstellen. Aktuell verwenden alle Seiten die identische Generic Description (318 Zeichen), was SEO-technisch suboptimal ist. Jede Seite sollte eine individuelle, keyword-optimierte Description erhalten, die den spezifischen Inhalt der Seite präzise beschreibt und in 155-160 Zeichen die wichtigsten Informationen liefert.

**Ziel:** Bessere Click-Through-Rates in Suchergebnissen durch relevantere Beschreibungen pro Seite.

**Aktuelle Situation:** Alle Seiten nutzen dieselbe Generic Description (318 Zeichen).

### Legacy Meta Descriptions gefunden:

| Seite | Legacy Description | Bewertung |
|-------|-------------------|-----------|
| **Homepage** | "biszet b7 und b11 ist der erste maßgeschneiderte Kosmetikkühler für das Bad. Es maximiert die Wirksamkeit und Haltbarkeit von hochwertigen Kosmetika." | ✅ Gut, aber b11 ist veraltet |
| **Technology** | "Kosmetik-Kühlung als Wandschrank oder Standschrank. Top Qualität und puristisches Design der biszet Kühlschränke erfüllen allerhöchste Ansprüche." | ⚠️ Generisch, ohne konkrete Features |
| **Story** | "Referenzen" | ❌ Nur 1 Wort – nicht nutzbar |
| **Contact** | "Kontakt" | ❌ Nur 1 Wort – nicht nutzbar |

### Vorschläge für optimierte Descriptions:

| Seite | Neu (155-160 Zeichen optimal) | Änderung |
|-------|-------------------------------|----------|
| **Homepage** | Aktuelle Description beibehalten (bereits optimal) | Keine Änderung nötig |
| **Technology** | Technische Details des biszet b7: 3 Klimazonen, Edelstahl, LED-Beleuchtung. Der beste Kosmetikkühlschrank made in Germany – entwickelt mit Dermatologen. (154 Z.) | Konkrete Features statt generische Aussagen |
| **Story** | Die biszet Geschichte: Vom Startup zum Weltmarktführer. In Luxushotels wie Ritz-Carlton, Park Hyatt, Cheval Blanc LVMH und auf Mega-Yachten weltweit. (152 Z.) | Storytelling mit konkreten Referenzen |
| **Contact** | Kontakt biszet: Beratung für Luxus-Kosmetikkühlschrank b7. Für Privatkunden, Architekten, Hotels, Yachtbauer. Made in Germany seit 2012. (133 Z.) | Zielgruppen + Trust-Faktor |


## 3. Alt-Texte SEO-Optimierung (2-3h)

**Was muss gemacht werden:** Systematische Überarbeitung aller Alt-Texte für SEO und Barrierefreiheit. Von 38 Bildern benötigen 32 eine Aktualisierung. Die Alt-Texte müssen beschreibend sein, relevante Keywords enthalten ("Best Cosmetic Fridge", "Beauty-Kühlschrank", "Luxus-Kosmetikkühlschrank") und sowohl für Screen-Reader als auch für Suchmaschinen optimiert werden.

**Datenquelle:** Vollständige Liste mit Vorschlägen in `biszet-seo-optimierung.xlsx` (Sheet: "Bilder & Alt-Texte") – für DE und EN.

**Analyse:** 38 Bilder – 32 benötigen Aktualisierung ⚠️ | 6 sind bereits gut ✅

### Kritische Fehler (sofort beheben):

| Seite | Bild | Aktuell | Neu DE | Neu EN |
|-------|------|---------|--------|--------|
| Homepage | Stage Hero | *Background* | biszet b7 Luxus-Kosmetikkühlschrank Edelstahl Bad | biszet b7 luxury cosmetics refrigerator stainless steel bathroom |
| Homepage | Contact | "Schrank Diagonal" | biszet b7 Kosmetikkühlschrank seitlich – Best Cosmetic Fridge | biszet b7 cosmetics refrigerator side view – best cosmetic fridge |
| Story | Carousel 3.1 | **"Myself"** ❌ FALSCH | Sylter Fährhaus Logo – 5-Sterne Hotel biszet | Sylter Fährhaus Logo – 5-star hotel biszet |
| Story | Carousel 3.2 | **"Elle"** ❌ FALSCH | Budersand Hotel Logo – biszet Beauty-Fridge | Budersand Hotel Logo – biszet beauty fridge |
| Story | Carousel 3.3 | **"Gulf Interiors"** ❌ FALSCH | B.S.C. Group Logo – biszet Partner Hong Kong | B.S.C. Group Logo – biszet partner Hong Kong |

### Wichtigste SEO-Optimierungen:

| Kategorie | Bild | Beispiel aktuell | Optimiert mit Keywords |
|-----------|------|------------------|------------------------|
| **Press Logos** | [🖼️](https://biszet.de/images/logos/Wallpaper.svg) | "Wallpaper Logo" | Wallpaper Magazine Logo – **biszet Best Cosmetic Fridge** Feature |
| **Press Logos** | [🖼️](https://biszet.de/images/logos/Vogue.svg) | "Vogue Logo" | Vogue Logo – **biszet Beauty-Kühlschrank für Skincare** |
| **Produkt** | [🖼️](https://biszet.de/images/B1-Animation.gif) | "Schrank Animation" | biszet b7 **Kosmetikkühlschrank** Animation – **Edelstahl Beauty-Fridge** |
| **Produkt** | [🖼️](https://biszet.de/images/Biszet0060-2.jpg) | "Schrank Diagonal" | biszet b7 Kosmetikkühlschrank seitliche Ansicht – **Best Cosmetic Fridge** |

**Strategie:** Keywords einbauen: "Best Cosmetic Fridge" | "Beauty Fridge" | "Kosmetikkühlschrank" | "Beauty-Kühlschrank" | "Skincare Fridge"

---

**Nächster Schritt:** Freigabe zur Umsetzung?