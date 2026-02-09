# Incident Report: Domain & DNS Problematik

**Datum:** 29. Oktober 2024  
**Betroffene Domain:** biszet.de  
**Severity:** Kritisch - Website war zeitweise nicht erreichbar

## Problembeschreibung

### Ausgangssituation
Die Website biszet.de wurde über Netlify gehostet, wobei externe DNS-Nameserver (nsone.net) verwendet wurden, um die Domain mit Netlify zu verbinden.

### Eingetretenes Problem

1. **Automatische DNS-Überschreibung**
   - Bei der SSL-Zertifikatserneuerung durch Host Europe wurden die manuell konfigurierten DNS-Nameserver automatisch auf Host Europe Standard-Nameserver zurückgesetzt
   - Vorherige Konfiguration: dns1-4.p07.nsone.net
   - Nach SSL-Renewal: ns35/36.domaincontrol.com (Host Europe)
   - **Folge:** Website war nicht mehr erreichbar

2. **Netlify SSL-Zertifikat-Probleme**
   - Netlify versuchte für alle angebundenen Domains SSL-Zertifikate auszustellen
   - Wildcard-Zertifikate erfordern DNS-01-Validierung
   - Diese Validierung funktioniert nicht bei extern verwalteten DNS-Einträgen
   - **Folge:** SSL-Zertifikatsausstellung schlug fehl

### Root Cause
Host Europe überschreibt bei SSL-Zertifikatserneuerungen automatisch externe Nameserver-Konfigurationen und setzt diese auf die eigenen Standard-Nameserver zurück. Dies ist ein systemseitiges Verhalten, das nicht deaktiviert werden kann.

## Implementierte Lösung

### Neue Architektur
Umstellung von externen Nameservern auf Host Europe-interne DNS-Verwaltung mit manuellen DNS-Einträgen.

**Vorher:**
```
Domain (Host Europe) → Externe Nameserver (nsone.net) → Netlify
Problem: Bei SSL-Renewal Zurücksetzung der Nameserver
```

**Nachher:**
```
Domain (Host Europe) → Host Europe Nameserver → Manuelle DNS-Einträge → Netlify
Vorteil: Keine automatische Überschreibung bei SSL-Renewal
```

### Konkrete Maßnahmen

#### 1. DNS-Konfiguration für biszet.de
Manuelle DNS-Einträge im Host Europe KIS:

```
A-Record:
Name: @ (bzw. biszet.de)
Wert: 75.2.60.5

CNAME-Record:
Name: www
Wert: magician-rabbit-34406.netlify.app
```

#### 2. Domain-Konsolidierung
301-Weiterleitungen für alle Nebendomain zu biszet.de:

- biszet.com → https://biszet.de
- beauty-fridge.de → https://biszet.de
- biszet-beauty-fridge.de → https://biszet.de
- cosmeticfridge.de → https://biszet.de

**Vorteil:** SSL-Zertifikate für Weiterleitungs-Domains verbleiben bei Host Europe, keine DNS-Konflikte mehr.

#### 3. E-Mail-Konfiguration
Bestehende MX, SPF und DKIM-Einträge bleiben unverändert, da E-Mail weiterhin über Host Europe läuft.

## Vorbeugende Maßnahmen

### 1. Nameserver-Strategie
**Regel:** Bei Domains mit automatischen SSL-Renewals (Host Europe) NIEMALS externe Nameserver verwenden.

**Empfehlung:**
- Immer Host Europe Nameserver nutzen: ns35/36.domaincontrol.com
- DNS-Einträge manuell im KIS verwalten
- Dokumentation der DNS-Konfiguration führen

### 2. Monitoring & Alerts

#### DNS-Monitoring einrichten
- **Tool-Empfehlung:** UptimeRobot, Pingdom oder StatusCake
- **Überwachung:** HTTP/HTTPS-Erreichbarkeit von biszet.de
- **Intervall:** Alle 5 Minuten
- **Alert:** E-Mail/SMS bei Ausfall

