const express = require("express");

const { getRoomList } = require("../controllers/room.controller");

const router = express.Router();

router.get("", getRoomList);

module.exports = router;
