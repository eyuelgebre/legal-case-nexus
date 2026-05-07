import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(date: Date, timeZone?: string) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: timeZone,
  }).format(date);
}

export const WORLD_CITIES = [
  { name: 'New York', zone: 'America/New_York' },
  { name: 'London', zone: 'Europe/London' },
  { name: 'Dubai', zone: 'Asia/Dubai' },
  { name: 'Singapore', zone: 'Asia/Singapore' },
  { name: 'Tokyo', zone: 'Asia/Tokyo' },
];