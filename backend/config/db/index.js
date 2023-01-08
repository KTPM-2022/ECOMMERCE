const mongoose = require('mongoose');

class MongoConnection {
  constructor(conString) {
    this.conString = conString;
  }

  static getInstance(conString) {
    if (!this.instance) {
      this.instance = new MongoConnection(conString);
    }

    return this.instance;
  }

  async connect() {
    try {
      await mongoose.connect(this.conString);
      console.log('Successfully');
    } catch (error) {
      console.log('Fail');
    }
  }
}

const MongoConnectionInstance = MongoConnection.getInstance(process.env.MONGO_URI);

module.exports = MongoConnectionInstance;
