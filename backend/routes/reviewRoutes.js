const express = require("express");
const router = express.Router();
const { reviewCode, getHistory } = require("../controllers/reviewController");

router.post("/", reviewCode);
router.get("/history", getHistory);

module.exports = router;