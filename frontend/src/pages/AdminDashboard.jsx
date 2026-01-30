import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';

const AdminDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Note: For now, we are fetching ALL blogs and filtering on client side if endpoint doesn't support "pending" filter,
    // OR we assume the endpoint returns approved-only for public but we need a special endpoint for admin.
    // Actually, I modified `getBlogs` to only return Approved.
    // I need to fetch ALL or specifically PENDING. 
    // For simplicity, I will assume I can't easily get them from the public endpoint.
    // I'll make a direct DB call? No, that's backend.
    // I'll update the backend to allow an admin query param or similar?
    // Or, I'll rely on the fact that I didn't change `getBlogs` to EXCLUDE pending if I am admin?
    // Wait, I changed `getBlogs` to `find({ status: 'approved' })`.
    // So I can't see pending blogs with the standard GET /api/blogs.
    // I should skip fixing the backend endpoint for a moment and pretend I can get them, 
    // OR I should use a new endpoint. 
    // Ideally, I'd fix the backend. But since I can't jump back and forth too effectively without cost,
    // I'll assume I can add a query `?status=pending` to the backend getBlogs logic efficiently later.
    // WAIT: I can just edit the backend now. It's fast.

    // Actually, I'll implement the UI assuming a `?all=true` or similar, and I'll go fix the backend in the next turn or this one if parallel.
    // Let's assume I fix the backend to: if query `isAdmin=true` (and token valid), return all.

    const fetchPendingBlogs = async () => {
        // This logic relies on a soon-to-be-updated backend or a new endpoint.
        // I will add a new endpoint `/api/blogs/pending` explicitly for this.
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            // Temporary: fetching all and filtering client side won't work if server filters.
            // I will use a dedicated endpoint route I'll create: /api/blogs/all-pending
            // I'll add this to backend shortly.
            const res = await fetch(`${API_BASE_URL}/api/blogs/pending/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error("Failed to fetch blogs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingBlogs();
    }, []);

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE_URL}/api/blogs/${id}/approve`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                alert("Blog Approved!");
                fetchPendingBlogs(); // Refresh
            }
        } catch (error) {
            console.error("Error approving", error);
        }
    };

    return (
        <div className="min-h-screen pt-20 px-4 bg-black text-white">
            <h1 className="text-4xl font-bold text-center mb-10 text-teal-400">Admin Dashboard</h1>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Pending Blogs</h2>
                {loading ? <p>Loading...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.length === 0 ? <p className="text-gray-400">No pending blogs.</p> : blogs.map(blog => (
                            <div key={blog._id} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
                                <img src={blog.image || 'https://via.placeholder.com/300'} alt={blog.title} className="w-full h-40 object-cover rounded mb-4" />
                                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                                <p className="text-sm text-gray-400 mb-4">By: {blog.user?.name || 'Unknown'}</p>
                                <p className="text-gray-300 mb-4 line-clamp-3">{blog.content}</p>
                                <button
                                    onClick={() => handleApprove(blog._id)}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                                >
                                    Approve Publication
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
