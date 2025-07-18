# ✅ Project TODOs

## 🔐 Authentication
- [x] Connect login to the actual authentication API  
- [x] Add field validation (email format, empty fields)  

## 🛒 Checkout
- [x] Restructure checkout layout  
  - [x] Display cart in step 1  
  - [x] Display shipping form in step 2  
  - [x] Display payment form in step 3  
- [x] Show final order summary with subtotal, shipping costs, and discounts  
  - [x] Keep final order summary visible on the right throughout all steps  
  - [x] Don't render final order summary if the cart is empty 
- [x] Implement navigation logic between steps  
  - [x] Validate forms before advancing  
- [x] Finalize styling of the order summary component  
- [x] Simulate a functional checkout with success and error pages  


## 🛒 Cart & Product Interaction
- [x] Vary product quantity directly from the product page  
  - [x] Make the quantity selector a reusable component  
- [x] Change "-" to trash icon when quantity is 1  
- [x] Display total cart price in nav cart icon  
- [x] Show toast notification when products are added or removed  

## 🧩 Filters & Sorting
- [x] Add filters on the product list page  
  - [x] Make filters a reusable component 
  - [x] Add 'Apply filters' button when sidebar is open (responsive)
  - [x] Clear filters when sidebar is closed via 'X' button  
- [x] Allow product sorting  
- [x] Show how many products are being displayed out of the total when filtering or searching  

## 🎨 UI and Styling
- [x] Unify UI elements styles
  - [x] Style the toast component  
  - [x] Ensure consistent appearance in dark mode
  - [x] Fix spacing issues in CustomSelect (should not push other elements)  
- [ ] Improve responsive layout for mobile screens
  - [x] Hide sidebar by default in responsive layout
    - [x] Add sidebar transition to slide in/out from the right
  - [x] Adjust page title size and padding 
  - [x] Move filters button next to page title on screens ≥ 768px 
- [x] Add animated hover effect to product cards  
  - [x] Add margin to prevent hover effect from overlapping the search bar (responsive)
- [x] Add search icon to product search input  
- [x] Add cart icon to nav cart button  


## 🛠️ Code Quality and Structure
- [ ] Refactor folder structure for better maintainability  
- [x] Move sidebar functions to ProductsContext 
- [x] Fix landing page not loading when accessed directly
- [ ] Cookies

## ✨ Extra Improvements (Nice-to-haves)
- [x] Save cart state in `localStorage`  
- [ ] Calculate and apply shipping fees based on location
- [x] improve quantity control with ARIA roles and live updates
