const mongoose = require("mongoose");

const prenameSchema = mongoose.Schema({
    prename: String,
})
const appendedName = mongoose.model("appendedName", prenameSchema);

module.exports = appendedName;