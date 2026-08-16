const Member = require("../models/member");

// Menampilkan semua member
exports.getMembers = async (req, res) => {

    try {

        const members = await Member.find();

        res.status(200).json(members);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Menambah member
exports.createMember = async (req, res) => {

    try {

        const { name, phone, address } = req.body;

        const member = await Member.create({
            name,
            phone,
            address
        });

        res.status(201).json(member);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update member
exports.updateMember = async (req, res) => {

    try {

        const member = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!member) {
            return res.status(404).json({
                message: "Member tidak ditemukan"
            });
        }

        res.status(200).json(member);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Hapus member
exports.deleteMember = async (req, res) => {

    try {

        const member = await Member.findByIdAndDelete(req.params.id);

        if (!member) {
            return res.status(404).json({
                message: "Member tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Member berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};