const { AppDataSource } = require("./data-source");


const getDetail = async (roomId) => {
    return await AppDataSource.query(
        `
        SELECT
        a.id,
        a.title,
        a.room_description as roomDescription,
        a.thumb_nail as thumbNail,
        a.price,
        b.guests_count as guestsCount,
        b.bedrooms_count as bedroomsCount,
        b.beds_count as bedsCount,
        b.wifi_boolean wifiBoolean,
        b.air_conditioning_count as airConditioning,
        b.amenities,
        (
            SELECT JSON_ARRAYAGG(image_url)as imageUrl
            FROM images
            WHERE room_id = a.id
        ) AS imageUrl,
        d.name,
        E.name,
        E.profile_image as profileImage
    FROM
        rooms A
        LEFT JOIN room_amenities B ON a.id = b.room_id
        LEFT JOIN categories D ON a.category_id = d.id
        LEFT JOIN users E on a.user_id = E.id
    WHERE a.id =?;
   
     `, [roomId]
    );

};

const roomReview = async (roomId) => {
    return await AppDataSource.query(
        `
    SELECT a.room_id as roomId, c.name, c.profile_image as profileImage ,a.content, a.ratings, a.created_at as createdAt
	FROM room_reviews a
	LEFT JOIN rooms b ON a.room_id = b.id
	LEFT JOIN users c ON a.user_id = c.id
    WHERE a.room_id=?
	ORDER BY a.created_at DESC;
    `, [roomId]
    );
};

const createReviews = async (userId, roomId, content, ratings) => {
    return await AppDataSource.query(
        `
         INSERT into room_reviews
         (
            user_id as userId,
            room_id as roomId,
            content,
            ratings)
	     VALUES(?,
            ?,
            ?,
            ?)
        ` ,
        [userId, roomId, content, ratings]
    );

};

module.exports = { getDetail, roomReview, createReviews };