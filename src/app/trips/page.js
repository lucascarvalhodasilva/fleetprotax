"use client";
import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import NumberInput from '@/components/NumberInput';

export default function TripsPage() {
  const { 
    mealEntries, 
    addMealEntry, 
    deleteMealEntry, 
    employerRefundSettings, 
    addMileageEntry,
    mileageEntries,
    deleteMileageEntry,
    stationDistance,
    selectedYear,
    taxRates
  } = useAppContext();
  
  const [formData, setFormData] = useState({
    date: '',
    endDate: '',
    startTime: '',
    endTime: '',
    employerExpenses: 0,
    vehicleType: 'car' // 'car', 'motorcycle', 'bike'
  });
  const [autoAddStationTrips, setAutoAddStationTrips] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Load saved form data from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('MEALS_FORM_DATA');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, []);

  // Save form data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('MEALS_FORM_DATA', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    // Always enable auto-add if station distance is set
    if (stationDistance > 0) {
      setAutoAddStationTrips(true);
    }
  }, [stationDistance]);

  const calculateAllowance = (startDateStr, startTimeStr, endDateStr, endTimeStr) => {
    // If no end date is provided, assume same day (or next day if time is earlier, handled by logic below if we want)
    // But now we have explicit end date field.
    
    const start = new Date(`${startDateStr}T${startTimeStr}`);
    const end = new Date(`${endDateStr || startDateStr}T${endTimeStr}`);
    
    let diff = (end - start) / 1000 / 60 / 60; // hours
    
    // Fallback for legacy behavior if endDate is missing but time wraps (though with explicit field this is less needed)
    if (diff < 0 && !endDateStr) diff += 24; 

    let rate = 0;
    if (diff >= 24) rate = taxRates.mealRate24h;
    else if (diff >= 8) rate = taxRates.mealRate8h;

    return { duration: diff, rate };
  };

  // Check if refund should be suggested
  const isRefundSuggested = () => {
    if (!formData.date || !formData.startTime || !formData.endTime) return false;
    const { duration } = calculateAllowance(formData.date, formData.startTime, formData.endDate, formData.endTime);
    return duration >= employerRefundSettings.thresholdHours;
  };

  const getCurrentDuration = () => {
    if (!formData.date || !formData.startTime || !formData.endTime) return 0;
    const { duration } = calculateAllowance(formData.date, formData.startTime, formData.endDate, formData.endTime);
    return duration;
  };

  const toggleRefund = () => {
    if (parseFloat(formData.employerExpenses) > 0) {
      setFormData(prev => ({ ...prev, employerExpenses: 0 }));
    } else {
      setFormData(prev => ({ ...prev, employerExpenses: employerRefundSettings.amount }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { duration, rate } = calculateAllowance(formData.date, formData.startTime, formData.endDate, formData.endTime);
    const deductible = Math.max(0, rate - parseFloat(formData.employerExpenses));

    addMealEntry({
      ...formData,
      endDate: formData.endDate || formData.date, // Ensure endDate is saved
      duration,
      rate,
      deductible: parseFloat(deductible.toFixed(2))
    });

    // Auto-add station trips
    if (autoAddStationTrips && stationDistance > 0) {
      let ratePerKm = 0.30;
      if (formData.vehicleType === 'motorcycle') ratePerKm = taxRates.mileageRateMotorcycle || 0.20;
      else if (formData.vehicleType === 'bike') ratePerKm = taxRates.mileageRateBike || 0.05;
      else ratePerKm = taxRates.mileageRateCar || 0.30;

      const effectiveRate = Math.max(0, ratePerKm - (employerRefundSettings.mileageRefundRate || 0));
      const allowance = parseFloat((stationDistance * effectiveRate).toFixed(2));
      
      // Trip to station (Start Date)
      addMileageEntry({
        date: formData.date,
        startLocation: 'Zuhause',
        endLocation: 'Bahnhof',
        distance: stationDistance,
        totalKm: stationDistance,
        allowance: allowance,
        vehicleType: formData.vehicleType,
        purpose: 'Fahrt zum Bahnhof (Dienstreise Beginn)'
      });

      // Trip from station (End Date)
      addMileageEntry({
        date: formData.endDate || formData.date,
        startLocation: 'Bahnhof',
        endLocation: 'Zuhause',
        distance: stationDistance,
        totalKm: stationDistance,
        allowance: allowance,
        vehicleType: formData.vehicleType,
        purpose: 'Fahrt vom Bahnhof (Dienstreise Ende)'
      });
    }

    setFormData({ ...formData, startTime: '', endTime: '', endDate: '', employerExpenses: 0, vehicleType: 'car' });
  };

  const filteredMealEntries = mealEntries.filter(entry => new Date(entry.date).getFullYear() === parseInt(selectedYear));

  return (
    <div className="space-y-8 py-8 container-custom">
      <p className="text-muted-foreground">Tragen Sie Ihre Abwesenheitszeiten ein – Verpflegungspauschalen und Fahrtkosten werden automatisch ermittelt.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="space-y-6 lg:col-span-1">
          <div className="card-modern">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Neuer Eintrag</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section: Reisezeitraum */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Reisezeitraum</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Start</label>
                    <input
                      type="date"
                      required
                      className="input-modern text-sm"
                      value={formData.date}
                      onChange={e => {
                        const newDate = e.target.value;
                        if (!formData.endDate || formData.endDate < newDate) {
                          setFormData({...formData, date: newDate, endDate: newDate});
                        } else {
                          setFormData({...formData, date: newDate});
                        }
                      }}
                    />
                    <input
                      type="time"
                      required
                      className="input-modern text-sm"
                      value={formData.startTime}
                      onChange={e => setFormData({...formData, startTime: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Ende</label>
                    <input
                      type="date"
                      required
                      className="input-modern text-sm"
                      min={formData.date}
                      value={formData.endDate || formData.date}
                      onChange={e => setFormData({...formData, endDate: e.target.value})}
                    />
                    <input
                      type="time"
                      required
                      className="input-modern text-sm"
                      value={formData.endTime}
                      onChange={e => setFormData({...formData, endTime: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Section: Arbeitsweg */}
              {stationDistance > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <h3 className="text-sm font-medium text-foreground">Arbeitsweg</h3>
                    <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded text-muted-foreground">
                      {stationDistance * 2} km
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Fahrzeug für Bahnhofsfahrt</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, vehicleType: 'car'})}
                        className={`p-2 rounded-lg border text-xs font-medium transition-all flex flex-col items-center gap-1 ${
                          formData.vehicleType === 'car' 
                            ? 'bg-primary/10 text-primary border-primary' 
                            : 'bg-card hover:bg-secondary border-border text-muted-foreground'
                        }`}
                      >
                        <span>Auto</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, vehicleType: 'motorcycle'})}
                        className={`p-2 rounded-lg border text-xs font-medium transition-all flex flex-col items-center gap-1 ${
                          formData.vehicleType === 'motorcycle' 
                            ? 'bg-primary/10 text-primary border-primary' 
                            : 'bg-card hover:bg-secondary border-border text-muted-foreground'
                        }`}
                      >
                        <span>Motorrad</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, vehicleType: 'bike'})}
                        className={`p-2 rounded-lg border text-xs font-medium transition-all flex flex-col items-center gap-1 ${
                          formData.vehicleType === 'bike' 
                            ? 'bg-primary/10 text-primary border-primary' 
                            : 'bg-card hover:bg-secondary border-border text-muted-foreground'
                        }`}
                      >
                        <span>Fahrrad</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Section: Fleet Spesen */}
              {getCurrentDuration() >= 8 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <h3 className="text-sm font-medium text-foreground">Erstattung</h3>
                    {isRefundSuggested() && (
                      <button
                          type="button"
                          onClick={toggleRefund}
                          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full transition-all ${
                              parseFloat(formData.employerExpenses) > 0 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-primary/20 text-primary hover:bg-primary/30'
                          }`}
                      >
                          {parseFloat(formData.employerExpenses) > 0 ? 'Aktiv' : 'Vorschlag anwenden'}
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Fleet Spesen (Arbeitgeber)</label>
                    <div className="relative">
                      <NumberInput
                          step="0.01"
                          className="input-modern pr-8"
                          value={formData.employerExpenses}
                          onChange={e => setFormData({...formData, employerExpenses: e.target.value})}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full btn-primary py-3 mt-4 shadow-lg shadow-primary/20">
                Eintrag hinzufügen
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: List */}
        <div className="lg:col-span-2">
          <div className="card-modern h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-foreground">Einträge</h2>
              <button 
                onClick={() => setIsFullScreen(true)}
                className="text-xs bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Vollbild
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-modern">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap min-w-[110px]">Datum</th>
                    <th className="whitespace-nowrap min-w-[130px]">Zeit</th>
                    <th className="whitespace-nowrap">Dauer</th>
                    <th className="whitespace-nowrap">Gesamt</th>
                    <th className="w-[80px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMealEntries.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted-foreground py-8">Keine Einträge für {selectedYear} vorhanden.</td>
                    </tr>
                  ) : (
                    filteredMealEntries.map(entry => {
                      // Find associated mileage entries for this date range
                      const dayMileage = mileageEntries.filter(m => m.date === entry.date || m.date === entry.endDate);
                      const tripTo = dayMileage.find(m => m.date === entry.date && m.purpose && m.purpose.includes('Beginn'));
                      const tripFrom = dayMileage.find(m => (m.date === (entry.endDate || entry.date)) && m.purpose && m.purpose.includes('Ende'));
                      
                      const amountTo = tripTo ? tripTo.allowance : 0;
                      const amountFrom = tripFrom ? tripFrom.allowance : 0;
                      const totalDeductible = entry.deductible + amountTo + amountFrom;

                      const isMultiDay = entry.endDate && entry.endDate !== entry.date;

                      return (
                        <tr key={entry.id}>
                          <td className="whitespace-nowrap font-medium">
                            {entry.date}
                            {isMultiDay && <span className="text-xs text-muted-foreground block">bis {entry.endDate}</span>}
                          </td>
                          <td className="whitespace-nowrap">{entry.startTime} - {entry.endTime}</td>
                          <td className="whitespace-nowrap">{entry.duration.toFixed(1)} h</td>
                          <td className="whitespace-nowrap font-bold text-primary">{totalDeductible.toFixed(2)} €</td>
                          <td className="text-right whitespace-nowrap">
                            <button 
                              onClick={() => {
                                deleteMealEntry(entry.id);
                                // Also delete associated mileage entries
                                dayMileage.forEach(m => deleteMileageEntry(m.id));
                              }} 
                              className="text-destructive hover:text-destructive/80 text-sm font-medium transition-colors"
                            >
                              Löschen
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isFullScreen && (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-between items-center p-4 border-b border-border bg-card/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold">Detaillierte Ansicht ({selectedYear})</h2>
              <span className="text-xs text-muted-foreground hidden sm:inline-block bg-secondary px-2 py-1 rounded">
                Für beste Ansicht Gerät ins Querformat drehen
              </span>
            </div>
            <button 
              onClick={() => setIsFullScreen(false)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-4 bg-secondary/10">
            <div className="min-w-[1000px] bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
                  <tr>
                    <th className="p-3">Datum</th>
                    <th className="p-3">Zeitraum</th>
                    <th className="p-3">Dauer</th>
                    <th className="p-3">Pauschale</th>
                    <th className="p-3">Erstattung (AG)</th>
                    <th className="p-3">Verpflegung (Absetzbar)</th>
                    <th className="p-3">Fahrtkosten (Station)</th>
                    <th className="p-3 text-right">Gesamt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredMealEntries.map(entry => {
                    const dayMileage = mileageEntries.filter(m => m.date === entry.date || m.date === entry.endDate);
                    const tripTo = dayMileage.find(m => m.date === entry.date && m.purpose && m.purpose.includes('Beginn'));
                    const tripFrom = dayMileage.find(m => (m.date === (entry.endDate || entry.date)) && m.purpose && m.purpose.includes('Ende'));
                    
                    const amountTo = tripTo ? tripTo.allowance : 0;
                    const amountFrom = tripFrom ? tripFrom.allowance : 0;
                    const stationTotal = amountTo + amountFrom;
                    const totalDeductible = entry.deductible + stationTotal;
                    const isMultiDay = entry.endDate && entry.endDate !== entry.date;

                    return (
                      <tr key={entry.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="p-3 font-medium">
                          {entry.date}
                          {isMultiDay && <span className="text-xs text-muted-foreground block">bis {entry.endDate}</span>}
                        </td>
                        <td className="p-3">{entry.startTime} - {entry.endTime}</td>
                        <td className="p-3">{entry.duration.toFixed(1)} h</td>
                        <td className="p-3">{entry.rate.toFixed(2)} €</td>
                        <td className="p-3 text-red-500">-{entry.employerExpenses.toFixed(2)} €</td>
                        <td className="p-3 text-emerald-600 font-medium">{entry.deductible.toFixed(2)} €</td>
                        <td className="p-3 text-muted-foreground">
                          {stationTotal > 0 ? `+${stationTotal.toFixed(2)} €` : '-'}
                        </td>
                        <td className="p-3 text-right font-bold text-primary">{totalDeductible.toFixed(2)} €</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
