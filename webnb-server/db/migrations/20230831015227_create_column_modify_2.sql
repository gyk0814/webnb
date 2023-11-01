-- migrate:up
ALTER TABLE rooms MODIFY title VARCHAR(255) NOT NULL;
ALTER TABLE rooms MODIFY user_id INT NOT NULL;
ALTER TABLE rooms MODIFY location_id INT NOT NULL;
ALTER TABLE images MODIFY room_id INT NOT NULL;
ALTER TABLE room_amenities MODIFY room_id INT NOT NULL;
ALTER TABLE room_amenities MODIFY guests_count INT DEFAULT(1) NOT NULL;
ALTER TABLE room_amenities MODIFY bedrooms_count INT DEFAULT(1) NOT NULL;
ALTER TABLE room_amenities MODIFY baths_count INT DEFAULT(1) NOT NULL;
ALTER TABLE room_amenities MODIFY wifi_boolean TINYINT DEFAULT(false) NOT NULL;
ALTER TABLE room_amenities MODIFY tv_count INT DEFAULT(1) NOT NULL;
ALTER TABLE room_amenities MODIFY air_conditioning_count INT DEFAULT(1) NOT NULL;
ALTER TABLE room_amenities MODIFY amenities INT DEFAULT(1) NOT NULL;
ALTER TABLE room_likes MODIFY user_id INT NOT NULL;
ALTER TABLE room_likes MODIFY room_id INT NOT NULL;
ALTER TABLE room_likes MODIFY like_list_id INT NOT NULL;

-- migrate:down
ALTER TABLE rooms MODIFY title INT;
ALTER TABLE rooms MODIFY user_id INT;
ALTER TABLE rooms MODIFY location_id INT;
ALTER TABLE images MODIFY room_id INT;
ALTER TABLE room_amenities MODIFY room_id INT;
ALTER TABLE room_amenities MODIFY guests_count INT;
ALTER TABLE room_amenities MODIFY bedrooms_count INT;
ALTER TABLE room_amenities MODIFY baths_count INT;
ALTER TABLE room_amenities MODIFY wifi_boolean boolean;
ALTER TABLE room_amenities MODIFY tv_count INT;
ALTER TABLE room_amenities MODIFY air_conditioning_count INT;
ALTER TABLE room_amenities MODIFY amenities INT;
ALTER TABLE room_likes MODIFY user_id INT;
ALTER TABLE room_likes MODIFY room_id INT;
ALTER TABLE room_likes MODIFY like_list_id INT;
