const Book = require("../models/book");

// Menampilkan semua buku
exports.getBooks = async (req, res) => {

    try {

        const books = await Book.find();

        res.status(200).json(books);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Menambah buku
exports.createBook = async (req, res) => {

    try {

        const { title, author, category, stock } = req.body;

        // Validasi data wajib
        if (!title || !author || !category) {
            return res.status(400).json({
                message: "Judul, penulis, dan kategori wajib diisi"
            });
        }

        // Validasi stok
        if (stock === undefined || stock === null || stock === "") {
            return res.status(400).json({
                message: "Stok wajib diisi"
            });
        }

        if (isNaN(stock)) {
            return res.status(400).json({
                message: "Stok harus berupa angka"
            });
        }

        if (Number(stock) < 0) {
            return res.status(400).json({
                message: "Stok tidak boleh negatif"
            });
        }

        const book = await Book.create({
            title,
            author,
            category,
            stock: Number(stock)
        });

        res.status(201).json(book);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Update buku
exports.updateBook = async (req, res) => {

    try {

        const { title, author, category, stock } = req.body;

        // Validasi data wajib
        if (!title || !author || !category) {
            return res.status(400).json({
                message: "Judul, penulis, dan kategori wajib diisi"
            });
        }

        // Validasi stok
        if (stock === undefined || stock === null || stock === "") {
            return res.status(400).json({
                message: "Stok wajib diisi"
            });
        }

        if (isNaN(stock)) {
            return res.status(400).json({
                message: "Stok harus berupa angka"
            });
        }

        if (Number(stock) < 0) {
            return res.status(400).json({
                message: "Stok tidak boleh negatif"
            });
        }

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title,
                author,
                category,
                stock: Number(stock)
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Buku tidak ditemukan"
            });
        }

        res.status(200).json(book);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Hapus buku
exports.deleteBook = async (req, res) => {

    try {

        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Buku tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Buku berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};