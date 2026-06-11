import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", { title, content, author });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">My Blog</h1>
      </nav>

      <div className="max-w-3xl mx-auto mt-8 px-4">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 rounded mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              className="w-full border p-2 rounded mb-4"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
              placeholder="Content"
              className="w-full border p-2 rounded mb-4 h-40"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Publish Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
