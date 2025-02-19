const jwt = require('jsonwebtoken');
// const userModel = require('../models/userModel');
const User = require('../models/userModel');

// Decode token
module.exports = async function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log('token', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('userId',decoded.id)
        const user = decoded.id;
        console.log('user',user)
        

        const foundUser = await User.findById({_id:user});
        console.log(foundUser);
        if(foundUser.isAdmin){
            next()
        }else{
            res.status(403).send({
                message: "Unauthorized. You are not an admin.",
                success: false,
            });
        }

        

        
        // next();
    } catch (error) {
        res.status(401).send({
            message: error.message,
            success: false,
        });
    }
}