#### DNS-Record-Monitoring
- **Tool-Empfehlung:** DNSWatch oder CloudFlare Monitoring
- **Überwachung:** Änderungen an A-Records und CNAME-Records
- **Alert:** Sofortige Benachrichtigung bei DNS-Änderungen

### 3. Dokumentation & Prozesse

#### Checkliste vor SSL-Zertifikatserneuerung
1. Aktuelle DNS-Konfiguration dokumentieren
2. Screenshot der Nameserver-Einstellungen anfertigen
3. Nach Renewal: DNS-Einträge prüfen (max. 24h später)
4. Bei Abweichung: Sofort DNS-Einträge korrigieren

#### Kontaktdaten & Zugänge
- Host Europe Support-Kontakt vorhalten
- KIS-Zugangsdaten sicher verwahren
- Netlify Dashboard-Zugang dokumentieren
- Notfall-Kontaktperson definieren

### 4. Netlify-Konfiguration

#### Domain-Management
- **Nur Hauptdomain:** biszet.de in Netlify konfigurieren
- **Keine Wildcard-Domains:** Vermeidet DNS-01-Validierung-Probleme
- **SSL-Zertifikat:** Nur für biszet.de ausstellen lassen

#### Deployment-Konfiguration
```toml
# netlify.toml
[[redirects]]
  from = "http://biszet.de/*"
  to = "https://biszet.de/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://www.biszet.de/*"
  to = "https://biszet.de/:splat"
  status = 301
  force = true
```

### 5. Regelmäßige Prüfungen

#### Monatlich
- DNS-Einträge auf Korrektheit prüfen
- SSL-Zertifikats-Status in Netlify überprüfen
- Weiterleitungen testen (alle 4 Nebendomain)

#### Vierteljährlich
- Vollständiger DNS-Audit
- Monitoring-Tools testen
- Dokumentation aktualisieren

#### Bei SSL-Zertifikatserneuerung (ca. alle 90 Tage)
- Unmittelbar nach Renewal: DNS-Check durchführen
- Nameserver-Konfiguration verifizieren
- Website-Erreichbarkeit testen

## Lessons Learned

1. **Provider-spezifisches Verhalten:** Automatische Überschreibungen bei SSL-Renewals sind ein bekanntes Verhalten von Host Europe und können nicht deaktiviert werden.

2. **DNS-Komplexität reduzieren:** Externe Nameserver erhöhen die Komplexität und Fehleranfälligkeit. Wo möglich, Provider-eigene DNS-Verwaltung nutzen.

3. **Single Point of Truth:** Eine Hauptdomain mit klaren Weiterleitungen ist stabiler als mehrere gleichwertige Domains.

4. **Monitoring ist essentiell:** Ohne automatisches Monitoring können DNS-Probleme unbemerkt bleiben und zu längeren Ausfällen führen.

5. **Dokumentation vor Automation:** Bevor automatische Prozesse (wie SSL-Renewal) laufen, muss die erwartete Konfiguration dokumentiert sein.

## Technische Kontakte

### Bei DNS-Problemen
**Host Europe Support:**
- Telefon: +49 221 99999 301
- E-Mail: support@hosteurope.de
- KIS-Portal: https://kis.hosteurope.de/

**Wichtig:** Ticket-Betreff nicht ändern für korrekte Zuordnung

### Bei Netlify-Problemen
- Netlify Support-Portal
- Netlify Community Forum

## Anhang: Monitoring-Setup

### Empfohlene Monitoring-Konfiguration

```yaml
# UptimeRobot Konfiguration (Beispiel)
monitors:
  - name: "biszet.de HTTPS"
    type: HTTP(S)
    url: https://biszet.de
    interval: 5  # Minuten
    
  - name: "DNS Check biszet.de"
    type: PORT
    hostname: biszet.de
    port: 53
    interval: 60  # Minuten
    
  - name: "Redirect Check biszet.com"
    type: HTTP(S)
    url: https://biszet.com
    expected_status: 301
    interval: 60  # Minuten
```

