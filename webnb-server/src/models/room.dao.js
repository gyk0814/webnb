const { AppDataSource } = require("./data-source");
const { createSqlFilterQuery } = require("./queryBuilder");

const getRoomList = async (
  userId,
  categoryId,
  locationId,
  page,
  limit,
  sortBy,
  minPrice,
  maxPrice
) => {
  try {
    const { whereQuery, orderingQuery, priceRangeQuery, pageQuery } =
      await createSqlFilterQuery(
        categoryId,
        locationId,
        page,
        limit,
        sortBy,
        minPrice,
        maxPrice
      );
    const data = await AppDataSource.query(
      `
      SELECT
        r.id as roomId,
        r.title as roomTitle,
        r.price,
        ra.beds_count,
        JSON_ARRAYAGG(i.image_url) AS images,
        reviewCounts,
        ratings,
        (rl.id IS NOT NULL) as isLiked,
        COALESCE((r.user_id = ?),0) as isMyPost
      FROM rooms r
      LEFT JOIN images i ON r.id = i.room_id
      LEFT JOIN (
        SELECT
          room_id,
          COUNT(id) as reviewCounts,
          AVG(ratings) as ratings
        FROM room_reviews group by room_id
      ) rr on rr.room_id = r.id
      LEFT JOIN room_likes rl ON rl.user_id = ? AND rl.room_id = r.id
      LEFT JOIN room_amenities ra on r.id = ra.room_id
      ${whereQuery}${priceRangeQuery}
      GROUP BY r.id, ra.beds_count,rl.id
      ${orderingQuery}
      ${pageQuery};
     `,
      [userId, userId]
    );
    return data;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { getRoomList };
