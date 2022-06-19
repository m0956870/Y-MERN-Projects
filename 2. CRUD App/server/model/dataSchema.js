const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    created: {
      type: Object,
    },
    updated: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Data = mongoose.model("data", dataSchema);

module.exports = Data;