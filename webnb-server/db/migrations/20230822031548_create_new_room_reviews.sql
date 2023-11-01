-- migrate:up
CREATE TABLE room_reviews (
  id int PRIMARY KEY NOT NULL auto_increment,
  room_id int NOT NULL,
  user_id int NOT NULL,
  content varchar(500) NOT NULL,
  ratings float DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
constraint room_reviews_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
constraint room_reviews_room_id_fk FOREIGN KEY (room_id) REFERENCES rooms (id)
);

-- migrate:down

DROP TABLE room_reviews;