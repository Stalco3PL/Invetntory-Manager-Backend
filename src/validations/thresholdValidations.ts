
export const isNumeric = (value: string): boolean => /^\d*$/.test(value);

export const validateThreshold = (value: string): string | null => {
  if (!isNumeric(value)) {
    return 'Please enter only numbers.';
  }
  
  const numericValue = parseInt(value, 10);
  if (isNaN(numericValue) || numericValue >= 999999) {
    return 'Enter a number less than 999999.';
  }

  return null; // No validation errors
};
