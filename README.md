# Order Management Frontend (Next.js)

This is the **frontend of the Order Management project** built with **Next.js 16+, TypeScript, TailwindCSS, shadcn/ui components**.  
It connects to the backend API to manage Orders with full CRUD functionality.

---

## Features

### Table / Grid

- **Columns:** Order No, Customer, Status, Amount, Created At, Updated At, Actions
- **Sorting:** Click column headers to toggle ascending/descending
- **Filtering:**
  - **Status:** Multi-select dropdown with checkboxes + optional text input for custom filter
  - **Customer:** Text input filter
  - **Global search box** for key fields
- **Pagination:**
  - Page navigation (Prev/Next)
  - Rows per page selector (10/20/50/100)
- **Clear filters** button to reset active filters
- **Loading indicators** while fetching data

### CRUD Operations

- **Add Order** (Dialog modal)
- **Edit Order** (Dialog modal)
- **Delete Order** with confirmation dialog
- **Toast notifications** for success/error messages

### UI Components (shadcn/ui)

- Table, Dialog, Inputs, Selects, Buttons, Badges, Toasts

### Auth & Interceptors (JWT-based)

- JWT-based authentication
- Redirect to login if token is missing/expired
- HTTP interceptor adds token to requests and handles unauthorized errors

### Routes

- `/login` → Login page
- `/orders` → Orders page (protected)

### State Management

- `useOrders` custom React hook manages:
  - Orders data
  - Filters
  - Pagination
  - Sorting
  - Loading states
  - Clear filters
- Centralized client-side state (React + useState + hooks)

---

## Installation & Running Locally

### 1. Clone the repository

git clone <repo-url>
cd order-management-frontend-next-app

### Install dependencies
npm install

### Environment Variables
File: .env
NEXT_PUBLIC_API_URL=http://localhost:4000

### Run Development Server
npm run dev

** Importnant **

### Login with below credentials
**Username**: admin
**Password**: admin123
```bash
