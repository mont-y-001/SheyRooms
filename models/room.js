const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxcount: {
      type: Number,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    rentperday: {
      type: Number,
      required: true,
    },
    imageurls: {
      type: [String], // array of image URLs
      required: true,
    },
    currentbooking: {
      type: [String], // can later be array of booking IDs
      default: [],
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const roomModels = mongoose.model("room", roomSchema);
module.exports = roomModels;
