import { NATIONAL_MEDIAN_WAGE } from '../data/occupations';

export function formatWage(amount) {
  if (amount >= 229300) return '$229,300+';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

export function formatEmployment(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return n.toString();
}

export function wageVsMedian(wage) {
  const diff = wage - NATIONAL_MEDIAN_WAGE;
  const pct = Math.round((diff / NATIONAL_MEDIAN_WAGE) * 100);
  return { diff, pct };
}

export function wageLabel(wage) {
  const { pct } = wageVsMedian(wage);
  if (pct >= 50) return 'Well above median';
  if (pct >= 15) return 'Above median';
  if (pct >= -10) return 'Near median';
  return 'Below median';
}

export function wageLabelColor(wage) {
  const { pct } = wageVsMedian(wage);
  if (pct >= 50) return 'text-emerald-700';
  if (pct >= 15) return 'text-green-700';
  if (pct >= -10) return 'text-blue-700';
  return 'text-amber-700';
}

export function clsx(...classes) {
  return classes.filter(Boolean).join(' ');
}
