export const formatCurrency = (value: number) => {
  const stringValue = String(value);
  const [wholePart, decimalPart] = stringValue.split('.');

  // Add commas to the whole part
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine the whole and decimal parts (add decimal part only if it exists)
  const formattedValue = decimalPart ? `${formattedWholePart}.${decimalPart}` : formattedWholePart;

  return formattedValue;
};

export const toMoney = (amount: number, currencyCode: string, locale = 'en') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

export const getCurrencySymbol = (currency: 'NGN' | 'GHS') => {
  if (currency === 'NGN') return '₦';
  return 'GH₵';
};
