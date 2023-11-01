-- migrate:up
CREATE TABLE rooms (
  id int PRIMARY KEY NOT NULL auto_increment,
  title varchar(255),
  thumb_nail varchar(255) NOT NULL,
  room_description text null,
  user_id int,
  location_id int,
  price int NOT NULL,
  category_id int NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp null DEFAULT null on update current_timestamp,
  constraint rooms_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id),
  constraint rooms_location_id_fk FOREIGN KEY (location_id) REFERENCES locations(id),
  constraint rooms_category_id_fk FOREIGN KEY (category_id) REFERENCES categories(id)
);
-- migrate:down

DROP TABLE rooms;