const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true }
  },
  {
    timestamps: true,
    toJSON: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
);

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
