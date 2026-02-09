# E-Mail an Kunden: SSL-Zertifikat für biszet.com

**Betreff:** Update: Domain-Weiterleitungen gelöst + Info zu www.biszet.com

---

Hallo [Kundenname],

**kurze Zusammenfassung:**

im Oktober gab es ja ein technisches Problem mit den Sicherheitszertifikaten (SSL), weil Netlify (wo die Website gehostet ist) und Host Europe (wo die Domains verwaltet werden) sich in die Quere kamen. Damals habe ich eine schnelle Übergangslösung implementiert, damit alles wieder funktioniert.

Jetzt habe ich die **finale, saubere Lösung** umgesetzt:
- Die Hauptseite (biszet.de) läuft weiterhin über Netlify
- Alle anderen Domains (biszet.com, beauty-fridge.de, etc.) leiten jetzt professionell bei Host Europe weiter
- Die Architektur ist jetzt stabil und sollte keine Probleme mehr bereiten und Zertifikate werden nun ohne Problem upgedated.

**Das Ergebnis:**

Alle Domains (inkl. www-Varianten) funktionieren und leiten korrekt auf die Hauptseite weiter:

- ✅ **biszet.de** (Hauptdomain - mit vollem HTTPS-Schutz)
- ✅ **biszet.com**
- ✅ **biszet-beauty-fridge.com**
- ✅ **biszet-beauty-fridge.de**
- ✅ **beauty-fridge.de**
- ✅ **cosmeticfridge.de**

**Eine technische Anmerkung zu den Weiterleitungs-Domains:**

Bei den Weiterleitungs-Domains (alles außer biszet.de) funktioniert die Weiterleitung über die unverschlüsselte Variante (HTTP). Wenn jemand explizit "**https://**" vor die Domain tippt, funktioniert das derzeit nicht (Connection-Fehler).

**Warum ist das so?**  
Früher waren diese Domains bei Netlify konfiguriert und hatten dort automatisch SSL-Zertifikate. Um das Wildcard-Zertifikat-Problem zu lösen, habe ich sie aus Netlify entfernt und bei Host Europe als Weiterleitungen eingerichtet. Bei Host Europe müssten die SSL-Zertifikate aber separat bestellt werden (nicht automatisch wie bei Netlify).

**Was bedeutet das praktisch?**

In den meisten Fällen ist das **kein Problem**:
- Wenn jemand nur "biszet.com" oder "beauty-fridge.de" (ohne https://) eingibt → funktioniert alles perfekt
- Suchmaschinen verlinken auf die Hauptseite (biszet.de) → kein Problem
- Die meisten Nutzer tippen Domainnamen ohne "https://" → funktioniert

Nur wenn jemand explizit "**https://biszet.com**" oder "**https://beauty-fridge.de**" eingibt, bekommt er eine Fehlermeldung ("Diese Website ist nicht erreichbar").

**Meine Empfehlung:**

Da diese Domains hauptsächlich zur **Domain-Sicherung** dienen (keyword-relevante Domains reservieren, damit Konkurrenten sie nicht nutzen können) und für **Direct Traffic** (Nutzer die z.B. direkt "beauty-fridge.de" eintippen), sind die SSL-Zertifikate **aus technischer Sicht nicht notwendig**:

- HTTP-Redirects funktionieren für Direct Traffic einwandfrei
- Suchmaschinen ranken weiterhin die Hauptseite (biszet.de), nicht die Redirect-Domains
- Die Hauptseite hat vollständigen HTTPS-Schutz
- Wer ohne "https://" tippt (99% der Nutzer), landet problemlos auf biszet.de

**Wenn du es trotzdem haben möchtest:**  
Die SSL-Zertifikate können bei Host Europe bestellt werden  
Kosten: 2,99 EUR/Jahr pro Domain  
→ Dann funktioniert auch https:// für alle Weiterleitungs-Domains einwandfrei

(Bei Netlify waren die Zertifikate automatisch dabei, bei Host Europe müssen sie separat gebucht werden)


Viele Grüße  
[Dein Name]
