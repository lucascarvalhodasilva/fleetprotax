"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

export default function Navbar() {
  const pathname = usePathname();
  const { selectedYear, setSelectedYear, mealEntries, mileageEntries, equipmentEntries } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const years = [2024, 2025, 2026]; 

  const downloadCSV = async () => {
    // Filter entries by selected year
    const filteredMeals = mealEntries.filter(e => new Date(e.date).getFullYear() === selectedYear);
    const filteredMileage = mileageEntries.filter(e => new Date(e.date).getFullYear() === selectedYear);
    const filteredEquipment = equipmentEntries.filter(e => new Date(e.date).getFullYear() === selectedYear);

    const totalMeals = filteredMeals.reduce((sum, entry) => sum + entry.deductible, 0);
    const totalMileage = filteredMileage.reduce((sum, entry) => sum + entry.allowance, 0);
    const totalEquipment = filteredEquipment.reduce((sum, entry) => sum + entry.deductibleAmount, 0);
    const grandTotal = totalMeals + totalMileage + totalEquipment;

    let csvString = "";
    
    // Summary
    csvString += `ZUSAMMENFASSUNG (${selectedYear})\n`;
    csvString += `Verpflegungsmehraufwand,${totalMeals.toFixed(2)}\n`;
    csvString += `Fahrtkosten,${totalMileage.toFixed(2)}\n`;
    csvString += `Arbeitsmittel,${totalEquipment.toFixed(2)}\n`;
    csvString += `GESAMT,${grandTotal.toFixed(2)}\n\n`;

    // Meals
    csvString += "VERPFLEGUNG\n";
    csvString += "Datum,Start,Ende,Dauer,Pauschale,Erstattung AG,Absetzbar\n";
    filteredMeals.forEach(e => {
      csvString += `${e.date},${e.startTime},${e.endTime},${e.duration.toFixed(1)},${e.rate},${e.employerExpenses},${e.deductible}\n`;
    });
    csvString += "\n";

    // Mileage
    csvString += "FAHRTKOSTEN\n";
    csvString += "Datum,Strecke (einfach),Gesamtstrecke,Pauschale\n";
    filteredMileage.forEach(e => {
      csvString += `${e.date},${e.distance},${e.totalKm},${e.allowance}\n`;
    });
    csvString += "\n";

    // Equipment
    csvString += "ARBEITSMITTEL\n";
    csvString += "Datum,Gegenstand,Preis,Status,Absetzbar\n";
    filteredEquipment.forEach(e => {
      csvString += `${e.date},${e.name},${e.price},${e.status},${e.deductibleAmount}\n`;
    });

    if (Capacitor.isNativePlatform()) {
      try {
        const fileName = `steuer_export_${selectedYear}.csv`;
        const result = await Filesystem.writeFile({
          path: fileName,
          data: csvString,
          directory: Directory.Cache,
          encoding: Encoding.UTF8,
        });

        await Share.share({
          title: 'Steuer Export',
          text: `Export für das Jahr ${selectedYear}`,
          url: result.uri,
          dialogTitle: 'Export teilen',
        });
      } catch (e) {
        console.error('Export failed', e);
        alert('Export fehlgeschlagen: ' + e.message);
      }
    } else {
      const csvContent = "data:text/csv;charset=utf-8," + csvString;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `steuer_export_${selectedYear}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }; 

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { name: 'Fahrten', href: '/trips', icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { name: 'Mittel', href: '/equipment', icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )},
    { name: 'Optionen', href: '/settings', icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
  ];

  const getPageTitle = () => {
    if (pathname === '/') return 'Dashboard';
    if (pathname.startsWith('/trips')) return 'Fahrtenbuch';
    if (pathname.startsWith('/equipment')) return 'Arbeitsmittel';
    if (pathname.startsWith('/settings')) return 'Einstellungen';
    return '';
  };

  return (
    <>
      {/* Top Bar: Page Title + Year Selector */}
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md pt-[env(safe-area-inset-top)]">
        <div className="container-custom flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {getPageTitle()}
          </h1>
          
          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground font-medium transition-all duration-200 border border-border/50 group active:scale-95"
              >
                <span className="text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary/80 transition-colors hidden sm:inline">Steuerjahr</span>
                <span className="text-base font-bold text-primary">{selectedYear}</span>
                <svg 
                  className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-100 z-50">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-base transition-colors flex items-center justify-between
                        ${selectedYear === year 
                          ? 'bg-primary/10 text-primary font-bold' 
                          : 'text-foreground/80 hover:bg-secondary'
                        }`}
                    >
                      {year}
                      {selectedYear === year && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={downloadCSV}
              className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-all duration-200 border border-border/50 active:scale-95"
              title="Export CSV"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation - Always visible for Tablet App feel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom)] shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center h-[4.5rem] max-w-2xl mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-90 transition-all duration-200 group ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`p-1.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary/15 translate-y-[-2px]' : 'group-hover:bg-secondary/50'}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-medium transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      
   
    </>
  );
}
