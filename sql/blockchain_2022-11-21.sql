# ************************************************************
# Sequel Ace SQL dump
# Version 20042
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 5.7.38)
# Database: blockchain
# Generation Time: 2022-11-21 02:52:31 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table blockchain_article_images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blockchain_article_images`;

CREATE TABLE `blockchain_article_images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `is_deleted` int(11) DEFAULT '0',
  `article_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table blockchain_articles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blockchain_articles`;

CREATE TABLE `blockchain_articles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `description` text,
  `read_time` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  `is_deleted` int(11) DEFAULT '0',
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `blockchain_articles` WRITE;
/*!40000 ALTER TABLE `blockchain_articles` DISABLE KEYS */;

INSERT INTO `blockchain_articles` (`id`, `title`, `content`, `description`, `read_time`, `create_time`, `update_time`, `is_deleted`, `image_url`)
VALUES
	(1,'Unspent Transaction Output (UTXO)','%3Cp%3EAn%20unspent%20transaction%20output%20(UTXO)%20refers%20to%20a%20transaction%20output%20that%20can%20be%20used%20as%20input%20in%20a%20new%20transaction.%20In%20essence%2C%20UTXOs%20define%20where%20each%20blockchain%20transaction%20starts%20and%20finishes.%20The%20UTXO%20model%20is%20a%20fundamental%20element%20of%20Bitcoin%20and%20many%20other%20cryptocurrencies.%3C%2Fp%3E%0A%3Cp%3EIn%20other%20words%2C%20cryptocurrency%20transactions%20are%20made%20of%20inputs%20and%20outputs.%20Anytime%20a%20transaction%20is%20made%2C%20a%20user%20takes%20one%20or%20more%20UTXOs%20to%20serve%20as%20the%20input(s).%20Next%2C%20the%20user%20provides%20their%20digital%20signature%20to%20confirm%20ownership%20over%20the%20inputs%2C%20which%20finally%20result%20in%20outputs.%20The%20UTXOs%20consumed%20are%20now%20considered%20%22spent%2C%22%20and%20can%20no%20longer%20be%20used.%20Meanwhile%2C%20the%20outputs%20from%20the%20transaction%20become%20new%20UTXOs%20%E2%80%93%20which%20can%20be%20spent%20in%20a%20new%20transaction%20later.%3C%2Fp%3E%0A%3Cp%3EThis%20is%20probably%20better%20explained%20with%20an%20example.%20Alice%20has%200.45%20BTC%20in%20her%20wallet.%20This%20isn%E2%80%99t%20a%20fraction%20of%20a%20coin%20as%20we%20might%20conceptualize%20it.%20It%E2%80%99s%20rather%20a%20collection%20of%20UTXOs.%20Specifically%2C%20two%20UTXOs%20worth%200.4%20BTC%2C%20and%200.05%20BTC%20%E2%80%93%20outputs%20from%20past%20transactions.%20Now%20let\'s%20imagine%20that%20Alice%20needs%20to%20make%20a%20payment%20to%20Bob%20of%200.3%20BTC.%0AHer%20only%20option%20here%20is%20to%20break%20up%20the%200.4%20BTC%20unit%20and%20to%20send%200.3%20BTC%20to%20Bob%2C%20and%200.1%20BTC%20back%20to%20herself.%20She%20would%20normally%20reclaim%20less%20than%200.1%20BTC%20due%20to%20mining%20fees%2C%20but%20let\'s%20simplify%20and%20leave%20the%20miner%20out.%0AAlice%20creates%20a%20transaction%20that%20essentially%20says%20to%20the%20network%3A%20take%20my%200.4%20BTC%20UTXO%20as%20an%20input%2C%20break%20it%20up%2C%20send%200.3%20BTC%20of%20it%20to%20Bob%E2%80%99s%20address%20and%20return%20the%200.1%20BTC%20to%20my%20address.%20The%200.4%20BTC%20is%20now%20a%20spent%20output%2C%20and%20can%E2%80%99t%20be%20reused.%20Meanwhile%2C%20two%20new%20UTXOs%20have%20been%20created%20(0.3%20BTC%20and%200.1%20BTC).%3C%2Fp%3E%0A%3Cp%3ENote%20that%20we%20broke%20up%20a%20UTXO%20in%20this%20example%2C%20but%20if%20Alice%20had%20to%20pay%200.42%20BTC%2C%20she%20could%20just%20as%20easily%20have%20combined%20her%200.4%20BTC%20with%20another%200.05%20BTC%20to%20produce%20a%20UTXO%20worth%200.42%20BTC%2C%20while%20returning%200.03%20BTC%20to%20herself.%3C%2Fp%3E%0A%3Cp%3ESumming%20up%2C%20the%20UTXO%20model%20serves%20as%20the%20protocol%E2%80%99s%20mechanism%20for%20keeping%20track%20of%20where%20coins%20are%20at%20any%20given%20time.%20In%20a%20sense%2C%20they%20operate%20much%20like%20cheques%3A%20they%E2%80%99re%20addressed%20to%20specific%20users%20(or%20rather%2C%20their%20public%20addresses).%20UTXOs%20cannot%20be%20spent%20in%20part%20%E2%80%93%20instead%2C%20new%20cheques%20must%20be%20created%20from%20the%20old%20one%20and%20passed%20along%20accordingly.%3C%2Fp%3E%0A','Unspent Transaction Output (UTXO)',5,'2022-11-20 23:22:26','2022-11-20 23:22:26',0,'https://public.bnbstatic.com/image/cms/blog/20210923/4d355307-c090-47d9-aeaa-88bcdb17751e.png');

