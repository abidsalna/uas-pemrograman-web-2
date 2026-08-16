const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getLoans,
    createLoan,
    returnLoan
} = require("../controllers/loanController");

router.get("/", protect, getLoans);

router.post("/", protect, createLoan);

router.put("/:id/return", protect, returnLoan);

module.exports = router;