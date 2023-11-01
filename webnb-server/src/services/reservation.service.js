const reservationDao = require("../models/reservation.dao")

const reservations =  async (userId, roomId, startDate, endDate) => {

    const reservationCheck = await reservationDao.getExistingReservations(roomId, startDate, endDate);
    if(!reservationCheck) {
       await reservationDao.createReservation(userId, roomId, startDate, endDate); }
     else {
     const err = new Error("The reservation date overlaps with the current date");
     err.statuscode = 400;
     throw err;
    }
 };
 

module.exports = { reservations };