const categoryMap = {
  fruits: "Fruits and Vegetables",
  dairy: "Dairy and Derivatives",
  sweeteners: "Sweeteners",
  nuts: "Nuts",
  bakery: "Bakery",
};

export function applyCategories(products, filters) {
  const selectedCategories = Object.entries(filters.categories || {})
    .filter(([, isChecked]) => isChecked)
    .map(([key]) => categoryMap[key]);

  return products.filter(product => {
    return (
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category)
    );
  });
}

export function applyCharacteristics(products, filters) {
  return products.filter(product => {
    if (filters.characteristics?.eco && !product.characteristics?.eco) return false;
    if (filters.characteristics?.gluten && !product.characteristics?.gluten) return false;
    return true;
  });
}

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
 * Filters and sorts products based on search query, category filters, characteristics, and sort options
 * @param {Array} products - Array of product objects
 * @param {Object} filters - Filter object with categories and characteristics
 * @param {string} sortOption - Sort option ('price-asc', 'price-desc', 'name-asc', 'name-desc')
 * @param {string} query - Search query string
 * @returns {Array} Filtered and sorted array of products
 */
export function getVisibleProducts(products, filters, sortOption, query = "") {

  let visible = [...products];

  if (query.trim()) {
    visible = visible.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }

  visible = applyCategories(visible, filters);
  visible = applyCharacteristics(visible, filters);

  return applySort(visible, sortOption);
}

