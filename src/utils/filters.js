/**
 * Product filtering and sorting utilities
 */

export const CATEGORY_MAP = {
  fruits: "Fruits and Vegetables",
  dairy: "Dairy and Derivatives",
  sweeteners: "Sweeteners",
  nuts: "Nuts",
  bakery: "Bakery",
};

/**
 * Filter products by selected categories
 * @param {Array} products - Products to filter
 * @param {Object} filters - Filter object with categories
 * @returns {Array} Filtered products
 */
export function applyCategories(products, filters) {
  const selectedCategories = Object.entries(filters.categories || {})
    .filter(([, isChecked]) => isChecked)
    .map(([key]) => CATEGORY_MAP[key]);

  return products.filter(product => {
    return (
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category)
    );
  });
}

/**
 * Filter products by characteristics (eco, gluten-free, etc.)
 * @param {Array} products - Products to filter
 * @param {Object} filters - Filter object with characteristics
 * @returns {Array} Filtered products
 */
export function applyCharacteristics(products, filters) {
  return products.filter(product => {
    if (!filters.characteristics) return true;

    return Object.entries(filters.characteristics).every(([char, isSelected]) => {
      return !isSelected || product.characteristics?.[char];
    });
  });
}

/**
 * Sort products by price or name
 * @param {Array} products - Products to sort
 * @param {string} sortOption - Sort method ('price-asc', 'price-desc', 'name-asc', 'name-desc')
 * @returns {Array} Sorted products
 */
export function applySort(products, sortOption) {
  switch (sortOption) {
    case "price-desc":
      return [...products].sort((a, b) => b.final_price - a.final_price);
    case "price-asc":
      return [...products].sort((a, b) => a.final_price - b.final_price);
    case "name-asc":
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return [...products].sort((a, b) => b.name.localeCompare(a.name));
    default:
      return products;
  }
}

/**
 * Filter and sort products by search, category, characteristics, and sort option
 * @param {Array} products - Products to process
 * @param {Object} filters - Filter criteria
 * @param {string} sortOption - Sort method
 * @param {string} query - Search query
 * @returns {Array} Filtered and sorted products
 */
export function getVisibleProducts(products, filters, sortOption, query = "") {
  let visible = [...products];

  // Search filter (case-insensitive)
  if (query.trim()) {
    const normalizedQuery = query.toLowerCase();
    visible = visible.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
  }

  visible = applyCategories(visible, filters);
  visible = applyCharacteristics(visible, filters);

  return applySort(visible, sortOption);
}