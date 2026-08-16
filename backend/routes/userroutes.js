const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");
const adminOnly = require("../middleware/adminMiddleware");


// Route khusus admin
router.get("/admin", protect, adminOnly, (req, res) => {

    res.status(200).json({
        message: "Selamat datang Admin",
        user: req.user
    });

});


module.exports = router;