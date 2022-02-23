SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP DATABASE IF EXISTS `yarak`;
CREATE SCHEMA IF NOT EXISTS `yarac` DEFAULT CHARACTER SET utf8 ;
USE `yarac` ;

create user if not exists 'yarac'@'%' identified by 'apistkuhl';
grant insert, delete, update, select on yarac.* to 'yarac'@'%' identified by 'apistkuhl';
flush privileges;

CREATE TABLE IF NOT EXISTS `yarac`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(200) NULL,
  `firstname` VARCHAR(100) NULL,
  `lastname` VARCHAR(100) NULL,
  `password` VARCHAR(64) NULL,
  `join_date` DATE NOT NULL DEFAULT NOW(),
  `role` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prevent_username_duplicates` (username),
  UNIQUE KEY `prevent_email_duplicates` (email)
)ENGINE = InnoDB;

INSERT INTO `yarac`.`user`(
  username, 
  email, 
  firstname, 
  lastname, 
  password, 
  role) 
values ('admin', 'admin@yarac', 'Admin', 'User', 'admin', 1);

CREATE TABLE IF NOT EXISTS `yarac`.`topic` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `description` VARCHAR(2000) NULL,
  `creator` INT NOT NULL,
  `color` VARCHAR(255) NOT NULL DEFAULT '#fff',
  PRIMARY KEY (`id`),
  UNIQUE KEY 'prevent_name_duplicates' (name),
  INDEX `fk_topic_user_idx` (`creator` ASC) VISIBLE,
  CONSTRAINT `fk_topic_user`
    FOREIGN KEY (`creator`)
    REFERENCES `yarac`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `yarac`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topic_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `content` VARCHAR(500) NULL,
  `creation_date` TIMESTAMP DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  INDEX `fk_post_topic1_idx` (`topic_id` ASC) VISIBLE,
  INDEX `fk_post_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_topic1`
    FOREIGN KEY (`topic_id`)
    REFERENCES `yarac`.`topic` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `yarac`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `yarac`.`topic_member` (
  `uid` INT NOT NULL,
  `tid` INT NOT NULL,
  PRIMARY KEY (uid, tid),
  INDEX `fk_topic_member_user1_idx` (`uid` ASC) VISIBLE,
  INDEX `fk_topic_member_topic1_idx` (`tid` ASC) VISIBLE,
  CONSTRAINT `fk_topic_member_user1`
    FOREIGN KEY (`uid`)
    REFERENCES `yarac`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_topic_member_topic1`
    FOREIGN KEY (`tid`)
    REFERENCES `yarac`.`topic` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `yarac`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `text` VARCHAR(200) NULL,
  `creation_date` TIMESTAMP DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `yarac`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `yarac`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `yarac`.`label` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topic_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prevent_label_duplicates` (topic_id, name),
  CONSTRAINT `fk_topic_label`
    FOREIGN KEY (`topic_id`)
    REFERENCES `yarac`.`topic` (`id`)
);

CREATE TABLE IF NOT EXISTS `yarac`.`post_label` (
  `post_id` INT NOT NULL,
  `label_id` INT NOT NULL, 
  UNIQUE KEY `prevent_duplicated_assignments` (post_id, label_id),
  CONSTRAINT `fk_post`
    FOREIGN KEY (`post_id`)
    REFERENCES `yarac`.`post` (`id`),
  CONSTRAINT `fk_label`
    FOREIGN KEY (`label_id`)
    REFERENCES `yarac`.`label` (`id`)
);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;