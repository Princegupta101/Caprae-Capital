import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return formatCurrency(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(date);
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getIndustryColor(industry: string): string {
  const colors: Record<string, string> = {
    'Technology': 'bg-blue-100 text-blue-800',
    'Healthcare': 'bg-green-100 text-green-800',
    'Finance': 'bg-yellow-100 text-yellow-800',
    'Manufacturing': 'bg-gray-100 text-gray-800',
    'Retail': 'bg-purple-100 text-purple-800',
    'Real Estate': 'bg-indigo-100 text-indigo-800',
    'Education': 'bg-pink-100 text-pink-800',
    'Hospitality': 'bg-orange-100 text-orange-800',
    'Construction': 'bg-brown-100 text-brown-800',
    'Transportation': 'bg-teal-100 text-teal-800',
  };
  return colors[industry] || 'bg-gray-100 text-gray-800';
}

export function calculateMatchScore(
  buyerPrefs: {
    industries?: string[];
    budgetRange?: { min: number; max: number };
    geographicFocus?: string[];
    timeline?: string;
  },
  sellerBusiness: {
    industry: string;
    annualRevenue: number;
    location?: { state: string; country: string };
    timeline?: string;
  }
): number {
  let score = 0;
  const maxScore = 100;
  
  // Industry match (30 points)
  if (buyerPrefs.industries?.includes(sellerBusiness.industry)) {
    score += 30;
  }
  
  // Revenue range match (25 points)
  if (buyerPrefs.budgetRange && 
      sellerBusiness.annualRevenue >= buyerPrefs.budgetRange.min && 
      sellerBusiness.annualRevenue <= buyerPrefs.budgetRange.max) {
    score += 25;
  }
  
  // Geographic match (20 points)
  if (buyerPrefs.geographicFocus?.some((location: string) => 
      sellerBusiness.location?.state === location || 
      sellerBusiness.location?.country === location)) {
    score += 20;
  }
  
  // Company size compatibility (15 points)
  score += 15; // Base compatibility score
  
  // Timeline alignment (10 points)
  if (buyerPrefs.timeline === sellerBusiness.timeline) {
    score += 10;
  }
  
  return Math.min(score, maxScore);
}
