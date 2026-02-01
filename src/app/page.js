"use client";
import { useDashboard } from './_features/hooks/useDashboard';
import DashboardKPIs from './_features/components/DashboardKPIs';
import RecentActivities from './_features/components/RecentActivities';
import { DashboardSkeleton, RecentActivitiesSkeleton } from '@/components/shared/skeletons';

export default function Dashboard() {
  const {
    selectedYear,
    grandTotal,
    totalMealAllowance,
    totalTransportCosts,
    totalEquipment,
    totalEmployerReimbursement,
    totalExpenses,
    netTotal,
    recentActivities,
    isLoading
  } = useDashboard();

  return (
    <div className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex flex-col gap-6 py-6 max-w-6xl mx-auto w-full" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>

        {isLoading ? (
          <>
            <DashboardSkeleton />
          </>
        ) : (
          <>
            <DashboardKPIs 
              selectedYear={selectedYear}
              grandTotal={grandTotal}
              totalMealAllowance={totalMealAllowance}
              totalTransportCosts={totalTransportCosts}
              totalEquipment={totalEquipment}
              totalEmployerReimbursement={totalEmployerReimbursement}
              totalExpenses={totalExpenses}
              netTotal={netTotal}
            />

            <div className="grid grid-cols-1 gap-6">
              <RecentActivities recentActivities={recentActivities} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
