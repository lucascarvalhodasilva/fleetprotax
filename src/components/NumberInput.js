"use client";
import React, { useState, useEffect } from 'react';

export default function NumberInput({ value, onChange, name, className, placeholder, step, required, min, max }) {
  const [localValue, setLocalValue] = useState(value?.toString() || '');

  useEffect(() => {
    // Handle undefined/null/NaN from parent
    if (value === undefined || value === null || isNaN(value)) {
      // If local value is not empty, and parent says it's empty/invalid, we might want to clear it
      // But only if it's not currently being typed (which is hard to know).
      // However, usually if parent value changes to NaN/null, it means reset.
      if (localValue !== '') {
         // Check if localValue parses to something valid. If so, and parent is invalid, maybe parent reset it?
         // Let's assume if parent passes null/undefined/NaN, we clear.
         // But wait, if I type "12," -> parent gets "12." -> parseFloat is 12.
         // If I type "" -> parent gets "" -> parseFloat is NaN.
         // So if parent sends NaN, it might just be because I cleared it.
         // In that case localValue is already "".
         if (localValue !== '') {
             // If localValue is "12" and parent sends NaN... unexpected.
             // Let's just sync if parent value is a valid number.
         }
      }
    }

    // If parent value is a valid number
    if (typeof value === 'number' && !isNaN(value)) {
        const currentParsed = localValue === '' ? NaN : parseFloat(localValue.replace(',', '.'));
        
        // If local is invalid/empty OR values differ significantly
        if (isNaN(currentParsed) || Math.abs(currentParsed - value) > Number.EPSILON) {
            setLocalValue(value.toString());
        }
    } else if ((value === '' || value === undefined || value === null) && localValue !== '') {
        // Parent cleared the value
        setLocalValue('');
    }
  }, [value]);

  const handleChange = (e) => {
    const inputVal = e.target.value;
    
    // Allow digits, dots, commas
    if (!/^[0-9.,]*$/.test(inputVal)) return;
    
    // Ensure max one separator
    const separators = (inputVal.match(/[.,]/g) || []).length;
    if (separators > 1) return;

    setLocalValue(inputVal);

    const normalized = inputVal.replace(',', '.');
    
    const syntheticEvent = {
      target: {
        name,
        value: normalized,
        type: 'number'
      }
    };
    
    onChange(syntheticEvent);
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      name={name}
      className={className}
      placeholder={placeholder}
      value={localValue}
      onChange={handleChange}
      step={step}
      required={required}
      min={min}
      max={max}
      autoComplete="off"
    />
  );
}
