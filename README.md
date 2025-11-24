# Fuel Delivery System

A complete Fuel Delivery System with React Frontend, Node.js Backend, and MySQL Database.

## Project Structure

- `backend/`: Node.js/Express API
- `frontend/`: React/Vite Frontend
- `backend/db/schema.sql`: Database Schema

## Prerequisites

- Node.js (v14+)
- MySQL Server

## Setup Instructions

### 1. Database Setup

1. Open your MySQL client (Workbench, CLI, etc.).
2. Run the SQL commands in `backend/db/schema.sql` to create the database and tables.
3. (Optional) Insert the seed data provided in the comments of `schema.sql`.

### 2. Backend Setup

1. Navigate to `backend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with your DB credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=fuel_delivery_db
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup

1. Navigate to `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser at `http://localhost:5173`.
2. Register a new user or supplier.
3. Login to access the respective dashboard.
   - **User**: Place orders, track history.
   - **Supplier**: View and confirm orders, update delivery status.
   - **Admin**: Manage suppliers, view billing stats.

## API Endpoints

- **Auth**: `/api/auth/register`, `/api/auth/login`
- **User**: `/api/user/fuels`, `/api/user/order`, `/api/user/order/history`
- **Supplier**: `/api/supplier/orders`, `/api/supplier/order/:id/confirm`
- **Admin**: `/api/admin/suppliers`, `/api/admin/billing`
