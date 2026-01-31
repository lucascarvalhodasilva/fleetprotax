import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

export const useSettings = () => {
  const { 
    defaultCommute,
    setDefaultCommute,
    taxRates
  } = useAppContext();

  // Local state for manual saving
  const [localDefaultCommute, setLocalDefaultCommute] = useState(defaultCommute || {
    car: { active: true, distance: 0 },
    motorcycle: { active: false, distance: 0 },
    bike: { active: false, distance: 0 },
    public_transport: { active: false, cost: '' }
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync with context on mount or when context updates (if no local changes)
  useEffect(() => {
    if (!hasChanges) {
      setLocalDefaultCommute(defaultCommute || {
        car: { active: true, distance: 0 },
        motorcycle: { active: false, distance: 0 },
        bike: { active: false, distance: 0 },
        public_transport: { active: false, cost: '' }
      });
    }
  }, [defaultCommute, hasChanges]);

  const handleSave = () => {
    const sanitizeCommute = (commute) => {
      const next = { ...commute };

      ['car', 'motorcycle', 'bike'].forEach((mode) => {
        const rawDistance = parseFloat(commute[mode]?.distance);
        const distance = Number.isFinite(rawDistance) && rawDistance > 0 ? rawDistance : 0;
        const active = distance > 0 && !!commute[mode]?.active;
        next[mode] = { active, distance };
      });

      // Public transport is not allowed as default
      next.public_transport = { active: false, cost: '' };
      return next;
    };

    setIsSaving(true);
    setTimeout(() => {
      const sanitized = sanitizeCommute(localDefaultCommute);
      setDefaultCommute(sanitized);
      setLocalDefaultCommute(sanitized);
      setHasChanges(false);
      setIsSaving(false);
    }, 1300);
  };

  return {
    localDefaultCommute,
    setLocalDefaultCommute,
    hasChanges,
    setHasChanges,
    isSaving,
    handleSave,
    taxRates // Needed for displaying current values
  };
};
