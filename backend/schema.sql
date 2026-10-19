CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name VARCHAR(150) NOT NULL,
  category VARCHAR(80),
  brand VARCHAR(80),
  price REAL,
  stock_quantity INTEGER,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (product_name, category, brand, price, stock_quantity, description) VALUES
('iPhone 15 Pro', 'Smartphone', 'Apple', 1299.99, 25, 'Titanium body'),
('Galaxy S24', 'Smartphone', 'Samsung', 1199.00, 30, 'Snapdragon chip'),
('MacBook Air', 'Laptop', 'Apple', 1099.00, 15, 'M3 chip'),
('Dell XPS 15', 'Laptop', 'Dell', 1799.50, 10, 'Intel i7'),
('iPad Pro', 'Tablet', 'Apple', 999.00, 20, 'M2 chip'),
('Sony XM5', 'Headphones', 'Sony', 399.99, 40, 'Noise cancelling'),
('AirPods Pro', 'Earbuds', 'Apple', 249.00, 60, 'ANC earbuds'),
('Apple Watch', 'Wearable', 'Apple', 799.00, 12, 'Ultra 2'),
('MX Master 3', 'Accessory', 'Logitech', 99.99, 50, 'Wireless mouse'),
('Samsung Monitor', 'Display', 'Samsung', 549.00, 18, '32-inch 4K');