### Alert-Kanäle
- E-Mail (primär)
- SMS (bei kritischen Ausfällen)
- Slack/Teams (optional)

## Nächste Schritte

- [ ] Monitoring-Tools einrichten (UptimeRobot oder vergleichbar)
- [ ] DNS-Alert-System konfigurieren
- [ ] Monatlichen DNS-Check im Kalender eintragen
- [ ] Dokumentation in TECHNOLOGIE-DOKUMENTATION.md referenzieren
- [ ] Notfall-Kontaktliste erstellen und im Team teilen

---

# Incident Report #2: Wildcard SSL-Zertifikat & Host Europe Webhosting Konflikt

**Datum:** 12./13. Januar 2026  
**Betroffene Domains:** biszet.de, biszet.com, beauty-fridge.de, biszet-beauty-fridge.de/com, cosmeticfridge.de  
**Severity:** Kritisch - Website mit SSL-Fehler, mehrere Domains nicht erreichbar

## Problembeschreibung

### Ausgangssituation
- biszet.de auf Netlify gehostet mit externer DNS-Verwaltung über Host Europe Nameserver (ns35/36.domaincontrol.com)
- Mehrere Domain-Aliase in Netlify konfiguriert: biszet.com, beauty-fridge.de, biszet-beauty-fridge.de/com, cosmeticfridge.de
- Alle Domains sollten zu https://biszet.de weiterleiten

### Eingetretene Probleme

#### Problem 1: Wildcard SSL-Zertifikat Validierungsfehler

**Fehlermeldung:**
```
SniCertificate::CertificateNonvalidError: Unable to verify challenge for *.biszet.de
Unable to verify challenge for *.biszet.com, *.beauty-fridge.de, *.biszet-beauty-fridge.de, *.biszet-beauty-fridge.com, *.cosmeticfridge.de
```

**Ursache:**
- Netlify versuchte Wildcard-Zertifikate (`*.domain.de`) für alle konfigurierten Domains auszustellen
- Wildcard-Zertifikate erfordern **DNS-01 Challenge** (nicht HTTP-01)
- Bei extern verwalteten DNS (Host Europe) hat Netlify keinen API-Zugriff für DNS-01-Validierung
- Let's Encrypt Rate Limit erreicht: 5 fehlgeschlagene Versuche in 1 Stunde → Sperre bis 2026-01-12 22:41:58 MEZ

**Auswirkung:**
- SSL-Zertifikat konnte nicht ausgestellt werden
- Website zeitweise mit SSL-Fehler oder nicht erreichbar

#### Problem 2: Host Europe Webhosting überschreibt Netlify

**Fehlermeldung:** Server: Apache (statt Server: nginx/Netlify)

**Ursache:**
- biszet.de war SOWOHL in Netlify (DNS: 75.2.60.5) ALS AUCH im Host Europe Webhosting-Panel konfiguriert
- Host Europe Webhosting-Panel hatte biszet.de als "Verzeichnis → www/no-directory-2017" eingetragen
- Trotz korrektem DNS A-Record auf Netlify-IP fing Host Europe den Traffic ab
- Veraltetes SSL-Zertifikat (mediside.de, abgelaufen 2023) wurde ausgeliefert

**Auswirkung:**
- biszet.de zeigte auf Host Europe Apache-Server statt Netlify
- Falsche/abgelaufene SSL-Zertifikate
- Website nicht korrekt erreichbar

#### Problem 3: DNS-Propagation für Alias-Domains

**Symptom:** beauty-fridge.de, biszet-beauty-fridge.de zeigten `DNS_PROBE_FINISHED_NXDOMAIN`

**Ursache:**
- Nameserver-Umstellung von Netlify DNS (nsone.net) auf Host Europe DNS (domaincontrol.com) war konfiguriert
- ABER: Keine A-Records im Host Europe KIS angelegt
- DNS-Resolver konnten Domain nicht auflösen

