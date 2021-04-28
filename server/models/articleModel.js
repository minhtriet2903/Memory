const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
  },
  like: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model("Article", courseSchema);
