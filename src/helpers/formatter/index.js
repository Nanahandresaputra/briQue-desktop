export const formatter = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};
