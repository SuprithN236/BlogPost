import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Profile() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/profile")
      .then((res) => setEmail(res.data.email))
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My Blog</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </nav>
      <div className="max-w-lg mx-auto mt-16">
        <div className="bg-white rounded shadow p-8">
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-medium">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
