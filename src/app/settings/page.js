"use client";
import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import NumberInput from '@/components/NumberInput';

export default function SettingsPage() {
  const { 
    employerRefundSettings, 
    setEmployerRefundSettings, 
    generateExampleData,
    stationDistance,
    setStationDistance,
    taxRates,
    setTaxRates
  } = useAppContext();

  // Local state for manual saving
  const [localRefundSettings, setLocalRefundSettings] = useState(employerRefundSettings);
  const [localStationDistance, setLocalStationDistance] = useState(stationDistance);
  const [localTaxRates, setLocalTaxRates] = useState(taxRates);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync with context on mount or when context updates (if no local changes)
  useEffect(() => {
    if (!hasChanges) {
      setLocalRefundSettings(employerRefundSettings);
      setLocalStationDistance(stationDistance);
      setLocalTaxRates(taxRates);
    }
  }, [employerRefundSettings, stationDistance, taxRates, hasChanges]);

  const handleRefundChange = (e) => {
    const { name, value } = e.target;
    setLocalRefundSettings(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
    setHasChanges(true);
  };

  const handleTaxRateChange = (e) => {
    const { name, value } = e.target;
    setLocalTaxRates(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
    setHasChanges(true);
  };

  const handleDistanceChange = (e) => {
    setLocalStationDistance(parseFloat(e.target.value) || 0);
    setHasChanges(true);
  };

  const handleSave = () => {
    setEmployerRefundSettings(localRefundSettings);
    setStationDistance(localStationDistance);
    setTaxRates(localTaxRates);
    setHasChanges(false);
  };

  return (
    <div className="space-y-8 py-8 container-custom pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <p className="text-muted-foreground max-w-2xl">Spezialisiert für Fahrzeugüberführer: Konfigurieren Sie Ihren festen Arbeitsweg zum lokalen Bahnhof.</p>
        
        <button 
          onClick={handleSave}
          disabled={!hasChanges}
          className={`btn-primary transition-all duration-300 ${
            hasChanges 
              ? 'opacity-100 translate-y-0 shadow-lg shadow-primary/20' 
              : 'opacity-50 translate-y-0 cursor-not-allowed bg-muted text-muted-foreground hover:bg-muted'
          }`}
        >
          {hasChanges ? 'Änderungen speichern' : 'Gespeichert'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Arbeitsweg - Most important personal setting */}
        <div className="card-modern">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Fahrweg</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Konfigurieren Sie Ihre tägliche Pendelstrecke. Diese wird automatisch jedem Arbeitstag hinzugefügt.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Einfache Strecke (km)</label>
              <NumberInput
                step="0.1"
                className="input-modern"
                value={localStationDistance}
                onChange={handleDistanceChange}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Entfernung zum Arbeitsort/Bahnhof. Wird automatisch verdoppelt (Hin- & Rückweg).
              </p>
            </div>
          </div>
        </div>

        {/* 2. Fleet Erstattung - Job specific settings */}
        <div className="card-modern">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Fleet Erstattung</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Legen Sie fest, ab wann und in welcher Höhe eine Erstattung durch den Arbeitgeber automatisch eingetragen wird.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Stunden-Schwellenwert (ab)</label>
              <NumberInput
                step="0.1"
                name="thresholdHours"
                className="input-modern"
                value={localRefundSettings.thresholdHours}
                onChange={handleRefundChange}
              />
              <p className="text-xs text-muted-foreground mt-1">Beispiel: 8.5 für "ab 8,5 Stunden"</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Erstattungsbetrag (€)</label>
              <NumberInput
                step="0.01"
                name="amount"
                className="input-modern"
                value={localRefundSettings.amount}
                onChange={handleRefundChange}
              />
              <p className="text-xs text-muted-foreground mt-1">Betrag, der automatisch eingetragen wird.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Erstattung pro km (€)</label>
              <NumberInput
                step="0.01"
                name="mileageRefundRate"
                className="input-modern"
                value={localRefundSettings.mileageRefundRate || 0}
                onChange={handleRefundChange}
              />
              <p className="text-xs text-muted-foreground mt-1">Vom Arbeitgeber erstattet (mindert Werbungskosten)</p>
            </div>
          </div>
        </div>

        {/* 3. Gesetzliche Pauschalen - Global tax rules */}
        <div className="card-modern">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Gesetzliche Pauschalen</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Passen Sie die steuerlichen Pauschalen an, falls sich die Gesetzeslage ändert.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Verpflegungspauschale (ab 8h)</label>
              <NumberInput
                step="0.5"
                name="mealRate8h"
                className="input-modern"
                value={localTaxRates.mealRate8h}
                onChange={handleTaxRateChange}
              />
              <p className="text-xs text-muted-foreground mt-1">Aktuell: 14,00 €</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Verpflegungspauschale (24h)</label>
              <NumberInput
                step="0.5"
                name="mealRate24h"
                className="input-modern"
                value={localTaxRates.mealRate24h}
                onChange={handleTaxRateChange}
              />
              <p className="text-xs text-muted-foreground mt-1">Aktuell: 28,00 €</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Fahrzeugpauschalen (€/km)</label>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">PKW</label>
                  <NumberInput
                    step="0.01"
                    name="mileageRateCar"
                    className="input-modern"
                    value={localTaxRates.mileageRateCar || 0.30}
                    onChange={handleTaxRateChange}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Motorrad / Roller</label>
                  <NumberInput
                    step="0.01"
                    name="mileageRateMotorcycle"
                    className="input-modern"
                    value={localTaxRates.mileageRateMotorcycle || 0.20}
                    onChange={handleTaxRateChange}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Fahrrad / E-Bike</label>
                  <NumberInput
                    step="0.01"
                    name="mileageRateBike"
                    className="input-modern"
                    value={localTaxRates.mileageRateBike || 0.05}
                    onChange={handleTaxRateChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">GWG-Grenze (Brutto €)</label>
              <NumberInput
                step="1"
                name="gwgLimit"
                className="input-modern"
                value={localTaxRates.gwgLimit || 952}
                onChange={handleTaxRateChange}
              />
              <p className="text-xs text-muted-foreground mt-1">Aktuell: {taxRates.gwgLimit || 952} €</p>
            </div>
          </div>
        </div>

        {/* 4. Entwickler-Optionen - Least important */}
        <div className="card-modern">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Entwickler-Optionen</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Generieren Sie Testdaten, um die Funktionalität der App zu prüfen.
          </p>
          <button 
            onClick={() => {
              generateExampleData();
              alert('Beispieldaten wurden hinzugefügt!');
            }}
            className="btn-secondary w-full"
          >
            Beispieldaten generieren
          </button>
        </div>
      </div>
    </div>
  );
}
