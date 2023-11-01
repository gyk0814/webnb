-- migrate:up
CREATE TABLE like_lists (
  id int PRIMARY KEY NOT NULL auto_increment,
  title varchar(255) NOT NULL
);


-- migrate:down

DROP TABLE like_lists;
