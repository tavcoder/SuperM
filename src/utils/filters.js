const categoryMap = {
  fruits: "Fruits and Vegetables",
  dairy: "Dairy and Derivatives",
  sweeteners: "Sweeteners",
  nuts: "Nuts",
  bakery: "Bakery",
};

export function applyCategories(products, filters) {
  const selectedCategories = Object.entries(filters.categories || {})
    .filter(([_, isChecked]) => isChecked)
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

export function getVisibleProducts(products, filters, sortOption) {
  return applySort(
    applyCharacteristics(
      applyCategories(products, filters),
      filters
    ),
    sortOption
  );
}
