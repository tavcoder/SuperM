# 🛍️ MyStore – React + Vite E-commerce App

An e-commerce web app built with **React**, **Vite**, with HMR and some ESLint rules. The app includes user authentication, product browsing, cart functionality, and a multi-step checkout flows.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
---

## 🚀 Technologies

- ⚛️ React
- ⚡ Vite
- 🧱 CSS
- 📦 LocalStorage (cart state)
- 📡 REST API (authentication, products)
- ✅ PropTypes / Form validation (optional)

---

## 🧩 Features

- ✅ Product listing with filters
- ✅ Product detail view
- ✅ Shopping cart with quantity selector and item removal
- ✅ Custom `Select` component
- ✅ Login system with API integration
- ✅ 3-step checkout (cart → shipping → payment)
- ✅ Persistent cart summary during checkout
- ✅ Toast notifications
- ⏳ Work in progress:
  - Form step transitions
  - Final order confirmation view
  - Improved mobile responsiveness

---

## 🧪 Getting Started

### 1. Clone the repo

git clone https://github.com/your-username/mystore.git
cd mystore

### 2. Install dependencies
npm install 

### 3. Start the dev server
npm run dev

App will run at: http://localhost:5173

## 🧩 Project Structure (simplified)
src/
│
├── components/
│   ├── ProductCard/
│   ├── CustomSelect/
│   └── ...
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Checkout.jsx
│
├── styles/
│   ├── index.css
│   └── variables.css
│
├── utils/
│   └── api.js
│
├── App.jsx
└── main.jsx
📌 Notes
This is a personal project for practicing frontend.
The app simulates the e-commerce experience and consumes mock/fake APIs for demo purposes.



