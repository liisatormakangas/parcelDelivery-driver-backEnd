/* this database use Huyen update */
drop database if exists parcelDelivery; 

create database parcelDelivery; 

use parcelDelivery; 

  

CREATE TABLE `user` ( 

  `id_user` int NOT NULL, 

  `user_name` varchar(45) NOT NULL, 

  `password` varchar(45) NOT NULL, 

  `first_name` varchar(45) NOT NULL, 

  `last_name` varchar(45) NOT NULL, 

  `telephone` varchar(45) NOT NULL, 

  `email` varchar(45) NOT NULL, 

  `street_address` varchar(45) NOT NULL, 

  `postal_code` char(5) NOT NULL, 

  `city` varchar(45) NOT NULL, 

  PRIMARY KEY (`id_user`) 

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

  

  

CREATE TABLE `parcel` ( 

  `id_parcel` int NOT NULL, 

  `id_user` int DEFAULT NULL, 

  `id_locker` int DEFAULT NULL, 

  `reciever_name` varchar(45) NOT NULL, 

  `reciever_telephone` varchar(45) NOT NULL, 

  `reciever_street_address` varchar(45) NOT NULL, 

  `reciever_postal_code` char(6) NOT NULL, 

  `reciever_city` varchar(45) NOT NULL, 

  `sender_name` varchar(45) NOT NULL, 

  `sender_telephone` varchar(45) DEFAULT NULL, 

  `sender_street_address` varchar(45) DEFAULT NULL, 

  `sender_postal_code` char(5) DEFAULT NULL, 

  `sender_city` varchar(45) DEFAULT NULL, 

  `parcel_dropoff_date` date NOT NULL, 

  `parcel_pickup_date` date NOT NULL, 

  `parcel_last_pickup_date` date NOT NULL, 

  `parcel_dropoff_code` int DEFAULT NULL, 

  `parcel_pickup_code` int DEFAULT NULL, 

  `status` tinyint NOT NULL, 

  PRIMARY KEY (`id_parcel`), 

  KEY `id_locker_idx` (`id_locker`), 

  KEY `id_user_idx` (`id_user`) 

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

  

CREATE TABLE `locker` ( 

  `id_cabinet` tinyint NOT NULL, 

  `parcel_id` int DEFAULT NULL, 

  `locker_number` tinyint NOT NULL, 

  `cabinet_status` tinyint NOT NULL, 

  PRIMARY KEY (`id_cabinet`), 

  KEY `parcel_id_idx` (`parcel_id`) 

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

  

-- Add the foreign key constraint for id_user 

ALTER TABLE `parcel` 

ADD CONSTRAINT `id_user` 

FOREIGN KEY (`id_user`) 

REFERENCES `user` (`id_user`) 

ON DELETE SET NULL; 

  

-- Add the foreign key constraint for id_locker 

ALTER TABLE `parcel` 

ADD CONSTRAINT `id_locker` 

FOREIGN KEY (`id_locker`) 

REFERENCES `locker` (`parcel_id`) 

ON DELETE SET NULL; 

  

-- Add the foreign key constraint for parcel_id 

ALTER TABLE `locker` 

ADD CONSTRAINT `parcel_id` 

FOREIGN KEY (`parcel_id`) 

REFERENCES `parcel` (`id_parcel`) 

ON DELETE SET NULL; 