const mongoose = require('mongoose');
require('dotenv').config()




const uri = process.env.mongo_url

  const connection = mongoose.connect(uri);

  module.exports = {
    connection
  }