**Auswirkung:**
- Mehrere Alias-Domains zeitweise nicht erreichbar
- "Website ist nicht erreichbar" Fehler im Browser

## Implementierte Lösung

### 1. Domain-Konsolidierung in Netlify (External DNS Mode)

**Entfernte Domain-Aliase aus Netlify:**
- ❌ biszet.com
- ❌ beauty-fridge.de
- ❌ biszet-beauty-fridge.de
- ❌ biszet-beauty-fridge.com
- ❌ cosmeticfridge.de
- ❌ www-Varianten aller oben genannten

**Verbleibend in Netlify:**
- ✅ biszet.de (Primary Domain)
- ✅ www.biszet.de

**Gelöschte Netlify DNS Zone:**
- Netlify DNS Zone für biszet.de entfernt
- Netlify erkennt jetzt "External DNS" Mode
- Kein Versuch mehr, Wildcard-Zertifikate auszustellen

**Ergebnis:**
- Netlify stellt nur noch Standard-Zertifikat für biszet.de + www.biszet.de aus ✅
- Keine DNS-01 Challenge mehr erforderlich
- SSL-Zertifikat erfolgreich erneuert (Today at 11:31 PM, Auto-Renewal: Apr 12)

### 2. Host Europe Webhosting-Konfiguration

**Problem:** biszet.de im Webhosting-Panel verursachte Konflikt

**Lösung:**
- Domain biszet.de im Webhosting-Panel belassen
- **AKTIV:** ✅ Enabled
- **IPv6:** ❌ Disabled (KRITISCH!)
- **Verzeichnis:** www/no-directory-2017 (bleibt unverändert, hat keine Auswirkung bei Aktiv+IPv6-disabled)

**Wichtiger Erkenntnisgewinn:**
Das **Deaktivieren von IPv6** im Host Europe Webhosting-Panel war der Schlüssel! IPv6-Routing von Host Europe kollidierte mit Netlify's IPv4-Setup.

### 3. Redirect-Konfiguration für Alias-Domains

**Host Europe Webhosting-Panel Konfiguration:**

| Domain | Typ | Ziel | AKTIV | IPv6 |
|--------|-----|------|-------|------|
| biszet.com | Umleitung | https://biszet.de | ✅ | ❌ |
| beauty-fridge.de | Umleitung | https://biszet.de | ✅ | ❌ |
| biszet-beauty-fridge.de | Umleitung | https://biszet.de | ✅ | ❌ |
| biszet-beauty-fridge.com | Umleitung | https://biszet.de | ✅ | ❌ |
| cosmeticfridge.de | Umleitung | https://biszet.de | ✅ | ❌ |

**DNS-Konfiguration im Host Europe KIS:**

Alle Alias-Domains haben A-Records:
```
biszet.com → 80.237.130.194 (Host Europe Webhosting IP)
www.biszet.com → 80.237.130.194

beauty-fridge.de → 80.237.130.194
www.beauty-fridge.de → 80.237.130.194

biszet-beauty-fridge.de → 80.237.130.194
www.biszet-beauty-fridge.de → 80.237.130.194

biszet-beauty-fridge.com → 80.237.130.194
www.biszet-beauty-fridge.com → 80.237.130.194

cosmeticfridge.de → 80.237.130.194
www.cosmeticfridge.de → 80.237.130.194
```

**Nameserver-Zuordnung:**
- biszet.de: ns35/36.domaincontrol.com
- biszet.com: ns57/58.domaincontrol.com
- beauty-fridge.de: ns73/74.domaincontrol.com
- biszet-beauty-fridge.de: ns49/50.domaincontrol.com
- biszet-beauty-fridge.com: ns05/06.domaincontrol.com
- cosmeticfridge.de: ns05/06.domaincontrol.com

### 4. DNS-Propagation Management

**Herausforderung:** Lokale DNS-Caches hielten alte Netlify-IPs/Nameserver

