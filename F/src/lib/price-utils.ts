
/**
 * Parse a price string like "$1,250" to a number (1250)
 */
export const parsePriceToNumber = (priceString: string): number => {
  return Number(priceString.replace(/[^0-9.-]+/g, ""));
};

/**
 * Format a number to a price string with dollar sign and commas
 */
export const formatNumberToPrice = (price: number): string => {
  return `$${price.toLocaleString()}`;
};

/**
 * Filter jewelry items by a price range
 */
export const filterByPriceRange = (items: any[], minPrice: number, maxPrice: number) => {
  return items.filter(item => {
    const price = parsePriceToNumber(item.price);
    return price >= minPrice && price <= maxPrice;
  });
};
