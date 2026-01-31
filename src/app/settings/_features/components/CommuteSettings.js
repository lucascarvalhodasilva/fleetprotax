import React from 'react';
import TransportModeSelector, { DistanceSliderCompact } from '@/components/shared/TransportModeSelector';

export default function CommuteSettings({ localDefaultCommute, setLocalDefaultCommute, setHasChanges }) {
  const handleToggle = (mode) => {
    const dist = Number(localDefaultCommute[mode]?.distance) || 0;
    const wasActive = !!localDefaultCommute[mode]?.active;
    const nextActive = !wasActive;

    setLocalDefaultCommute(prev => ({
      ...prev,
      [mode]: { ...prev[mode], active: nextActive }
    }));

    // Only mark as changed when deactivating a mode that currently has a distance
    if (wasActive && !nextActive && dist > 0) {
      setHasChanges(true);
    }
  };

  const handleDistanceChange = (mode, distance) => {
    setLocalDefaultCommute(prev => ({
      ...prev,
      [mode]: { ...prev[mode], distance }
    }));
    setHasChanges(true);
  };

  return (
    <div className="card-modern">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Fahrweg</h2>
      <p className="text-muted-foreground mb-6 text-sm">
        Konfigurieren Sie Ihre tägliche Pendelstrecke. Diese wird automatisch jedem Arbeitstag hinzugefügt.
      </p>
      
      <div className="space-y-4">
        {/* Toggle Buttons - now with icons like TripForm */}
        <TransportModeSelector
          commuteData={localDefaultCommute}
          onToggle={handleToggle}
          excludeModes={['public_transport']}
        />

        {/* Active Inputs */}
        <div className="space-y-3 mt-2">
          {/* Car Slider */}
          {localDefaultCommute.car.active && (
            <DistanceSliderCompact
              mode="car"
              distance={localDefaultCommute.car.distance}
              onChange={(val) => handleDistanceChange('car', val)}
              maxDistance={30}
            />
          )}

          {/* Motorcycle Slider */}
          {localDefaultCommute.motorcycle.active && (
            <DistanceSliderCompact
              mode="motorcycle"
              distance={localDefaultCommute.motorcycle.distance}
              onChange={(val) => handleDistanceChange('motorcycle', val)}
              maxDistance={100}
            />
          )}

          {/* Bike Slider */}
          {localDefaultCommute.bike.active && (
            <DistanceSliderCompact
              mode="bike"
              distance={localDefaultCommute.bike.distance}
              onChange={(val) => handleDistanceChange('bike', val)}
              maxDistance={100}
            />
          )}

          {/* Public transport intentionally not configurable as default */}
        </div>
      </div>
    </div>
  );
}
