let mongoose = require("mongoose");

var Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
