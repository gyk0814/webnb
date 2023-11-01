-- migrate:up
CREATE TABLE locations (
  id int PRIMARY KEY NOT NULL auto_increment,
  location_name varchar(255) NOT NULL  
);

-- migrate:down

DROP TABLE locations;