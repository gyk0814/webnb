-- migrate:up
CREATE TABLE room_likes (
  id int PRIMARY KEY NOT NULL auto_increment,
  user_id int,
  room_id int,
  like_list_id int,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
constraint room_likes_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
constraint room_likes_room_id_fk FOREIGN KEY (room_id) REFERENCES rooms (id),
constraint room_like_list_id_fk FOREIGN KEY (like_list_id) REFERENCES like_lists (id)
);


-- migrate:down

DROP TABLE room_likes;