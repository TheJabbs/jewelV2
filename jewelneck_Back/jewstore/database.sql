CREATE TABLE customers (
                           cust_id INT PRIMARY KEY AUTO_INCREMENT,
                           username VARCHAR(100) NOT NULL,
                           email VARCHAR(100) UNIQUE NOT NULL,
                           pass varchar(100) not null,
                           phone VARCHAR(20) UNIQUE
);

create table product_cat (
                             cat_id INT PRIMARY KEY AUTO_INCREMENT,
                             cat_name VARCHAR(100) NOT NULL
);

create table product (
                         prod_id INT PRIMARY KEY AUTO_INCREMENT,
                         prod_name varchar(100) not null,
                         prod_description varchar(100) not null,
                         prod_img varchar(100) not null default "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
                         cat_id INT,
                         cost float4 not null,
                         created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (cat_id) REFERENCES product_cat(cat_id) ON DELETE CASCADE On Update Cascade
);

create table product_img(
                            img_id INT PRIMARY KEY AUTO_INCREMENT,
                            prod_id int not null,
                            img varchar(100) not null default "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
                            img_prio int,
                            FOREIGN KEY (prod_id) REFERENCES product(prod_id) ON DELETE CASCADE On Update Cascade
);

create table orders(
                       order_id INT PRIMARY KEY AUTO_INCREMENT,
                       cust_id int not null,
                       prod_id int not null,
                       created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table cart(
                     cart_id INT PRIMARY KEY AUTO_INCREMENT,
                     cust_id int not null,
                     prod_id int not null,
                     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
