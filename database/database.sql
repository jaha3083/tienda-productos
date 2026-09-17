CREATE DATABASE IF NOT EXISTS tienda;

USE tienda;

CREATE TABLE IF NOT EXISTS Products (
    idProducts INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL,
    PRIMARY KEY (idProducts)
);

INSERT INTO Products (product_name, price, Stock)
VALUES
('Cable USB', 45.00, 25),
('Adaptador USB', 60.00, 18),
('Mouse Pad', 75.00, 30),
('Audifonos', 85.00, 20),
('Cable HDMI', 95.00, 15),
('Memoria USB 32GB', 110.00, 12),
('Mouse Inalambrico', 150.00, 10),
('Teclado Inalambrico', 250.00, 8),
('Soporte para Celular', 90.00, 22),
('Lector de Tarjetas', 70.00, 14);