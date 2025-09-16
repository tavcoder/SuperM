# 🛍️ SuperM – React E-commerce App

A modern e-commerce web application built with React and Vite, featuring user authentication, product browsing, shopping cart, and a streamlined checkout process.

## 🚀 Technologies

- **Frontend**: React 19, Vite
- **Styling**: CSS Modules, Responsive Design
- **State Management**: Context API + localStorage
- **Routing**: React Router 7
- **Data Fetching**: TanStack Query
- **Backend**: Supabase (authentication, database)
- **Icons**: React Icons
- **Linting**: ESLint with React rules
- **Build Tool**: Vite

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── CartIcon.jsx     # Cart icon with badge
│   ├── Navbar.jsx       # Main navigation
│   ├── Product.jsx      # Product card component
│   ├── ShippingForm.jsx # Checkout shipping form
│   └── ...
├── context/             # React Context providers
│   ├── CartContext.jsx  # Shopping cart state
│   ├── ProductsContext.jsx # Products and filters
│   └── ToastContext.jsx # Notification system
├── hooks/               # Custom React hooks
│   └── useFormValidation.js # Form validation logic
├── pages/               # Page components
│   ├── Landing.jsx      # Homepage
│   ├── Products.jsx     # Product listing
│   ├── ProductDetails.jsx # Individual product view
│   ├── Checkout.jsx     # Multi-step checkout
│   ├── Profile.jsx      # User profile management
│   └── Login.jsx        # Authentication
├── services/            # API and external services
│   └── fetcher.jsx      # HTTP client utilities
├── styles/              # CSS files
│   ├── index.css        # Global styles and variables
│   ├── LandingPage.css  # Page-specific styles
│   └── ...
├── utils/               # Utility functions
│   ├── filters.js       # Product filtering logic
│   └── validation.js    # Form validation rules
├── App.jsx              # Main app component
└── main.jsx             # App entry point
```

### State Management
- **Global State**: Context API for cart, products, and user authentication
- **Persistence**: localStorage for cart and user profile data
- **Server State**: TanStack Query for API data fetching and caching

### Component Patterns
- Functional components with hooks
- Custom hooks for reusable logic
- Context providers for shared state
- CSS modules for scoped styling

## 🧪 Setup & Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/superm.git
   cd superm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Configure Supabase credentials
   - Set up API endpoints

4. **Start development server**
   ```bash
   npm run dev
   ```
   App runs at: http://localhost:5173

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit with conventional commits
6. Push and create a pull request

### Code Standards
- **Components**: PascalCase naming, functional with hooks
- **Functions**: camelCase, descriptive names
- **CSS**: kebab-case classes, BEM methodology
- **Commits**: Use conventional commits (feat, fix, docs, etc.)
- **Documentation**: JSDoc for complex functions

### Pull Request Guidelines
- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed

## 📚 API Documentation

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Products
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product

### Orders
- `POST /orders` - Create new order
- `GET /orders/:userId` - Get user orders

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This is a demo e-commerce application for learning purposes. It uses mock APIs and simulated payments.
