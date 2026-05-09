import { EXTENDED_AMELS } from '../constants/extendedAmels';
import { Amel } from '../types';

export function getSmartSuggestion(periodKey: string): Amel | null {
  // Logic to pick a relevant deed based on the period
  // For now, let's map some keywords
  const mapping: Record<string, string[]> = {
    'sabah_sonrasi': ['zikirler'],
    'ogle': ['salevatlar'],
    'ikindi': ['hamdler'],
    'aksam': ['salevatlar'],
    'yatsi': ['istigfarlar'],
    'gece': ['dualar', 'istigfarlar'],
    'yatmadan': ['dualar'],
  };

  const possibleCats = mapping[periodKey] || ['zikirler', 'salevatlar', 'hamdler', 'istigfarlar', 'dualar'];
  const cat = possibleCats[Math.floor(Math.random() * possibleCats.length)];
  const pool = EXTENDED_AMELS[cat];

  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function findAmelById(id: string): Amel | null {
  for (const cat in EXTENDED_AMELS) {
    const found = EXTENDED_AMELS[cat].find(a => a.id === id);
    if (found) return found;
  }
  return null;
}
