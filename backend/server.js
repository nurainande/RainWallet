const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const dbConfig = require('./config/dbConfig');

app.use(express.json())

app.use(cors());

const userRoute = require('./routes/usersRoute');
const transactionsRoute = require('./routes/transactionRoute');
const requestsRoute = require('./routes/requestsRoute');




app.use('/api/users', userRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/requests', requestsRoute);


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello, World shareWallet!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});