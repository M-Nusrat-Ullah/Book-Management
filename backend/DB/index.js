const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/bookdata"; 

mongoose.connect(connectionString);

module.exports = mongoose;