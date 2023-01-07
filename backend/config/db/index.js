const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully');
  } catch (error) {
    console.log('Fail');
  }
};

module.exports = connectDB;
