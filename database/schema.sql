-- ---
-- Table 'User'
-- 
-- ---

DROP TABLE IF EXISTS `User`;
		
CREATE TABLE `User` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(64) NOT NULL,
  `RoleID` INTEGER(11) NOT NULL,
  `payService` VARCHAR(20) DEFAULT NULL,
  `mobile` INTEGER(11) NOT NULL,
  `serviceName` VARCHAR(60) NOT NULL,
  `location` VARCHAR(30) DEFAULT NULL,
  `address` VARCHAR(200) NOT NULL,
  `avatar` VARCHAR(200) NOT NULL,
  `cover` VARCHAR(200) NOT NULL,
  `video` VARCHAR(200) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `workingHours` VARCHAR(500) DEFAULT NULL,
  `categoryID` INTEGER(11) NOT NULL,
  `token` VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Cart'
-- 
-- ---

DROP TABLE IF EXISTS `Cart`;
		
CREATE TABLE `Cart` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `userID` INTEGER(11) NOT NULL,
  `productID` INTEGER(11) NOT NULL,
  `sold` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Category'
-- 
-- ---

DROP TABLE IF EXISTS `Category`;
		
CREATE TABLE `Category` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Product'
-- 
-- ---

DROP TABLE IF EXISTS `Product`;
		
CREATE TABLE `Product` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL ,
  `category` VARCHAR(50) NOT NULL ,
  `price` INTEGER(5) NOT NULL ,
  `userID` INTEGER(11) NOT NULL ,
  `rating` INTEGER(1) NOT NULL ,
  `quantity` INTEGER(4) NOT NULL ,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Comments'
-- 
-- ---

DROP TABLE IF EXISTS `Comment`;
		
CREATE TABLE `Comment` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `userID` INTEGER(11) NOT NULL ,
  `postID` INTEGER(11) NOT NULL ,
  `text` VARCHAR(3000) NOT NULL ,
  `date` DATE NOT NULL ,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Post'
-- 
-- ---

DROP TABLE IF EXISTS `Post`;
		
CREATE TABLE `Post` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `userID` INTEGER(11) NOT NULL ,
  `likes` INTEGER(11) NOT NULL ,
  `date` DATE NOT NULL ,
  `text` VARCHAR(3000) NOT NULL ,
  `image` VARCHAR(200) NOT NULL ,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Gallery'
-- 
-- ---

DROP TABLE IF EXISTS `Gallery`;
		
CREATE TABLE `Gallery` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `userID` INTEGER(11) NOT NULL ,
  `image` VARCHAR(200) NOT NULL ,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Bookmark'
-- 
-- ---

DROP TABLE IF EXISTS `Bookmark`;
		
CREATE TABLE `Bookmark` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `userID` INTEGER(11) NOT NULL,
  `providerID` INTEGER(11) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Roles'
-- 
-- ---

DROP TABLE IF EXISTS `Roles`;
		
CREATE TABLE `Roles` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `Role` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table Properties
-- ---

ALTER TABLE `User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Cart` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Category` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Comment` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Post` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Cart` ADD FOREIGN KEY (userID) REFERENCES `User` (`id`);
ALTER TABLE `Cart` ADD FOREIGN KEY (productID) REFERENCES `Product` (`id`);
ALTER TABLE `Product` ADD FOREIGN KEY (userID) REFERENCES `User` (`id`);
ALTER TABLE `Comment` ADD FOREIGN KEY (userID) REFERENCES `User` (`id`);
ALTER TABLE `Comment` ADD FOREIGN KEY (postID) REFERENCES `Post` (`id`);
ALTER TABLE `Post` ADD FOREIGN KEY (userID) REFERENCES `User` (`id`);
ALTER TABLE `User` ADD FOREIGN KEY (categoryID) REFERENCES `Category` (`id`);
ALTER TABLE `User` ADD FOREIGN KEY (RoleID) REFERENCES `Roles` (`id`);
ALTER TABLE `Gallery` ADD FOREIGN KEY (userID) REFERENCES `User` (`id`);
ALTER TABLE `Bookmark` ADD FOREIGN KEY (userID) REFERENCES `User` (`id`);
ALTER TABLE `Bookmark` ADD FOREIGN KEY (providerID) REFERENCES `User` (`id`);