**Maßnahmen:**
1. ISP-DNS hatte aggressive Caching (bis 48h)
2. Temporäre Umstellung auf Google DNS (8.8.8.8) und Cloudflare DNS (1.1.1.1):
   ```bash
   sudo networksetup -setdnsservers Wi-Fi 8.8.8.8 1.1.1.1
   ```
3. DNS-Cache-Löschung:
   ```bash
   sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
   ```

## Finale Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                    PRIMARY DOMAIN                             │
│  biszet.de → ns35.domaincontrol.com (Host Europe)            │
│    └─ A-Record: 75.2.60.5 (Netlify)                         │
│    └─ CNAME www: 75.2.60.5                                  │
│                                                               │
│  Netlify:                                                    │
│    - Domain: biszet.de, www.biszet.de                       │
│    - SSL: Let's Encrypt Standard-Zertifikat (kein Wildcard) │
│    - Mode: External DNS                                      │
│    - IPv6 in Host Europe Webhosting: DISABLED               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ALIAS DOMAINS                             │
│  biszet.com, beauty-fridge.de, biszet-beauty-fridge.*,      │
│  cosmeticfridge.de                                           │
│    └─ Nameserver: ns*.domaincontrol.com (Host Europe)       │
│    └─ A-Records: 80.237.130.194 (Host Europe Webhosting)   │
│    └─ Host Europe Webhosting: 301 Redirect → https://biszet.de │
│    └─ IPv6: DISABLED                                         │
└─────────────────────────────────────────────────────────────┘

Traffic Flow:
1. User → biszet.com
2. DNS → 80.237.130.194 (Host Europe Webhosting)
3. Host Europe → HTTP 301 → https://biszet.de
4. DNS → 75.2.60.5 (Netlify)
5. Netlify → Next.js App ✅
```

## Root Causes & Lessons Learned

### 1. Wildcard-Zertifikat-Problematik

**Root Cause:** Netlify versucht automatisch Wildcard-Zertifikate auszustellen, wenn Domain-Aliase konfiguriert sind, aber DNS extern verwaltet wird.

**Lesson:** Bei externer DNS-Verwaltung NUR die Hauptdomain in Netlify konfigurieren, niemals Aliase.

### 2. Host Europe Webhosting IPv6-Konflikt

**Root Cause:** Host Europe's IPv6-Routing überschreibt IPv4-basierte externe Hosting-Lösungen wie Netlify.

**Lesson:** Bei Domains, die auf externe Services zeigen (Netlify, Vercel, etc.) MUSS IPv6 im Host Europe Webhosting-Panel deaktiviert werden, auch wenn "AKTIV" enabled bleibt.

### 3. DNS-Propagation bei Provider-Wechsel

**Root Cause:** ISP-DNS-Caches halten alte Werte teilweise 24-48h.

**Lesson:** 
- Für Tests während Umstellung: Google DNS (8.8.8.8) oder Cloudflare DNS (1.1.1.1) verwenden
- Nameserver-Änderungen authoritative prüfen: `dig @ns*.domaincontrol.com domain.de`
- Mobile Hotspot oder VPN für unabhängige Tests nutzen

### 4. "DNS Rules Violation" in Host Europe

**Root Cause:** Wenn Domain im Webhosting-Panel konfiguriert ist, verwaltet Host Europe automatisch die DNS-Einträge.

**Lesson:** Manuelle A-Records im KIS sind nicht erlaubt für Domains im Webhosting-Panel. Webhosting-Konfiguration steuert DNS automatisch.

## Vorbeugende Maßnahmen (Update)

### 1. Netlify-Konfiguration Checklist

**Bei External DNS (Host Europe, GoDaddy, etc.):**
- ✅ Nur Hauptdomain (biszet.de, www.biszet.de) in Netlify konfigurieren
- ❌ KEINE Alias-Domains in Netlify
- ❌ KEINE Netlify DNS Zone verwenden
- ✅ Netlify erkennt "External DNS" Mode
- ✅ SSL-Zertifikat nur für Hauptdomain (Standard-Zertifikat, kein Wildcard)

**Domain Settings Check:**
```
Production domains:
  - biszet.de (Primary)
  - www.biszet.de

