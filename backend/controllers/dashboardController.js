const Book = require("../models/book");
const Member = require("../models/member");
const Loan = require("../models/Loan");

exports.getDashboard = async (req, res) => {

    try {

        const totalBooks = await Book.countDocuments();

        const totalMembers = await Member.countDocuments();

        const totalLoans = await Loan.countDocuments();

        const borrowedBooks = await Loan.countDocuments({
            status: "Dipinjam"
        });

        const returnedBooks = await Loan.countDocuments({
            status: "Dikembalikan"
        });

        res.status(200).json({
            totalBooks,
            totalMembers,
            totalLoans,
            borrowedBooks,
            returnedBooks
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};