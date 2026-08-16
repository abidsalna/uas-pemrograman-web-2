const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");

const {
    register,
    login,
    me,
    changePassword
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);


router.get("/me", protect, me);

router.put("/change-password", protect, changePassword);

module.exports = router;