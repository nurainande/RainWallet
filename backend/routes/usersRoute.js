const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const admin = require('../middlewares/admin');

router.get('/', function (req, res){
    res.send('Hello from the API!');
})

// Register user account
router.post("/register", async (req, res) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.send({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;

        const newUser = new User(req.body);

        await newUser.save();

        res.send({
            message: "User created successfully",
            data: null,
            success: true,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        // Check if user exists
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password",
            });
        }

        if(!user.isVerified){
            return res.send({
                success: false,
                message: "Account not verified",
            });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.send({
            message: "User logged in successfully",
            data: token,
            success: true,
            token: token
        });
    } catch (error) {
        // Handle any errors that occur during the login process
        res.send({
            message: error.message,
            success: false,
        });
    }
});


// Get user info
router.post("/get-user-info",authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        // user.password = "***"; // Remove password for security

        res.send({
            message: "User info fetched successfully",
            data: user,
            success: true,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

router.delete('/delete',admin, async (req, res) => {
    // Delete all users
    const deletedUsers = await User.deleteMany();
    res.send({
        message: "All users deleted successfully",
        success: true,
    });
})

// get all users

router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find()
        res.send({
            message: "Users fetched successfully",
            data: users,
            success: true,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

// update user verified status

router.post("/update-user-verified-status", authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.selectedUser, {
            isVerified: req.body.isVerified,
        });

        res.send({
            data: null,
            message: "User verified status updated successfully",
            success: true,
        });
    } catch (error) {
        res.send({
            data: error,
            message: error.message,
            success: false,
        });
    }
});

module.exports = router;

module.exports = router;