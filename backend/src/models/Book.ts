import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  genre: string;
  publishedYear: number;
  rating: number;
  coverImage?: string;
  addedBy: mongoose.Types.ObjectId;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    genre: {
      type: String,
      required: [true, "Genre is required"]
    },
    publishedYear: {
      type: Number,
      required: [true, "Published year is required"]
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    coverImage: {
      type: String
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);