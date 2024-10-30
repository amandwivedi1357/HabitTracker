const mongoose = require('mongoose');
require('dotenv').config()



// const uri = "mongodb://127.0.0.1:27017/jobApp";
const uri = process.env.mongo_url

  const connection = mongoose.connect(uri);

  module.exports = {
    connection
  }