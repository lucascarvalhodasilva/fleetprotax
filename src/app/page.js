"use client";
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';

export default function Dashboard() {
  const { mealEntries, mileageEntries, equipmentEntries, selectedYear } = useAppContext();

  // Filter entries by selected year
  const filteredMeals = mealEntries.filter(e => new Date(e.date).getFullYear() === selectedYear);
  const filteredMileage = mileageEntries.filter(e => new Date(e.date).getFullYear() === selectedYear);
  const filteredEquipment = equipmentEntries.filter(e => new Date(e.date).getFullYear() === selectedYear);

  const totalMeals = filteredMeals.reduce((sum, entry) => sum + entry.deductible, 0);
  const totalMileage = filteredMileage.reduce((sum, entry) => sum + entry.allowance, 0);
  const totalEquipment = filteredEquipment.reduce((sum, entry) => sum + entry.deductibleAmount, 0);
  const grandTotal = totalMeals + totalMileage + totalEquipment;

  return (
    <div className="space-y-4 py-4 md:space-y-6 md:py-6 container-custom">
      <div className="flex justify-between items-center">
        <p className="text-sm md:text-base text-muted-foreground">Übersicht Ihrer steuerlichen Absetzungen für {selectedYear}.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="card-modern p-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Verpflegung</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-foreground">{totalMeals.toFixed(2)} €</span>
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{filteredMeals.length} Einträge</p>
        </div>

        <div className="card-modern p-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fahrtkosten</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-foreground">{totalMileage.toFixed(2)} €</span>
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{filteredMileage.length} Fahrten</p>
        </div>

        <div className="card-modern p-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Arbeitsmittel</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-foreground">{totalEquipment.toFixed(2)} €</span>
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{filteredEquipment.length} Gegenstände</p>
        </div>

        <div className="card-modern bg-primary/10 border-primary/20 p-4">
          <h3 className="text-xs font-medium text-primary uppercase tracking-wider">Gesamt Absetzbar</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-primary">{grandTotal.toFixed(2)} €</span>
          </div>
          <p className="text-[10px] md:text-xs text-primary/70 mt-0.5">Steuerjahr {selectedYear}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6">

        <div className="card-modern p-4">
          <h3 className="text-base font-semibold mb-3 text-foreground">Letzte Aktivitäten</h3>
          {mealEntries.length === 0 && mileageEntries.length === 0 ? (
            <p className="text-muted-foreground text-sm">Keine Einträge vorhanden.</p>
          ) : (
            <div className="space-y-4">
              {mealEntries.slice(-3).reverse().map(entry => (
                <div key={entry.id} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">Verpflegung</p>
                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">+{entry.deductible.toFixed(2)} €</span>
                </div>
              ))}
               {mileageEntries.slice(-3).reverse().map(entry => (
                <div key={entry.id} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">Fahrt</p>
                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">+{entry.allowance.toFixed(2)} €</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
