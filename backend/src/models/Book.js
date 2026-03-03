import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookname: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      required: true,
    },
    starrating: {
      type: Number,
      required: true,
      min:1,
      max:5,
    },
    image: {
      type: String,
      required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  },
  { timestamps: true }
);

const  Book = mongoose.model("Book", bookSchema);

export default Book;