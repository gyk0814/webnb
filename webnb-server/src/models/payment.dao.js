const { AppDataSource } = require("./data-source");

const paymentlist = async (
  userId,
  roomId,
  startDate,
  offset = 1,
  limit = 1
) => {
  const list = await AppDataSource.query(
    `
    SELECT
    u.id,
    u.name,
    u.point,
    r.id,
    r.title,
    r.price,
    r.thumb_nail,
    rva.ratings,
    rs.id,
    rs.start_date,
    rs.end_date
    FROM
    reservations rs
    LEFT JOIN users u
    on rs.user_id = u.id
    LEFT JOIN rooms r
    on rs.room_id = r.id
    LEFT JOIN (
      SELECT AVG(ratings) as ratings, room_id from room_reviews group by room_id
    ) rva
    on rva.room_id = r.id
    WHERE u.id = ? AND r.id = ? AND rs.start_date = ?;
    `,
    [userId, roomId, startDate]
  );
  return list;
};

const checkPrice = async (userId) => {
  const [price] = await AppDataSource.query(
    `
    SELECT
    u.point
    FROM
    users u
    WHERE u.id = ?
    `,
    [userId]
  );
  return price;
};

const paid = async (userId, roomId, startDate, price) => {
  const queryRunner = await AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `UPDATE
    users
    SET
    point = point - ?
    WHERE
    id = ?`,
      [price, userId]
    );
    await queryRunner.query(
      `UPDATE
    reservations
    SET
    is_paid = 1
    WHERE
    user_id = ?
    AND room_id = ?
    AND start_date = ?
    `,
      [userId, roomId, startDate]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  paymentlist,
  checkPrice,
  paid,
};
