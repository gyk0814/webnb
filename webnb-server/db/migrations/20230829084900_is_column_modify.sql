-- migrate:up
ALTER TABLE room_amenities MODIFY amenities TINYINT;

-- migrate:down
ALTER TABLE room_amenities MODIFY amenities INT;