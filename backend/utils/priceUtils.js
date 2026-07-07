export const calculateDiscountedPrice = (
  price,
  discountPercentage = 0
) => {
  return Math.round(price * (1 - discountPercentage / 100));
};