/*!40000 ALTER TABLE `blockchain_articles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table blockchain_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blockchain_categories`;

CREATE TABLE `blockchain_categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `blockchain_categories` WRITE;
/*!40000 ALTER TABLE `blockchain_categories` DISABLE KEYS */;

INSERT INTO `blockchain_categories` (`id`, `category`)
VALUES
	(1,'Blockchain'),
	(2,'Coin'),
	(3,'Web3'),
	(4,'NFT'),
	(5,'DeFi'),
	(6,'Dapp'),
	(7,'Wallet'),
	(8,'Other');

/*!40000 ALTER TABLE `blockchain_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table blockchain_platforms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blockchain_platforms`;

CREATE TABLE `blockchain_platforms` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `logo_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  `is_deleted` int(11) DEFAULT '0',
  `description` text,
  `website_url` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `blockchain_platforms` WRITE;
/*!40000 ALTER TABLE `blockchain_platforms` DISABLE KEYS */;

INSERT INTO `blockchain_platforms` (`id`, `logo_url`, `name`, `create_time`, `update_time`, `is_deleted`, `description`, `website_url`, `category`)
VALUES
	(1,'https://bitcoin.org/img/icons/logotop.svg','BTC','2022-11-20 23:31:27','2022-11-20 23:31:27',0,'Bitcoin is an innovative payment network and a new kind of money.','https://bitcoin.org/en/','Blockchain'),
	(2,'https://d33wubrfki0l68.cloudfront.net/13ca0c32ffd56bcfaf861b9a8acb212d0f6482e3/d8df6/static/c3bcc8c47890ffd2a2c329972c73d0fd/e018d/ethereum-logo-portrait-black-gray.png','ETH','2022-11-20 23:33:47','2022-11-20 23:33:47',0,'Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.','https://ethereum.org/en/','Blockchain'),
	(3,'https://solana.com/_next/static/media/dark-horizontal.c3a5eb36.svg','Solana','2022-11-20 23:35:19','2022-11-20 23:35:19',0,'Solana is a decentralized blockchain built to enable scalable, user-friendly apps for the world.','https://solana.com','Blockchain');

/*!40000 ALTER TABLE `blockchain_platforms` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
