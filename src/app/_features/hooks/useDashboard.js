import { useMemo, useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

export const useDashboard = () => {
  const { tripEntries, equipmentEntries, expenseEntries, monthlyEmployerExpenses, selectedYear, taxRates } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  // Filter entries by selected year
  const filteredTrips = useMemo(() => 
    tripEntries.filter(e => new Date(e.date).getFullYear() === selectedYear),
  [tripEntries, selectedYear]);

  const filteredExpenses = useMemo(() => 
    (expenseEntries || []).filter(e => new Date(e.date).getFullYear() === selectedYear),
  [expenseEntries, selectedYear]);

  const filteredMonthlyExpenses = useMemo(() => 
    (monthlyEmployerExpenses || []).filter(e => e.year === selectedYear),
  [monthlyEmployerExpenses, selectedYear]);

  const totalMealAllowance = useMemo(() => 
    filteredTrips.reduce((sum, entry) => sum + (entry.mealAllowance || 0), 0),
  [filteredTrips]);

  const totalTransportCosts = useMemo(() => 
    filteredTrips.reduce((sum, entry) => sum + (entry.sumTransportAllowances || 0), 0),
  [filteredTrips]);

  const totalTrips = useMemo(() => totalMealAllowance + totalTransportCosts,
  [totalMealAllowance, totalTransportCosts]);
  
  // Calculate Equipment Depreciation for Selected Year
  const totalEquipment = useMemo(() => equipmentEntries.reduce((sum, entry) => {
    const purchaseDate = new Date(entry.date);
    const purchaseYear = purchaseDate.getFullYear();
    const currentYear = parseInt(selectedYear);
    const price = parseFloat(entry.price);
    
    // GWG
    if (price <= (taxRates?.gwgLimit || 952)) {
        return purchaseYear === currentYear ? sum + price : sum;
    }
    
    // Depreciation
    const usefulLifeYears = 3;
    const endYear = purchaseYear + usefulLifeYears;
    
    if (currentYear < purchaseYear || currentYear > endYear) return sum;
    
    let monthsInCurrentYear = 0;
    if (currentYear === purchaseYear) {
        monthsInCurrentYear = 12 - purchaseDate.getMonth();
    } else if (currentYear < endYear) {
        monthsInCurrentYear = 12;
    } else if (currentYear === endYear) {
        monthsInCurrentYear = purchaseDate.getMonth();
    }
    
    if (monthsInCurrentYear <= 0) return sum;
    
    const monthlyDepreciation = price / (usefulLifeYears * 12);
    return sum + (monthlyDepreciation * monthsInCurrentYear);
  }, 0), [equipmentEntries, selectedYear, taxRates]);

  const totalEmployerReimbursement = useMemo(() => 
    filteredMonthlyExpenses.reduce((sum, entry) => sum + entry.amount, 0),
  [filteredMonthlyExpenses]);
  
  // Grand Total (Absetzbar) = (Trips + Equipment) - Employer Reimbursements
  const grandTotal = (totalTrips + totalEquipment) - totalEmployerReimbursement;

  // KPI Calculations for Expenses vs Allowances
  const totalExpenses = useMemo(() => 
    filteredExpenses.reduce((sum, entry) => sum + entry.amount, 0),
  [filteredExpenses]);
  
  // Net Result (Absetzbar - Private Ausgaben)
  const netTotal = grandTotal - totalExpenses;

  // Combine and sort recent activities
  const recentActivities = useMemo(() => {
    const calculateEquipmentAmount = (entry) => {
      const purchaseDate = new Date(entry.date);
      const purchaseYear = purchaseDate.getFullYear();
      const currentYear = parseInt(selectedYear);
      const price = parseFloat(entry.price);
      
      // GWG
      if (price <= (taxRates?.gwgLimit || 952)) {
        return purchaseYear === currentYear ? price : 0;
      }
      
      // Depreciation
      const usefulLifeYears = 3;
      const endYear = purchaseYear + usefulLifeYears;
      
      if (currentYear < purchaseYear || currentYear > endYear) return 0;
      
      let monthsInCurrentYear = 0;
      if (currentYear === purchaseYear) {
        monthsInCurrentYear = 12 - purchaseDate.getMonth();
      } else if (currentYear < endYear) {
        monthsInCurrentYear = 12;
      } else if (currentYear === endYear) {
        monthsInCurrentYear = purchaseDate.getMonth();
      }
      
      if (monthsInCurrentYear <= 0) return 0;
      
      const monthlyDepreciation = price / (usefulLifeYears * 12);
      return monthlyDepreciation * monthsInCurrentYear;
    };

    const activities = [
      ...filteredTrips.map(e => ({ 
        ...e, 
        type: 'Reise', 
        amount: (e.mealAllowance || 0) + (e.sumTransportAllowances || 0) 
      })),
      ...equipmentEntries
        .filter(e => {
          const purchaseDate = new Date(e.date);
          const purchaseYear = purchaseDate.getFullYear();
          const currentYear = parseInt(selectedYear);
          const price = parseFloat(e.price);
          const usefulLifeYears = 3;
          const endYear = purchaseYear + usefulLifeYears;
          return currentYear >= purchaseYear && currentYear <= endYear;
        })
        .map(e => ({ 
          ...e, 
          type: 'Arbeitsmittel', 
          amount: calculateEquipmentAmount(e) 
        }))
    ];
    return activities.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  }, [filteredTrips, equipmentEntries, selectedYear, taxRates]);

  // Simulate initial data loading (in real app, this would wait for data fetch)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Short delay to show skeleton on initial load
    
    return () => clearTimeout(timer);
  }, [selectedYear]); // Re-trigger when year changes

  return {
    selectedYear,
    grandTotal,
    totalTrips,
    totalMealAllowance,
    totalTransportCosts,
    totalEquipment,
    totalEmployerReimbursement,
    totalExpenses,
    netTotal,
    recentActivities,
    isLoading
  };
};
