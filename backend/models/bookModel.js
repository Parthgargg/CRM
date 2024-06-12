import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Money: {
      type: Number,
      required: true,
    },
    Day: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
