-- migrate:up
CREATE TABLE categories (
  id int PRIMARY KEY NOT NULL auto_increment,
  name varchar(255) NOT NULL,
  image_icon varchar(255) NOT NULL
);


-- migrate:down

DROP TABLE categories;