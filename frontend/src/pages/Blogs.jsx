import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Tag, Heart } from "lucide-react";
import axios from "axios";
import API_BASE_URL from '../apiConfig';
import { useAuth } from "../context/AuthContext";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const { user } = useAuth(); // Get current user from context

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/blogs`);
        if (data.length > 0) {
          setBlogs(data);
        } else {
          // Fallback to mock if API returns empty (no approved blogs in DB yet)
          throw new Error("No blogs found in DB");
        }
      } catch (err) {
        console.log("Using mock data (DB empty or fetch failed)", err);
        setBlogs([
          {
            _id: "1",
            title: "My Trip to Paris",
            content:
              "Paris was amazing, the Eiffel tower at night is a sight to behold...",
            user: { name: "Alice" },
            category: "City Travel",
            date: "2023-10-15",
            image:
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
            likes: [],
            views: 1240, tags: ['City']
          },
          {
            _id: "2",
            title: "Hidden Gems of Japan",
            content:
              "Kyoto has so many secret temples that are off the beaten path...",
            user: { name: "Bob" },
            category: "Adventure",
            date: "2023-11-02",
            image:
              "https://images.unsplash.com/photo-1480796927426-f609979314bd",
            likes: [],
            views: 890, tags: ['Adventure']
          },
          {
            _id: "3",
            title: "Backpacking Himachal",
            content:
              " The mountains are calling! A week in Kasol and Manali changed my life...",
            user: { name: "Charlie" },
            category: "Mountain",
            date: "2023-12-10",
            image:
              "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
            likes: [],
            views: 560, tags: ['Nature']
          },
          {
            _id: "4",
            title: "Street Food of Delhi",
            content:
              "From Chole Bhature to Golgappe, Delhi is a foodie paradise...",
            user: { name: "Divya" },
            category: "Food",
            date: "2024-01-05",
            image:
              "https://images.unsplash.com/photo-1587574293340-000000000000?auto=format&fit=crop&w=800&q=80",
            likes: [],
            views: 1500, tags: ['Food']
          },
          {
            _id: "5",
            title: "Safari in Kenya",
            content: "Witnessing the Big Five in the wild was a dream come true...",
            user: { name: "Elena" },
            category: "Wildlife",
            date: "2024-02-15",
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
            likes: [], views: 2100, tags: ['Nature']
          },
          {
            _id: "6",
            title: "Road Trip Route 66",
            content: "Driving across America on the historic Route 66...",
            user: { name: "Frank" },
            category: "Road Trip",
            date: "2024-03-01",
            image: "https://images.unsplash.com/photo-1525357948386-07faee2e8f00",
            likes: [], views: 1800, tags: ['USA']
          },
          {
            _id: "7",
            title: "Diving in Maldives",
            content: "Swimming with whale sharks and vibrant coral reefs...",
            user: { name: "Grace" },
            category: "Beach",
            date: "2024-03-20",
            image: "https://images.unsplash.com/photo-1516685304081-de7947d96f54",
            likes: [], views: 3200, tags: ['Ocean']
          },
          {
            _id: "8",
            title: "Hiking Patagonia",
            content: "The raw beauty of the Andes mountains is breathtaking...",
            user: { name: "Henry" },
            category: "Hiking",
            date: "2024-04-10",
            image: "https://images.unsplash.com/photo-1518182170546-0766aa6f6a56",
            likes: [], views: 900, tags: ['Adventure']
          },
          {
            _id: "9",
            title: "Cultural Kyoto",
            content: "The Geisha districts and tea ceremonies are timeless...",
            user: { name: "Iris" },
            category: "Culture",
            date: "2024-04-15",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
            likes: [], views: 1100, tags: ['Japan']
          },
          {
            _id: "10",
            title: "Wine Tasting in Tuscany",
            content: "Rolling hills, vineyards, and the best wine in the world...",
            user: { name: "Jack" },
            category: "Relaxation",
            date: "2024-05-01",
            image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea",
            likes: [], views: 2500, tags: ['Italy']
          }
        ]);
      }
    };
    fetchBlogs();
  }, []);

  const handleLike = async (e, blogId) => {
    e.preventDefault(); // Stop navigation
    e.stopPropagation();

    if (!user) {
      alert("Please login to like!");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const { data: updatedBlog } = await axios.put(`${API_BASE_URL}/api/blogs/${blogId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local state immediately
      setBlogs(prevBlogs => prevBlogs.map(blog =>
        blog._id === blogId ? { ...blog, likes: updatedBlog.likes } : blog
      ));

    } catch (err) {
      console.error("Failed to like blog", err);
      alert("Failed to like. Please try again.");
    }
  };

  const filteredBlogs = blogs
    .filter((blog) =>
      categoryFilter ? blog.category === categoryFilter : true,
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date); // Use createdAt if available
      const dateB = new Date(b.createdAt || b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const categories = [...new Set(blogs.map((b) => b.category || b.tags?.[0]).filter(Boolean))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Travel Stories
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <div className="relative min-w-[100px]">
          <select
            className="w-full px-6 py-3 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all bg-white text-slate-600 appearance-none cursor-pointer text-center sm:text-left"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="relative min-w-[100px]">
          <select
            className="w-full px-6 py-3 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all bg-white text-slate-600 appearance-none cursor-pointer text-center sm:text-left"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => {
          const isLiked = user && blog.likes && blog.likes.includes(user._id);
          return (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col h-full hover:-translate-y-1 transition duration-300"
            >
              <div className="w-full h-56 flex-shrink-0 relative overflow-hidden rounded-xl mb-6 group">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
                <button
                  onClick={(e) => handleLike(e, blog._id)}
                  className={`absolute top-4 right-4 p-2 backdrop-blur-md rounded-full transition-all opacity-0 group-hover:opacity-100 ${isLiked
                    ? 'bg-red-500 text-white opacity-100' // Always visible if liked? Or still only on hover? Let's keep hover effect but make it red.
                    : 'bg-white/20 text-white hover:bg-white hover:text-red-500'
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold rounded-full uppercase tracking-wider">
                    {blog.category || blog.tags?.[0] || 'Travel'}
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />{" "}
                    {new Date(blog.createdAt || blog.date).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">
                  {blog.title}
                </h3>
                <p className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wide">
                  By {blog.user?.name || "Anonymous"}
                </p>
                <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {blog.content}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="inline-flex items-center px-6 py-2.5 border-2 border-slate-200 hover:border-accent text-slate-600 hover:text-white hover:bg-accent rounded-full font-semibold transition-all duration-300 btn-shine w-full justify-center"
                  >
                    Read Full Story
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Blogs;
