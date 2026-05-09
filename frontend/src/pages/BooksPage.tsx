import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getBooks } from "../api/books";
import { useAuthStore } from "../store/authStore";

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", search],
    queryFn: () => getBooks(search),
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">BookShelf</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hi, {user?.name}</span>
          <Link
            to="/add-book"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            + Add Book
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* States */}
        {isLoading && <p className="text-center text-gray-500">Loading books...</p>}
        {error && <p className="text-center text-red-500">Failed to load books.</p>}
        {!isLoading && data?.data.length === 0 && (
          <p className="text-center text-gray-500">No books found. Add your first book!</p>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.map((book) => (
            <div key={book._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h2>
              <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-3">
                {book.genre}
              </span>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{book.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>⭐ {book.rating}/5</span>
                <span>{book.publishedYear}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}