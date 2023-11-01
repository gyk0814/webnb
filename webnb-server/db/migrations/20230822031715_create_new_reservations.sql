-- migrate:up
CREATE TABLE reservations (
  id int PRIMARY KEY NOT NULL auto_increment,
  user_id int NOT NULL,
  room_id int NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
constraint reservations_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
constraint reservations_room_id_fk FOREIGN KEY (room_id) REFERENCES rooms (id)
);
-- migrate:down

DROP TABLE reservations;