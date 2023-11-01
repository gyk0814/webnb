const { AppDataSource } = require("./data-source")


const createReservation = async(userId, roomId, startDate, endDate) => {
     await AppDataSource.query (
        `INSERT INTO reservations (
            user_id,
            room_id,
            start_date,
            end_date)
        VALUES (
            ?,
            ?,
            ?,
            ?
        );
        `,
        [userId, roomId, startDate, endDate]
    );
};

const getExistingReservations = async(roomId, startDate, endDate) => {
    const [result] = await AppDataSource.query (
    `
    SELECT
      id,
      start_date,
      end_date
    FROM
      reservations
    WHERE
      room_id = ? AND
      (
        (start_date <= ? AND end_date >= ?) OR
        (start_date >= ? AND end_date <= ?)
      )
    `,
      [roomId, startDate, endDate, startDate, endDate]
    );
    return result;
  };
  
  
  
  
  
module.exports = { createReservation, getExistingReservations};