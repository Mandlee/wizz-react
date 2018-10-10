/**
 * Formatting Euro Price
 * @param price
 * @returns {string}
 */
export const priceEuro = (price) => {
    return `€${price}`
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export const randomPricePercentage = (min = 20, max = 90)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};