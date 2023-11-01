-- migrate:up
CREATE TABLE images (
  id int PRIMARY KEY NOT NULL auto_increment,
  room_id int,
  image_url varchar(255) NOT NULL,
constraint images_rooom_id_fk FOREIGN KEY (room_id) REFERENCES rooms (id)
);


-- migrate:down

DROP TABLE images;
