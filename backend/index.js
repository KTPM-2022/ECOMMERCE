const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const route = require('./routes');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

route(app);
app.use(express.static('frontend'));
app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
