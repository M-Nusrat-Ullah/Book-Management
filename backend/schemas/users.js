const { mongoose } = require("../DB");
const { Schema } = mongoose;

const userSchema = new Schema ({
    bookName: {
        type: String,
        required: true,
    },
    publisherName: {
        type: String,
    },
    publisherAge: {
        type: Number,
    },
    pageNumber: {
        type: Number,
    },
    publishDate: {
        type: Date,
    }
});

module.exports = userSchema;