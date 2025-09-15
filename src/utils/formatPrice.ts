/**
 * Formats a number as a Chilean peso price
 * @param price The price to format
 * @returns The formatted price string
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);
};
