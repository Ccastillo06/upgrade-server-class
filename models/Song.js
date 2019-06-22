const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    name: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    authorId: { type: String, required: true }
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

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
