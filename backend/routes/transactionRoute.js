const router = require('express').Router();
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const authMiddleware = require('../middlewares/authMiddleware');
const stripe = require("stripe")
const Stripe = stripe(process.env.stripe_key)
const {uuid} = require("uuidv4");
const { v4 } = require('uuid');
const id = v4();

// Transfer money from one account to another
router.post('/transfer-funds', authMiddleware, async (req, res) => {
    try {
        // Save the transaction
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();

        // Decrease the sender's balance
        await User.findByIdAndUpdate(req.body.sender, {
            $inc: { balance: -req.body.amount },
        });

        // Increase the receiver's balance
        await User.findByIdAndUpdate(req.body.reciever, {
            $inc: { balance: req.body.amount },
        });

        // const reciever = await User.findById({_id:req.body.reciever})

        res.send({
            message: 'Transaction successful',
            data: newTransaction,
            // reciever:reciever,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        });
    }
});

// Verify accout Number -67a52b0ee6b6d3ceff98f43d

router.post('/verify-account', authMiddleware, async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.body.receiver });
        console.log(user)

        if (user) {
            // ... (verification logic, e.g., updating user status)
            res.send({
                message: "Account verified",
                data: user,
                success: true,
            });
        } else {
            res.send({
                message: "Account not found",
                data: null,
                success: false,
            });
        }
    } catch (error) {
        res.send({
            message: "Account not found",
            data: error.message,
            success: false,
        });
    }
});

router.post("/get-all-transactions-by-user",authMiddleware, async (req, res) => {
        try {
            const transactions = await Transaction.find({
                $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
            }).sort({createdAt:-1}).populate("sender").populate("reciever")

            res.send({
                message: "Transactions fetched",
                data: transactions,
                success: true,
            });
        } catch (error) {
            // Handle the error
            res.status(500).send({
                message:'Transaction not fetched',
                data: error.message,
                success: false,
            });
        }
});


// deposite funds using stripe

router.post("/deposit-funds", authMiddleware, async (req,res)=>{
    try {
        const {token,amount} = req.body
        const chargeAmount = amount * 100; // Convert to cents
        // console.log(token)

        console.log(req.userId)

        // create a customer
        const customer = await Stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        console.log('CUSTOMER',customer)
        console.log('amount', amount)

        // create a charge
        const charge = await Stripe.charges.create(
            {
            amount: chargeAmount,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "Deposited to rainwallet"
            },
            {
                idempotencyKey:id
            }
        )

        
        console.log('CHARGE',charge)
        if(!charge){
            console.log('CHARGE=======')
        }

        // save the transaction
        if (charge.status === "succeeded") {
            const newTransaction = new Transaction({
                sender: req.userId,
                reciever: req.userId,
                amount: amount,
                type: "deposit",
                reference:'stripe deposit',
                status: "success",
            });

            await newTransaction.save();
            // Increase the user's balance
            await User.findByIdAndUpdate(req.userId, {
                $inc: { balance: amount },
            });
    
            res.send({
                message:'Transaction successful',
                data: newTransaction,
                success:true
            })
        }else{
                res.send({
                    message: 'Transaction failed',
                    data: charge,
                    success: false
                })
            }

    } catch (error) {
        console.error('ERROR:', error);
        res.send({
            message: 'Transaction failed WOOFULLY',
            success: false
        })
    }
})

        
module.exports = router;