Domain aliases:
  - (LEER - alle Aliase über Host Europe redirects)
```

### 2. Host Europe Webhosting-Panel Checklist

**Für Domains mit externem Hosting (Netlify):**
- ✅ **IPv6: DISABLED** (kritisch!)
- ✅ AKTIV: Enabled
- ✅ Typ: Verzeichnis oder Umleitung (je nach Verwendung)

**Für Redirect-Domains:**
- ✅ **IPv6: DISABLED**
- ✅ AKTIV: Enabled
- ✅ Typ: Umleitung → https://hauptdomain.de

### 3. DNS-Monitoring-Erweiterung

**Zusätzliche Checks:**
- [ ] Nameserver-Überwachung für alle Domains
- [ ] A-Record-Monitoring (Änderungen sofort erkennen)
- [ ] SSL-Zertifikat-Expiry-Monitoring (Netlify + Host Europe)
- [ ] IPv6-Status im Webhosting-Panel regelmäßig prüfen

**Empfohlenes Tool:** DNSWatch oder Pingdom Real User Monitoring

### 4. Testing-Workflow nach Domain-Änderungen

**Checkliste:**
1. ✅ DNS authoritative checken: `dig @nameserver domain.de +short`
2. ✅ A-Records für @ und www verifizieren
3. ✅ HTTP-Redirects testen: `curl -I http://domain.de`
4. ✅ HTTPS-Verbindung testen: `curl -I https://domain.de`
5. ✅ SSL-Zertifikat prüfen: `openssl s_client -connect domain.de:443 | openssl x509 -noout -dates -subject`
6. ✅ Inkognito-Browser-Test (umgeht lokale Caches)
7. ✅ Mobile-Hotspot-Test (umgeht ISP-Cache)
8. ✅ Netlify Dashboard: Domain-Status + SSL-Status prüfen

## Technische Details

### Netlify SSL-Zertifikat nach Fix

```
Certificate: Let's Encrypt
Domains: biszet.de, www.biszet.de
Created: May 17, 2024 at 8:53 PM
Updated: Today at 11:31 PM (13. Januar 2026)
Auto-renews before: Apr 12 (in 3 months)
Type: Standard (kein Wildcard)
```

### DNS-Verificaton Commands

**Nameserver prüfen:**
```bash
dig domain.de NS +short
```

**A-Records authoritative prüfen:**
```bash
dig @ns35.domaincontrol.com biszet.de +short
```

**Redirect testen:**
```bash
curl -I http://biszet.com
# Expected: HTTP/1.1 301 Moved Permanently
# Location: https://biszet.de
```

**SSL-Zertifikat prüfen:**
```bash
echo | openssl s_client -connect biszet.de:443 -servername biszet.de 2>/dev/null | \
openssl x509 -noout -dates -subject -issuer
```

**Mit explizitem DNS-Resolver testen:**
```bash
curl --resolve biszet.com:80:80.237.130.194 -I http://biszet.com
```

## Incident Timeline

**12. Januar 2026, 22:30 MEZ**
- Problem erkannt: SSL-Zertifikat Fehler in Netlify
- Fehlermeldung: Wildcard-Zertifikat Validierung fehlgeschlagen

**12. Januar 2026, 22:45 MEZ**
- Let's Encrypt Rate Limit erreicht
- Wartezeit bis 22:45 MEZ für neuen Versuch

**12. Januar 2026, 23:00 - 23:30 MEZ**
- 9 Domain-Aliase aus Netlify entfernt
- Netlify DNS Zone für biszet.de gelöscht
- Netlify wechselt in "External DNS" Mode

**12. Januar 2026, 23:45 MEZ**
- SSL-Zertifikat manuell erneuert in Netlify
- Erfolgreich: Standard-Zertifikat für biszet.de + www

