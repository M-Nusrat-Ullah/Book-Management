import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook
} from "../controllers/book.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

router.post("/", protect, createBook);
router.patch("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;