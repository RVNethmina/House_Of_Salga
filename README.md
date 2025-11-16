# House of Salaga - Frontend

This is the frontend repository for the House of Salaga e-commerce platform. It is built using React, Vite, and Tailwind CSS, and uses a mock-first development approach.

## Table of Contents

- [Core Technologies](#core-technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
- [Project Architecture](#project-architecture)
  - [Folder Structure](#folder-structure)
  - [State Management (React Context)](#state-management-react-context)
  - [Authentication & Routing](#authentication--routing)
- [Frontend-Only Development (Mock Data)](#frontend-only-development-mock-data)
  - [How to Test Roles](#how-to-test-roles)
- [Connecting to the Backend (Next Steps)](#connecting-to-the-backend-next-steps)
- [Styling](#styling)
- [Available Scripts](#available-scripts)

## Core Technologies

- **UI Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** React Context API
- **API Client:** Axios
- **Notifications:** React-Toastify
- **Icons:** React-Icons

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- Node.js (v18.x or higher)
- npm (v9.x or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RVNethmina/House_Of_Salga.git
cd House_Of_Salga/frontend
```

2. Install dependencies:
```bash
npm install
```

### Environment Variables

Before running the app, you must create a `.env` file in the `/frontend` directory. You can create an empty one for now, or copy `.env.example` if one exists.

**File:** `frontend/.env`
```env
# URL for the backend API
VITE_BACKEND_URL=http://localhost:5000/api

# Public key for Stripe payments
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_STRIPE_PUBLIC_KEY
```

> **Note:** Since we are in mock-first development, these values are not critical for running the app, but they are necessary for when we connect the real API.

### Running the Development Server

Once installed, start the Vite development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Project Architecture

This project is built with a clear separation of concerns.

### Folder Structure
```
/frontend
├── /public/         # Static assets
├── /src/
│   ├── /assets/     # Images, fonts, etc.
│   ├── /components/ # Reusable React components (Button, NavBar, ProductCard)
│   ├── /context/    # Global state providers (Auth, Product, Cart)
│   ├── /pages/      # Route-level components (HomePage, ShopPage, ProfilePage)
│   ├── /services/   # API logic (Axios instance, service functions)
│   ├── App.jsx      # Main application router
│   ├── index.css    # Tailwind CSS directives
│   └── main.jsx     # App entry point, renders <App> and providers
├── .env             # Environment variables (IGNORED BY GIT)
├── package.json
└── tailwind.config.js
```

### State Management (React Context)

This project uses the **React Context API** for global state. We do not use Redux. All providers are wrapped in `src/main.jsx`.

- **AuthContext.jsx:**
  - Manages the current user, authentication status, and role.
  - Handles login, logout, and register functions.
  - Provides the `useAuth()` hook.

- **ProductContext.jsx:**
  - Fetches and caches the list of all products.
  - Provides the `useProducts()` hook.

- **CartContext.jsx:**
  - Manages the user's shopping cart.
  - Handles adding, removing, and updating items.
  - Persists the cart to localStorage.
  - Provides the `useCart()` hook.

### Authentication & Routing

Authentication is handled based on three roles: **visitor**, **customer**, and **admin**.

**Routing (App.jsx):**

- **Public Routes:** Accessible to all roles (e.g., `/`, `/shop`, `/login`).
- **`<CustomerRoute />`:** A protected route wrapper that only allows access if `role === 'customer'`. (e.g., `/profile`, `/checkout`).
- **`<AdminRoute />`:** A protected route wrapper that only allows access if `role === 'admin'`. (e.g., `/admin/dashboard`).

**Tokens:**

The `AuthContext` is designed to handle two separate tokens:

- `cToken`: For Customers
- `aToken`: For Admins

The API service in `src/services/api.js` automatically attaches the correct token (`aToken` takes priority) to all outgoing requests.

## Frontend-Only Development (Mock Data)

As of now, the backend is not connected. The `AuthContext` and `ProductContext` are set up with mock data and mock functions to allow for full frontend development and testing.

- `ProductContext` serves a hard-coded list of products after a 1-second timeout.
- `AuthContext` provides mock `customerLogin` and `adminLogin` functions.

### How to Test Roles

You can easily test the entire application flow without a backend:

**Test as a Visitor:**

1. Run `npm run dev` and open the app.
2. You are a `'visitor'` by default.
3. You can browse public pages (Home, Shop) but will be redirected if you try to access `/profile`.

**Test as a Customer:**

1. Navigate to the `/login` page.
2. Enter any text and click "Login".
3. The mock `customerLogin` function will run, setting your role to `'customer'`.
4. You can now access protected customer routes like `/profile` and `/checkout`.

**Test as an Admin:**

1. Navigate to the `/admin/login` page.
2. Enter any text and click "Login".
3. The mock `adminLogin` function will run, setting your role to `'admin'`.
4. You can now access protected admin routes like `/admin/dashboard`.

## Connecting to the Backend (Next Steps)

When the backend API is ready, follow these steps to connect it:

1. **Update `.env`:** Change `VITE_BACKEND_URL` to point to the live API endpoint.

2. **Update `AuthContext.jsx`:**
   - Comment out or remove the mock `customerLogin` and `adminLogin` functions.
   - Implement the real API calls using your `authService`.
   - Comment out the mock user data in the `useEffect` and implement the real token validation logic.

3. **Update `ProductContext.jsx`:**
   - Comment out or remove the `setTimeout` and mock product array.
   - Uncomment the `apiGetAllProducts()` call to fetch real data from the backend.

4. **Update `src/services/`:** Build out the `authService.js`, `productService.js`, etc., with functions that use the `api.js` Axios instance.

## Styling

Styling is handled exclusively with **Tailwind CSS**.

- Global styles and Tailwind directives are in `src/index.css`.
- All custom theme settings (colors, fonts) should be added to `tailwind.config.js`.

## Available Scripts

In the project directory, you can run:

- **`npm run dev`:** Starts the Vite development server.
- **`npm run build`:** Bundles the app for production.
- **`npm run preview`:** Serves the production build locally.
