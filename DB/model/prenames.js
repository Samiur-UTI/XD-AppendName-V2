import mongoose from "mongoose";

const prenameSchema = mongoose.Schema({
    prename: String,
    components: Array
})
const appendedName = mongoose.model("appendedName", prenameSchema);

export default appendedName;