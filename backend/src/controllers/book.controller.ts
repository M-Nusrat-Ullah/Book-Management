import { Response } from "express";
import { Book } from "../models/Book";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createBookSchema,
  updateBookSchema
} from "../validators/book.validator";

export const createBook = async (req: AuthRequest, res: Response) => {
  const parsed = createBookSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors
    });
  }

  const book = await Book.create({
    ...parsed.data,
    addedBy: req.user?.id
  });

  return res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book
  });
};

export const getBooks = async (req: AuthRequest, res: Response) => {
  const search = req.query.search?.toString() || "";
  const genre = req.query.genre?.toString();

  const query: Record<string, unknown> = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } }
    ];
  }

  if (genre) {
    query.genre = genre;
  }

  const books = await Book.find(query)
    .populate("addedBy", "name email")
    .sort({ createdAt: -1 });

  return res.json({
    success: true,
    count: books.length,
    data: books
  });
};

export const getBookById = async (req: AuthRequest, res: Response) => {
  const book = await Book.findById(req.params.id).populate(
    "addedBy",
    "name email"
  );

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  return res.json({
    success: true,
    data: book
  });
};

export const updateBook = async (req: AuthRequest, res: Response) => {
  const parsed = updateBookSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors
    });
  }

  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  if (book.addedBy.toString() !== req.user?.id && req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to update this book"
    });
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true,
    runValidators: true
  });

  return res.json({
    success: true,
    message: "Book updated successfully",
    data: updatedBook
  });
};

export const deleteBook = async (req: AuthRequest, res: Response) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  if (book.addedBy.toString() !== req.user?.id && req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to delete this book"
    });
  }

  await book.deleteOne();

  return res.json({
    success: true,
    message: "Book deleted successfully"
  });
};