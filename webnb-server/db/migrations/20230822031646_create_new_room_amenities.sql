-- migrate:up
CREATE TABLE room_amenities (
  id int PRIMARY KEY NOT NULL auto_increment,
  room_id int,
  guests_count int,
  bedrooms_count int,
  beds_count int,
  baths_count int,
  wifi_boolean boolean,
  tv_count int,
  air_conditioning_count int,
  amenities int,
 constraint room_amenities_romm_id_fk FOREIGN KEY (room_id) REFERENCES rooms (id)
);
-- migrate:down

DROP TABLE room_amenities;