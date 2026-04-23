// Expiry state utilities — standalone, no external deps

export type ExpiryState = 'expired' | 'soon' | 'warn' | 'ok';

/** Days between two dates (positive = future, negative = past) */
export function daysBetween(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

export interface HasExpiry {
  expiry?: Date | null;
}

export function getExpiryState(item: HasExpiry): ExpiryState | null {
  if (!item.expiry) return null;
  const days = daysBetween(item.expiry, new Date());
  if (days < 0)  return 'expired';
  if (days <= 3) return 'soon';
  if (days <= 7) return 'warn';
  return 'ok';
}
