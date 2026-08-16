const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, dan password wajib diisi"
            });
        }

if (name.length < 3) {
    return res.status(400).json({
        message: "Nama minimal 3 karakter"
    });
}
// Validasi format email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Format email tidak valid"
    });
}
// Validasi password
if (password.length < 6) {
    return res.status(400).json({
        message: "Password minimal 6 karakter"
    });
}


        // Cek email sudah terdaftar
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email sudah terdaftar"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user ke MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Register berhasil",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        

        // Validasi
        if (!email || !password) {
            return res.status(400).json({
                message: "Email dan password wajib diisi"
            });
        }

        // Validasi format email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Format email tidak valid"
    });
}

// Validasi password
if (password.length < 6) {
    return res.status(400).json({
        message: "Password minimal 6 karakter"
    });
}

        // Cari user di MongoDB
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Email atau Password salah"
            });
        }

        // Periksa password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Email atau Password salah"
            });
        }

        // Membuat JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login berhasil",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET PROFILE
exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Data user berhasil diambil",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
};
// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        // Validasi
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Password lama dan password baru wajib diisi"
            });
        }

        if (newPassword.length < 6) {
    return res.status(400).json({
        message: "Password baru minimal 6 karakter"
    });
}

        // Cari user yang sedang login
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }

        // Periksa password lama
        const passwordMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Password lama salah"
            });
        }

        // Hash password baru
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // Simpan password baru
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "Password berhasil diubah"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};