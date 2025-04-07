-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `fullName` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `cart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cust_id` INTEGER NOT NULL,
    `prod_id` INTEGER NOT NULL,
    `created` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `zob_idx`(`cust_id`),
    INDEX `zobb_idx`(`prod_id`),
    PRIMARY KEY (`cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `cust_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `pass` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `phone`(`phone`),
    PRIMARY KEY (`cust_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cust_id` INTEGER NOT NULL,
    `prod_id` INTEGER NOT NULL,
    `created` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `xcv_idx`(`cust_id`),
    INDEX `xcvv_idx`(`prod_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `prod_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prod_name` VARCHAR(100) NOT NULL,
    `prod_description` VARCHAR(100) NOT NULL,
    `prod_img` VARCHAR(100) NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
    `cat_id` INTEGER NULL,
    `cost` FLOAT NOT NULL,
    `created` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `cat_id`(`cat_id`),
    PRIMARY KEY (`prod_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_cat` (
    `cat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_img` (
    `img_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prod_id` INTEGER NOT NULL,
    `img` VARCHAR(100) NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
    `img_prio` INTEGER NULL,

    INDEX `prod_id`(`prod_id`),
    PRIMARY KEY (`img_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `zob` FOREIGN KEY (`cust_id`) REFERENCES `customers`(`cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `zobb` FOREIGN KEY (`prod_id`) REFERENCES `product`(`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `xcv` FOREIGN KEY (`cust_id`) REFERENCES `customers`(`cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `xcvv` FOREIGN KEY (`prod_id`) REFERENCES `product`(`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `product_cat`(`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_img` ADD CONSTRAINT `product_img_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `product`(`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;
