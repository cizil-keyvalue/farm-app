
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-GB').format(value);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  
  if (isNaN(date.getTime())) {
    return dateString; 
  }
  
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatYieldVariance = (actual: number, expected: number): string => {
  if (expected === 0) return '0%';
  
  const variance = (actual - expected) / expected;
  return formatPercentage(variance);
};

export const formatPricePerKg = (price: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatAcreage = (acreage: number): string => {
  return `${formatNumber(acreage)} acres`;
};

export const formatYield = (yieldValue: number): string => {
  return `${formatNumber(yieldValue)} kg`;
};
