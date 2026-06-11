import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch(() => navigate("/login"));
  }, []);

  const loadComments = (postId) => {
    api.get(`/posts/${postId}/comments`).then((res) => {
      setComments((prev) => ({ ...prev, [postId]: res.data }));
    });
  };

  const handleAddComment = (postId) => {
    const content = newComment[postId];
    if (!content) return;
    api
      .post(`/posts/${postId}/comments`, { content, author: "Me" })
      .then((res) => {
        setComments((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), res.data],
        }));
        setNewComment((prev) => ({ ...prev, [postId]: "" }));
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = (id) => {
    api.delete(`/posts/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My Blog</h1>
        <div className="flex gap-4">
          <Link
            to="/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Post
          </Link>
          <Link
            to="/profile"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto mt-8 px-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet. Create one!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded shadow p-6 mb-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-400">By {post.author}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/edit/${post.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-t pt-4">
                {!comments[post.id] ? (
                  <button
                    onClick={() => loadComments(post.id)}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    View Comments
                  </button>
                ) : (
                  <div>
                    <p className="text-sm font-semibold mb-2">Comments</p>
                    {comments[post.id].length === 0 ? (
                      <p className="text-sm text-gray-400 mb-2">
                        No comments yet.
                      </p>
                    ) : (
                      comments[post.id].map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded p-2 mb-2">
                          <p className="text-sm">{c.content}</p>
                          <p className="text-xs text-gray-400">By {c.author}</p>
                        </div>
                      ))
                    )}
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment[post.id] || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        className="border rounded p-1 text-sm flex-1"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
