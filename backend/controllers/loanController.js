
const Book = require("../models/book");
const Loan = require("../models/Loan");
const Member = require("../models/member");

// Menampilkan semua peminjaman
exports.getLoans = async (req, res) => {
    try {

        const loans = await Loan.find()
            .populate("book")
            .populate("member");

        res.json(loans);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

    
// Menambah peminjaman
exports.createLoan = async (req, res) => {

    try {

        const { book, member } = req.body;

        const dataMember = await Member.findById(member);

if (!dataMember) {
    return res.status(404).json({
        message: "Member tidak ditemukan"
    });
}

        // Cari buku
        const dataBook = await Book.findById(book);

        if (!dataBook) {
            return res.status(404).json({
                message: "Buku tidak ditemukan"
            });
        }

        // Cek stok
        if (dataBook.stock <= 0) {
            return res.status(400).json({
                message: "Stok buku habis"
            });
        }

        // Kurangi stok
        dataBook.stock -= 1;
        await dataBook.save();

        // Simpan peminjaman
        const loan = await Loan.create({
            book,
            member
        });

        res.status(201).json(loan);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    

    }

};

// Mengembalikan buku

exports.returnLoan = async (req, res) => {

    try {

        const loan = await Loan.findById(req.params.id);

        if (!loan) {
            return res.status(404).json({
                message: "Data peminjaman tidak ditemukan"
            });
        }

        // Jangan dikembalikan dua kali
        if (loan.status === "Dikembalikan") {
            return res.status(400).json({
                message: "Buku sudah dikembalikan"
            });
        }

        // Cari buku
        const dataBook = await Book.findById(loan.book);

        if (dataBook) {
            dataBook.stock += 1;
            await dataBook.save();
        }

        // Update status peminjaman
        loan.status = "Dikembalikan";
        loan.returnDate = new Date();

        await loan.save();

        res.status(200).json(loan);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    

    }

};