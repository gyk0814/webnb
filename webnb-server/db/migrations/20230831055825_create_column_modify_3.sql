-- migrate:up
ALTER TABLE reservations MODIFY is_paid TINYINT default(0);

-- migrate:down
ALTER TABLE reservations MODIFY is_paid default(null);
