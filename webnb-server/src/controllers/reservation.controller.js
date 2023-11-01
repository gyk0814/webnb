const { catchAsync } = require("../utilities/errorHandle");
const reservationService = require("../services/reservation.service");


const createReservation = catchAsync (async (req, res) => { 
    const { roomId, startDate, endDate} = req.query;
    const user = req.user;
    const userId = user.id;
    await reservationService.reservations(userId, roomId, startDate, endDate);
    res.status(200).json({message: "Complete Reservation"})

});

module.exports = { createReservation };


