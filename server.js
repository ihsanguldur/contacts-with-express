const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

dotenv.config();

app.use(express.json());
app.use('/api',router);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("server started on " + PORT);
})