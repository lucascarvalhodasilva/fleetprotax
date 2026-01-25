# 🔧 Fehlerbehebung

Lösungen für **häufige Probleme** und **technische Schwierigkeiten** mit der Fleet-Steuer App.

---

## 📋 Inhaltsverzeichnis

- [Installation & Start](#installation--start)
- [Belege & Fotos](#belege--fotos)
- [Berechnungen](#berechnungen)
- [Backup & Wiederherstellung](#backup--wiederherstellung)
- [Performance & Speicher](#performance--speicher)
- [Plattform-spezifisch](#plattform-spezifisch)

---

## Installation & Start

### Problem: App lässt sich nicht installieren (iOS)

**Symptom:**  
"App kann nicht installiert werden" oder "Profil nicht vertraut".

**Lösung 1: Speicherplatz prüfen**
```
Einstellungen → Allgemein → iPhone-Speicher
→ Mindestens 200 MB frei lassen
```

**Lösung 2: Profil vertrauen (Enterprise-App)**
```
1. Einstellungen → Allgemein → VPN & Geräteverwaltung
2. Profil auswählen
3. "Vertrauen" antippen
```

**Lösung 3: App Store-Cache**
```
1. App Store schließen (nach oben wischen)
2. iPhone neu starten
3. App Store neu öffnen
4. Erneut installieren
```

### Problem: App lässt sich nicht installieren (Android)

**Symptom:**  
"Installation fehlgeschlagen" oder "Parse error".

**Lösung 1: Unbekannte Quellen**
```
1. Einstellungen → Sicherheit
2. "Unbekannte Quellen" aktivieren (nur für Installation)
3. Nach Installation wieder deaktivieren
```

**Lösung 2: Play Store-Dienste**
```
1. Einstellungen → Apps → Google Play Store
2. Speicher → Cache leeren
3. Daten löschen (Achtung: Einstellungen zurückgesetzt)
4. Neu versuchen
```

**Lösung 3: APK neu herunterladen**
```
Möglicherweise beschädigte Datei → Erneut herunterladen
```

### Problem: App startet nicht / stürzt sofort ab

**Symptom:**  
App öffnet sich kurz und schließt sofort.

**Lösung 1: Cache leeren (Android)**
```
1. Einstellungen → Apps → Fleet-Steuer
2. Speicher → Cache leeren
3. App neu starten
```

**Lösung 2: App neu installieren**
```
1. WICHTIG: Zuerst Backup erstellen!
2. App deinstallieren
3. Gerät neu starten
4. App neu installieren
5. Backup wiederherstellen
```

**Lösung 3: Betriebssystem aktualisieren**
```
iOS: Einstellungen → Allgemein → Softwareupdate
Android: Einstellungen → System → Systemupdate
```

**Lösung 4: Geräte-Neustart**
```
Einfachster Schritt: Gerät komplett aus- und einschalten
```

### Problem: App lädt nicht (Web)

**Symptom:**  
Endloses Laden oder weißer Bildschirm.

**Lösung 1: JavaScript aktivieren**
```
Chrome: Einstellungen → Datenschutz → Website-Einstellungen → JavaScript → Aktiviert
Firefox: about:config → javascript.enabled → true
Safari: Einstellungen → Sicherheit → JavaScript aktivieren
```

**Lösung 2: Browser-Cache leeren**
```
Chrome: Strg+Shift+Entf → Cache leeren
Firefox: Strg+Shift+Entf → Cache leeren
Safari: Entwickler → Cache leeren
```

**Lösung 3: Inkognito-Modus testen**
```
Strg+Shift+N (Chrome) oder Strg+Shift+P (Firefox)
→ Testet, ob Erweiterungen/Cache das Problem sind
```

**Lösung 4: Anderen Browser versuchen**
```
Chrome → Firefox → Safari → Edge
```

---

## Belege & Fotos

### Problem: Belege werden nicht hochgeladen

**Symptom:**  
"Fehler beim Hochladen" oder nichts passiert.

**Lösung 1: Dateigröße prüfen**
```
Maximum: ~10 MB pro Datei
Lösung: Foto komprimieren oder Qualität reduzieren
```

**Lösung 2: Berechtigungen prüfen**

**iOS:**
```
Einstellungen → Fleet-Steuer → Fotos → Alle Fotos
Einstellungen → Fleet-Steuer → Kamera → Aktiviert
```

**Android:**
```
Einstellungen → Apps → Fleet-Steuer → Berechtigungen
→ Kamera: Erlaubt
→ Speicher: Erlaubt
```

**Lösung 3: Format prüfen**
```
Unterstützt: JPG, PNG, PDF
Nicht unterstützt: BMP, TIFF, RAW, etc.
```

**Lösung 4: Speicherplatz**
```
Gerät: Mindestens 100 MB frei
App-Speicher: Unter 1 GB (sonst App-Daten löschen)
```

### Problem: Kamera funktioniert nicht

**Symptom:**  
Schwarzer Bildschirm oder Fehlermeldung.

**Lösung 1: App-Berechtigungen**
```
Einstellungen → Fleet-Steuer → Kamera → Erlauben
```

**Lösung 2: Kamera-App testen**
```
Normale Kamera-App öffnen → Funktioniert sie?
Falls nein: Geräteproblem, nicht App-Problem
```

**Lösung 3: App neu starten**
```
App schließen (nicht nur minimieren) → Neu öffnen
```

**Lösung 4: Andere Methode nutzen**
```
Statt Kamera: "Datei auswählen" → Aus Galerie
```

### Problem: Belege werden nicht angezeigt

**Symptom:**  
Beleg hochgeladen, aber nicht sichtbar.

**Lösung 1: Synchronisation abwarten**
```
Bei großen Dateien: 5-10 Sekunden warten
```

**Lösung 2: Liste aktualisieren**
```
Nach unten ziehen (Pull-to-Refresh)
Oder: Modul schließen und neu öffnen
```

**Lösung 3: Beleg erneut hochladen**
```
Eintrag bearbeiten → Beleg erneut hochladen
```

### Problem: PDF wird nicht angezeigt

**Symptom:**  
PDF hochgeladen, aber nur Ladebalken oder Fehler.

**Lösung 1: Große PDFs**
```
PDFs > 5 MB können langsam laden → Geduld!
Ladebalken läuft → Warten
```

**Lösung 2: PDF komprimieren**
```
Externe Tools:
- smallpdf.com
- ilovepdf.com
- Adobe Acrobat (Komprimierung)
```

**Lösung 3: Als Bild speichern**
```
Screenshot vom PDF machen → Als JPG hochladen
Schneller als natives PDF
```

---

## Berechnungen

### Problem: Verpflegungspauschale ist €0 statt €14

**Symptom:**  
Fahrt über 8 Stunden, aber keine Verpflegung berechnet.

**Lösung 1: Dauer prüfen**
```
Abfahrt: 09:00
Ankunft: 17:00
Dauer: Exakt 8 Stunden → NICHT > 8!

Lösung: Mindestens 8 Stunden und 1 Minute
```

**Lösung 2: Tagesfahrt vs. Mehrtägig**
```
Tagesfahrt: Häkchen "Tagesfahrt" gesetzt?
Mehrtägig: Von/Bis-Datum korrekt?
```

**Lösung 3: Steuersätze prüfen**
```
Einstellungen → Steuersätze
8+ Stunden: €14,00 (Standard)
24 Stunden: €28,00 (Standard)
```

### Problem: Kilometergeld zu niedrig

**Symptom:**  
€0,20 statt €0,30 pro km.

**Lösung:**  
Falsches Verkehrsmittel ausgewählt!

```
PKW: €0,30/km ✅
Motorrad: €0,20/km (korrekt für Motorrad)
Fahrrad: €0,05/km (korrekt für Fahrrad)

→ Fahrt bearbeiten → PKW auswählen
```

### Problem: Grand Total stimmt nicht

**Symptom:**  
Dashboard-Summe passt nicht.

**Checkliste:**

1. **Richtiges Jahr ausgewählt?**
   ```
   Dashboard oben: Jahr-Dropdown prüfen
   ```

2. **Arbeitgeber-Spesen eingetragen?**
   ```
   Fahrten → Monatliche Spesen
   → Werden vom Grand Total ABGEZOGEN
   ```

3. **Private Ausgaben verwechselt?**
   ```
   Private Ausgaben zählen NICHT zum Grand Total
   → Nur in "Private Bilanz"
   ```

4. **Filter aktiv?**
   ```
   In Modulen: Suchfeld leer?
   Jahresfilter korrekt?
   ```

### Problem: Abschreibung falsch berechnet

**Symptom:**  
Erwartete Abschreibung passt nicht.

**Lösung: Pro-Rata-Berechnung verstehen**

**Beispiel:**  
Laptop €1.500, gekauft 15.03.2026

**Erwartet (falsch):**  
€1.500 ÷ 3 = €500 pro Jahr

**Korrekt:**  
€1.500 ÷ 36 Monate = €41,67 pro Monat  
März-Dezember = 10 Monate  
€41,67 × 10 = **€416,70** im ersten Jahr

**App berechnet korrekt!**

---

## Backup & Wiederherstellung

### Problem: Backup-Erstellung schlägt fehl

**Symptom:**  
"Fehler beim Erstellen" oder Download startet nicht.

**Lösung 1: Speicherplatz**
```
Gerät: Mindestens 500 MB frei
Downloads-Ordner: Zugriff erlauben
```

**Lösung 2: Berechtigungen (Android)**
```
Einstellungen → Apps → Fleet-Steuer → Berechtigungen
→ Speicher: Erlaubt
→ Dateien: Erlaubt
```

**Lösung 3: Pop-up-Blocker (Web)**
```
Browser: Pop-ups für diese Seite erlauben
Download-Sperre aufheben
```

**Lösung 4: Kleineres Backup**
```
Alte Belege löschen → Backup kleiner → Funktioniert
Danach vollständiges Backup mit allen Belegen
```

### Problem: Backup-Wiederherstellung funktioniert nicht

**Symptom:**  
"Fehler beim Importieren" oder "Datei beschädigt".

**Lösung 1: Dateiformat prüfen**
```
Muss .zip sein
Nicht entpackt importieren!
```

**Lösung 2: Datei neu herunterladen**
```
Backup möglicherweise beschädigt beim Download
→ Von Cloud/PC erneut übertragen
```

**Lösung 3: Backup-Version**
```
Altes Backup von veralteter App-Version?
→ App aktualisieren
→ Neueres Backup verwenden
```

**Lösung 4: Manueller Import (Notfall)**
```
1. Backup als .zip entpacken (PC)
2. JSON-Dateien prüfen
3. Kontakt Support für manuellen Import
```

### Problem: Nach Wiederherstellung fehlen Belege

**Symptom:**  
Daten da, aber Fotos fehlen.

**Lösung 1: Vollständige Wiederherstellung abwarten**
```
Große Backups: 30-60 Sekunden
Progress-Bar: Nicht abbrechen!
```

**Lösung 2: Backup-Integrität prüfen**
```
Backup-ZIP entpacken (PC):
→ Ordner "belege" vorhanden?
→ Fotos darin?

Falls nein: Backup beim Erstellen war unvollständig
```

**Lösung 3: Speicherplatz beim Import**
```
Genug Platz für alle Belege?
Beispiel: 50 Fotos × 2 MB = 100 MB nötig
```

---

## Performance & Speicher

### Problem: App läuft langsam

**Symptom:**  
Verzögerungen, Ruckeln, lange Ladezeiten.

**Lösung 1: Alte Einträge archivieren**
```
1. Backup erstellen (alte Daten sichern)
2. Alte Jahre löschen (nur aktuelles Jahr behalten)
3. Performance deutlich besser
```

**Lösung 2: Belege komprimieren**
```
Große Fotos/PDFs → Speicher voll
Lösung: Belege extern archivieren, aus App löschen
```

**Lösung 3: App-Cache leeren (Android)**
```
Einstellungen → Apps → Fleet-Steuer → Speicher
→ Cache leeren (NICHT Daten löschen!)
```

**Lösung 4: Gerät neu starten**
```
Viele Apps offen → RAM voll
Neustart räumt Arbeitsspeicher auf
```

### Problem: "Nicht genug Speicherplatz"

**Symptom:**  
Beim Backup oder Beleg-Upload.

**Lösung 1: Speicher freigeben**
```
iOS: Einstellungen → Allgemein → iPhone-Speicher
Android: Einstellungen → Speicher

Löschen:
- Alte Apps
- Videos/Fotos (in Cloud sichern)
- Downloads
```

**Lösung 2: Belege extern archivieren**
```
1. Belege exportieren (ZIP)
2. Auf PC/Cloud speichern
3. Aus App löschen
4. Bei Bedarf: Backup wiederherstellen
```

**Lösung 3: SD-Karte (Android)**
```
App auf SD-Karte verschieben:
Einstellungen → Apps → Fleet-Steuer
→ Speicher → Auf SD-Karte verschieben
```

### Problem: App nutzt zu viel Speicher

**Symptom:**  
App zeigt mehrere GB Speicherverbrauch.

**Ursache:**  
Viele Belege (Fotos/PDFs).

**Lösung 1: Belege archivieren**
```
Siehe oben: Belege exportieren → Löschen
```

**Lösung 2: Foto-Qualität reduzieren**
```
Kamera-App: Niedrigere Auflösung einstellen
Statt 12 MP → 5 MP (ausreichend für Belege)
```

**Lösung 3: Screenshots statt PDFs**
```
PDFs oft größer als Screenshots
→ PDF-Seiten screenshotten → Als JPG hochladen
```

---

## Plattform-spezifisch

### iOS-spezifisch

#### Problem: Face ID / Touch ID funktioniert nicht

**Lösung:**
```
iOS-Einstellungen → Face ID & Code
→ Fleet-Steuer: Aktiviert?
```

#### Problem: Backup wird nicht in Dateien angezeigt

**Lösung:**
```
1. Backup-Download erneut starten
2. In "Downloads" suchen (Dateien-App)
3. Oder: Share-Funktion nutzen → Direkt in Cloud speichern
```

### Android-spezifisch

#### Problem: Akkuoptimierung schließt App

**Lösung:**
```
Einstellungen → Apps → Fleet-Steuer → Akku
→ Akkuoptimierung: Deaktivieren
→ Verhindert vorzeitiges Schließen
```

#### Problem: Berechtigungen werden zurückgesetzt

**Lösung:**
```
Einstellungen → Apps → Fleet-Steuer → Berechtigungen
→ Alle auf "Erlaubt" (nicht "Nur während Nutzung")
```

### Web-spezifisch

#### Problem: Offline-Modus funktioniert nicht

**Lösung:**
```
1. PWA installieren (nicht nur Bookmark)
2. Service Worker erlauben (Browser-Einstellungen)
3. Einmal online öffnen → Dann offline nutzbar
```

#### Problem: Browser-Daten gelöscht → Alle Daten weg

**Prävention:**
```
WICHTIG: Regelmäßig Backups erstellen!
Browser-Daten löschen = App-Daten weg

Backup wöchentlich:
Einstellungen → Backup → In Cloud speichern
```

---

## 🆘 Support kontaktieren

**Wenn nichts hilft:**

1. **Fehlermeldung** notieren (Screenshot machen)
2. **Geräteinfo** bereithalten:
   - Gerätetyp (z.B. "iPhone 14 Pro")
   - OS-Version (z.B. "iOS 17.2")
   - App-Version (Einstellungen → Über)

3. **Schritte dokumentieren:**
   - Was haben Sie versucht?
   - Welche Fehlermeldung kam?
   - Wann trat das Problem auf?

4. **Kontakt:**
   - 📧 E-Mail: support@fleet-steuer.de
   - 📞 Telefon: +49 (0) 123 456789
   - ⏰ Support-Zeiten: Mo-Fr, 9-17 Uhr

**Antwortzeit:** Üblicherweise innerhalb 24 Stunden.

---

**Zurück zu [FAQ](faq.md) | Zurück zur [Übersicht](README.md)**
