/*
Navicat MySQL Data Transfer

Source Server         : mylocal
Source Server Version : 50736
Source Host           : localhost:3306
Source Database       : channel_messenger

Target Server Type    : MYSQL
Target Server Version : 50736
File Encoding         : 65001

Date: 2022-12-01 21:18:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for channel
-- ----------------------------
DROP TABLE IF EXISTS `channel`;
CREATE TABLE `channel` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '频道名称',
  `createAt` datetime(6) DEFAULT NULL,
  `updateAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL COMMENT '标题',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `channel` bigint(20) unsigned NOT NULL COMMENT 'channel_id',
  `createAt` datetime(6) DEFAULT NULL,
  `updateAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
