const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    reciever:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('transactions', transactionsSchema);