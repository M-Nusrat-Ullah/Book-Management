import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getBooks } from "../api/books";
import { aiSearch, getRecommendations } from "../api/ai";
import { useAuthStore } from "../store/authStore";
import type { Book } from "../types";

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResults, setAiResults] = useState<Book[] | null>(null);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"browse" | "ai-search" | "recommendations">("browse");
  const [recGenres, setRecGenres] = useState("");
  const [recMessage, setRecMessage] = useState("");

  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", search],
    queryFn: () => getBooks(search),
  });

  const aiSearchMutation = useMutation({
    mutationFn: (query: string) => aiSearch(query),
    onSuccess: (data) => setAiResults(data.results),
  });

  const recommendMutation = useMutation({
    mutationFn: () => getRecommendations(
      recGenres.split(",").map((g) => g.trim()).filter(Boolean),
      recMessage
    ),
    onSuccess: (data) => setRecommendations(data.recommendations),
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
          <Link to="/add-book" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            + Add Book
          </Link>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-red-500">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "browse", label: "📚 Browse" },
            { key: "ai-search", label: "🔍 AI Search" },
            { key: "recommendations", label: "🤖 AI Recommendations" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Browse Tab */}
        {activeTab === "browse" && (
          <>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isLoading && <p className="text-center text-gray-500">Loading books...</p>}
            {error && <p className="text-center text-red-500">Failed to load books.</p>}
            {!isLoading && data?.data.length === 0 && (
              <p className="text-center text-gray-500">No books found. Add your first book!</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.data.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          </>
        )}

        {/* AI Search Tab */}
        {activeTab === "ai-search" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Natural Language Search</h2>
            <p className="text-sm text-gray-500 mb-4">Ask in plain English — "books about magic" or "programming books with high rating"</p>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="e.g. books about magic and fantasy..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => aiSearchMutation.mutate(aiQuery)}
                disabled={aiSearchMutation.isPending || !aiQuery}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {aiSearchMutation.isPending ? "Searching..." : "Search"}
              </button>
            </div>
            {aiResults && (
              <>
                <p className="text-sm text-gray-500 mb-4">{aiResults.length} result(s) found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiResults.map((book) => <BookCard key={book._id} book={book} />)}
                </div>
                {aiResults.length === 0 && <p className="text-gray-500">No matching books found.</p>}
              </>
            )}
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === "recommendations" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">AI Book Recommendations</h2>
            <p className="text-sm text-gray-500 mb-4">Tell us what you like and get personalized recommendations</p>
            <input
              type="text"
              placeholder="Genres you like (comma separated, e.g. Programming, Fantasy)"
              value={recGenres}
              onChange={(e) => setRecGenres(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Tell us more about what you're looking for..."
              value={recMessage}
              onChange={(e) => setRecMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              onClick={() => recommendMutation.mutate()}
              disabled={recommendMutation.isPending || !recGenres}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 mb-4"
            >
              {recommendMutation.isPending ? "Getting recommendations..." : "Get Recommendations"}
            </button>
            {recommendations && (
              <div className="bg-blue-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap text-sm">
                {recommendations}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
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
  );
}