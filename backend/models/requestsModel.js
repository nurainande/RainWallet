
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    
},{
    timestamps: true,  // automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('requests', requestSchema);