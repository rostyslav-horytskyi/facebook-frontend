export const YEAR_TEMP = new Date().getFullYear();
export const YEARS = Array.from(
  new Array(108),
  (val, index) => YEAR_TEMP - index
);
export const MONTHS = Array.from(new Array(12), (val, index) => 1 + index);
