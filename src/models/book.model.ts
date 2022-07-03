import mongoose from "mongoose";

enum Category {
  Drama = "drama",
  Comedy = "comedy",
  Sport = "sport",
}

const bookSchema = new mongoose.Schema<Book>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["drama", "comedy", "sport"],
    },
    quantity: { type: Number, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false }
);

export const BookModel = mongoose.model("Book", bookSchema);

export type Book = {
  _id: string;
  title: string;
  image: string;
  category: Category;
  quantity: number;
  price: string;
  description: string;
};

export type BookPagination = {
  data: Book[];
  limit: number;
  page: number;
  length: number;
};

