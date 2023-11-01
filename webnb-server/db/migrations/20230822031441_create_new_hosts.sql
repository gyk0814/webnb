-- migrate:up
CREATE TABLE hosts (
  id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id integer NOT NULL,
constraint hosts_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);


-- migrate:down

DROP TABLE hosts;