**13. Januar 2026, 00:00 - 01:00 MEZ**
- Problem: biszet.de zeigt auf Host Europe Apache (Server: Apache)
- Ursache identifiziert: Domain im Webhosting-Panel aktiv
- IPv6 im Webhosting-Panel deaktiviert
- ✅ Problem gelöst: biszet.de zeigt wieder auf Netlify

**13. Januar 2026, 01:00 - 02:00 MEZ**
- Alias-Domains konfiguriert (Redirects im Webhosting-Panel)
- DNS A-Records für alle Alias-Domains angelegt
- IPv6 für alle Alias-Domains deaktiviert
- DNS-Propagation gestartet

**13. Januar 2026, 02:00 MEZ**
- Alle Domains funktional (außer lokale DNS-Cache-Probleme)
- 5 von 6 Domains: DNS vollständig propagiert
- biszet.com: DNS-Propagation noch laufend (geschätzt 1-24h)

## Status: Resolved ✅

**Aktuelle Situation (13. Januar 2026, 03:00 MEZ):**
- ✅ biszet.de: Vollständig funktional, SSL korrekt, Netlify serving Next.js App
- ✅ www.biszet.de: Funktional
- ✅ biszet.com: HTTP-Redirect funktioniert (http://biszet.com → https://biszet.de)
- ⚠️ www.biszet.com: HTTP funktioniert, HTTPS nicht (kein SSL-Zertifikat)
- ✅ beauty-fridge.de: Redirect funktioniert
- ✅ biszet-beauty-fridge.de: Redirect funktioniert
- ✅ biszet-beauty-fridge.com: Redirect funktioniert
- ✅ cosmeticfridge.de: Redirect funktioniert

**Für Endnutzer weltweit:** Alle Domains funktionieren (DNS vollständig propagiert).

### Bekannte Einschränkung: www.biszet.com HTTPS

**Problem:**
- ✅ http://biszet.com funktioniert perfekt
- ✅ http://www.biszet.com funktioniert (nach DNS-Propagation)
- ❌ https://www.biszet.com → Connection refused (Port 443 nicht offen)

**Ursache:**
- Host Europe Webhosting hat kein SSL-Zertifikat für biszet.com konfiguriert
- Nur biszet.de hat SSL-Zertifikat im System
- Andere Alias-Domains (beauty-fridge.de, etc.) haben abgelaufene Zertifikate, aber funktionieren trotzdem für Redirects

**Lösung-Optionen:**

1. **SSL-Zertifikat bestellen (2,99 EUR/Jahr):**
   - Host Europe: "Domain SSL" Zertifikat für biszet.com + www.biszet.com
   - Nach Aktivierung: https://www.biszet.com funktioniert
   - Redirect: https://www.biszet.com → 301 → https://biszet.de

2. **Status Quo beibehalten (kostenlos):**
   - http://biszet.com funktioniert bereits perfekt
   - Die meisten Nutzer tippen nur "biszet.com" (ohne www und ohne https)
   - Browser versuchen automatisch HTTP first
   - Nur explizite Eingabe von "https://www.biszet.com" würde fehlschlagen (sehr seltener Edge Case)

3. **Technische Alternative geprüft:**
   - CNAME www.biszet.com → biszet.de würde nicht helfen
   - SNI (Server Name Indication) würde nicht matchen
   - Netlify-Zertifikat gilt nur für biszet.de/www.biszet.de, nicht für *.biszet.com
   - ❌ Keine kostenlose technische Lösung möglich

**Empfehlung:** Option 2 (Status Quo) ist für reine Redirect-Aliase ausreichend. SSL-Zertifikat nur bei explizitem Kundenwunsch.

## Nächste Aktionen

- [ ] ~~24h warten für vollständige DNS-Propagation~~ (läuft automatisch)
- [ ] DNS-Monitoring mit DNSWatch einrichten
- [ ] Monatliche Checkliste: IPv6-Status in Webhosting-Panel prüfen
- [ ] Dokumentation in ZUGAENGE-UEBERSICHT.md aktualisieren
- [ ] Netlify-Konfiguration dokumentieren in README.md
