const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
{
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },

    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },

    borrowDate: {
        type: Date,
        default: Date.now
    },

    returnDate: {
        type: Date
    },

    status: {
        type: String,
        enum: ["Dipinjam", "Dikembalikan"],
        default: "Dipinjam"
    }

},
{
    timestamps: true
}
);

module.exports = mongoose.model("Loan", loanSchema);