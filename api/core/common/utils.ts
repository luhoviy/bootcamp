export const transformDaysToMilliseconds = (days: number): number => {
  return days * 24 * 60 * 60 * 1000;
};
