CREATE DATABASE IF NOT EXISTS fuel_delivery_db;
USE fuel_delivery_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255),
    fuel_stock DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_date DATE NOT NULL,
    status ENUM('pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'pending',
    supplier_id INT,
    payment_status ENUM('pending', 'paid') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

CREATE TABLE IF NOT EXISTS deliveries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    driver_name VARCHAR(255),
    vehicle_number VARCHAR(50),
    current_location VARCHAR(255),
    status ENUM('scheduled', 'in_transit', 'delivered') DEFAULT 'scheduled',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Seed Admin User (Password: admin123)
-- Note: In a real app, use hashed passwords. For this schema file, we'll assume the app handles hashing or we insert a known hash.
-- INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin@fda.com', '$2b$10$YourHashedPasswordHere', 'admin');
