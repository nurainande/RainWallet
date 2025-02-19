const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const connectionResult = mongoose.connection;

connectionResult.on('error', ()=>{
    console.log('connection error:')
});
connectionResult.on('connected', ()=>{
    console.log('Mongo DB connected successfully')
});

module.exports = connectionResult;