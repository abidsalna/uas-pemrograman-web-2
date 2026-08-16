const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getMembers,
    createMember,
    updateMember,
    deleteMember
} = require("../controllers/memberController");

router.get("/", protect, getMembers);
router.post("/", protect, createMember);
router.put("/:id", protect, updateMember);
router.delete("/:id", protect, deleteMember);

module.exports = router;