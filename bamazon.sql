DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SNES Classic", "Video Games" , 124, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skillet", "Cookware" , 20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Barbie Doll", "Toys" , 8, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dark Souls 3", "Video Games" , 60, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1000 Sheets of Paper", "Miscellaneous" , 3, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spider-Man Figure", "Toys" , 10, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hollow Knight", "Video Games" , 15, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Washing Machine", "Appliance" , 225, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Notebook/Journal", "Office Supplies" , 10, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pens", "Office Supplies" , 5, 90);