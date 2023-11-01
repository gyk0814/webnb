-- migrate:up
CREATE TABLE thumbnails (
    id int PRIMARY KEY NOT NULL auto_increment,
    room_id int NOT NULL,
    img_url varchar(300) NOT NULL,
    constraint thumb_nails_id_fk FOREIGN KEY (room_id) REFERENCES rooms (id)
);

-- migrate:down
DROP TABLE thumb_nails;
