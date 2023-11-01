-- migrate:up
 ALTER TABLE reservations ADD is_paid TINYINT NOT NULL AFTER end_date;

-- migrate:down

ALTER TABLE reservations DROP is_paid;