id, Product_id, product_name, department_name, price, stock_quantity

CREATE DATABASE bamazon;
use DATABASE bamazon;

CREATE TABLE products (
    id INTEGER(11) AUTO_INCREMENT;
    Product_id INTEGER(6);
    product_name VARCHAR(45) NOT NULL;
    department_name VARCHAR(45);
    price INTEGER(6);
    stock_quantity INTEGER(5);


)