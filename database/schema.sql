-- ---
-- Table 'User'
-- 
-- ---

DROP TABLE IF EXISTS `User`;
		
CREATE TABLE `User` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `pay_service` VARCHAR(20) NOT NULL,
  `mobile` INTEGER(11) NOT NULL,
  `service_name` VARCHAR(60) NOT NULL,
  `location` VARCHAR(30) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
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
-- Table Properties
-- ---

ALTER TABLE `User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Cart` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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