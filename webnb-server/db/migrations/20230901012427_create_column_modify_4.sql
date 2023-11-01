-- migrate:up
ALTER TABLE reservations ADD UNIQUE (room_id, start_date, end_date);

-- migrate:down
ALTER TABLE reservation DROP UNIQUE;
