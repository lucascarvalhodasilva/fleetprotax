/**
 * Skeleton loader component for shimmer effect
 */
export function Skeleton({ className = "", variant = "rectangular" }) {
  const variantClasses = {
    rectangular: "rounded-lg",
    circular: "rounded-full",
    text: "rounded h-4"
  };

  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${variantClasses[variant]} ${className}`}
      aria-label="Loading..."
      role="status"
    />
  );
}

/**
 * KPI Card skeleton loader
 */
export function KPICardSkeleton() {
  return (
    <div className="bg-gray-300/40 dark:bg-gray/5 rounded-xl p-4 flex items-center gap-4">
      <Skeleton className="w-10 h-10" variant="rectangular" />
      <div className="min-w-0 flex-1">
        <Skeleton className="w-20 h-3 mb-2" variant="text" />
        <Skeleton className="w-24 h-5" variant="text" />
      </div>
    </div>
  );
}

/**
 * Large KPI Card skeleton (for main total)
 */
export function LargeKPICardSkeleton() {
  return (
    <div className="rounded-2xl bg-gray-300 dark:bg-gray-700 p-3 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9" variant="rectangular" />
          <Skeleton className="w-32 h-3" variant="text" />
        </div>
        <Skeleton className="w-12 h-5 rounded-full" />
      </div>
      
      <div className="mt-4 mb-2">
        <Skeleton className="w-48 h-10 mb-2" variant="text" />
      </div>
      <Skeleton className="w-40 h-3" variant="text" />
    </div>
  );
}

/**
 * Dashboard skeleton with all KPI cards
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-7">
      <LargeKPICardSkeleton />
      
      <div className="grid grid-cols-2 gap-3">
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/50 p-5 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-7 h-7" variant="rectangular" />
          <div className="flex-1">
            <Skeleton className="w-32 h-4 mb-2" variant="text" />
            <Skeleton className="w-24 h-3" variant="text" />
          </div>
        </div>
        <Skeleton className="w-full h-16 mb-3" variant="rectangular" />
        <Skeleton className="w-full h-20" variant="rectangular" />
      </div>
    </div>
  );
}

/**
 * Recent activities skeleton
 */
export function RecentActivitiesSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-muted/20">
        <Skeleton className="w-8 h-8" variant="rectangular" />
        <div>
          <Skeleton className="w-32 h-4 mb-1" variant="text" />
          <Skeleton className="w-24 h-3" variant="text" />
        </div>
      </div>

      <div className="p-3 space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-white/5">
            <Skeleton className="w-9 h-9" variant="rectangular" />
            <div className="flex-1">
              <Skeleton className="w-24 h-4 mb-1" variant="text" />
              <Skeleton className="w-20 h-3" variant="text" />
            </div>
            <Skeleton className="w-16 h-5" variant="text" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Trip card skeleton for list view
 */
export function TripCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <Skeleton className="w-10 h-10" variant="rectangular" />
        <div className="flex-1">
          <Skeleton className="w-32 h-5 mb-2" variant="text" />
          <Skeleton className="w-48 h-4" variant="text" />
        </div>
      </div>
      
      <div className="flex gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex-1">
          <Skeleton className="w-16 h-3 mb-1" variant="text" />
          <Skeleton className="w-20 h-4" variant="text" />
        </div>
        <div className="flex-1">
          <Skeleton className="w-16 h-3 mb-1" variant="text" />
          <Skeleton className="w-20 h-4" variant="text" />
        </div>
        <div className="flex-1">
          <Skeleton className="w-16 h-3 mb-1" variant="text" />
          <Skeleton className="w-20 h-4" variant="text" />
        </div>
      </div>
    </div>
  );
}

/**
 * Trip list skeleton
 */
export function TripListSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-40 h-8" variant="text" />
        <Skeleton className="w-24 h-8" variant="rectangular" />
      </div>
      
      <TripCardSkeleton />
      <TripCardSkeleton />
      <TripCardSkeleton />
    </div>
  );
}

/**
 * Spinner component for inline loading
 */
export function Spinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={`inline-block ${className}`} role="status" aria-label="Loading">
      <svg 
        className={`animate-spin ${sizes[size]} text-current`}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

/**
 * Button with loading state
 */
export function LoadingButton({ 
  children, 
  isLoading = false, 
  disabled = false,
  className = "",
  ...props 
}) {
  return (
    <button
      disabled={isLoading || disabled}
      className={`relative ${className} ${isLoading ? 'cursor-wait' : ''}`}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" />
        </span>
      )}
      <span className={`flex items-center justify-center gap-2 ${isLoading ? 'invisible' : ''}`}>
        {children}
      </span>
    </button>
  );
}
