-- migrate:up
CREATE TABLE users (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(10) NOT NULL,
  email varchar(100) NOT NULL unique,
  password varchar(200) NOT NULL,
  profile_image varchar(300) default "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg",
  is_host boolean DEFAULT (false),
  point decimal(9,2) DEFAULT 1000000,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp null DEFAULT null on update current_timestamp
);
-- migrate:down

DROP TABLE users;