const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const Request = require('../models/requestsModel');

// get all requests for a user
router.post('/get-all-requests-by-user', authMiddleware ,async (req, res) => {
    try {
        const requests = await Request.find({
            $or: [{ sender: req.userId }, { reciever: req.userId }],
        }).populate('sender').populate('reciever');

        console.log(requests)

        res.send({
            data: requests,
            message: 'Requests fetched successfully',
            success: true,
        });
    } catch (error) {
        res.status(500).json({ error: error.message,message:'failed' });
    }
});

router.post("/send-request", authMiddleware ,async (req, res) => {
    try {
        const { reciever, amount, description } = req.body;

        const request = new Request({
            sender: req.userId,
            reciever,
            amount,
            description,
        });

        await request.save();

        res.send({
            data: request,
            message: "Request sent successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update a request status

router.post("/update-request-status", authMiddleware, async (req, res) => {
    try {
        if (req.body.status === "accepted") {

            // create a transaction
            const transaction = new Transaction({
                sender: req.body.reciever._id,
                reciever: req.body.sender._id,
                amount: req.body.amount,
                type:'pos-transfer',
                reference: req.body.description,
                status: "success",
            });

            await transaction.save();
            // update the balance of both users
            // deduct the amount from the sender
            if (req.body.status === "accepted") {
                // deduct the amount from the sender
                await User.findByIdAndUpdate(req.body.sender._id, {
                    $inc: { balance: -req.body.amount },
                });

                // add the amount to the receiver
                await User.findByIdAndUpdate(req.body.reciever._id, {
                    $inc: { balance: req.body.amount },
                });

                await Request.findByIdAndUpdate(req.body._id, {
                    status: req.body.status,
                });
            }
            // add the amount to the receiver
            // update the request status
        } else {
            // update the request status
        }

        res.send({
            data: null,
            message: "Request status updated successfully",
            success: true,
        });
    } catch (error) {
        // Handle error
        res.send({
            // data: request,
            message: error.message,
            success: false
        });
    }
});

module.exports = router;