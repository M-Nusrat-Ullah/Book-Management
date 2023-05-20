const mongoose = require("../DB");
const userSchema = require("../schemas/users");
const User = mongoose.model("User", userSchema);

module.exports = User;