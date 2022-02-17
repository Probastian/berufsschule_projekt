SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `narc` DEFAULT CHARACTER SET utf8 ;
USE `narc` ;

create user if not exists 'narc'@'%' identified by 'apistkuhl';
grant insert, delete, update, select on narc.* to 'narc'@'%' identified by 'apistkuhl';
flush privileges;

CREATE TABLE IF NOT EXISTS `narc`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(200) NULL,
  `firstname` VARCHAR(100) NULL,
  `lastname` VARCHAR(100) NULL,
  `password` VARCHAR(64) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `narc`.`topic` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `description` VARCHAR(2000) NULL,
  `creator` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_topic_user_idx` (`creator` ASC) VISIBLE,
  CONSTRAINT `fk_topic_user`
    FOREIGN KEY (`creator`)
    REFERENCES `narc`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `narc`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topic_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `content` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_post_topic1_idx` (`topic_id` ASC) VISIBLE,
  INDEX `fk_post_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_topic1`
    FOREIGN KEY (`topic_id`)
    REFERENCES `narc`.`topic` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `narc`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `narc`.`topic_member` (
  `uid` INT NOT NULL,
  `tid` INT NOT NULL,
  INDEX `fk_topic_member_user1_idx` (`uid` ASC) VISIBLE,
  INDEX `fk_topic_member_topic1_idx` (`tid` ASC) VISIBLE,
  CONSTRAINT `fk_topic_member_user1`
    FOREIGN KEY (`uid`)
    REFERENCES `narc`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_topic_member_topic1`
    FOREIGN KEY (`tid`)
    REFERENCES `narc`.`topic` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `narc`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `text` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `narc`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `narc`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;