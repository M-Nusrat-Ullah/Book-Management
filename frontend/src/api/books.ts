import api from "./axios";
import type { BooksResponse, Book } from "../types";

export const getBooks = async (search?: string): Promise<BooksResponse> => {
  const response = await api.get("/books", { params: { search } });
  return response.data;
};

export const getBook = async (id: string): Promise<{ success: boolean; data: Book }> => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (data: Omit<Book, "_id" | "addedBy" | "createdAt" | "updatedAt">): Promise<{ success: boolean; data: Book }> => {
  const response = await api.post("/books", data);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`);
};