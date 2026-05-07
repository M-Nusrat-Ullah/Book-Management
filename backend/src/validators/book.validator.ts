import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
  genre: z.string().min(1, "Genre is required"),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  rating: z.number().min(0).max(5).optional(),
  coverImage: z.string().url().optional()
});

export const updateBookSchema = createBookSchema.partial();