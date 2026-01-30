import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

const UploadBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        tags: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Simple check if logged in (for now, assume token means logged in)
        if (!token) {
            alert("You must be logged in to upload a blog.");
            navigate('/login');
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(tag => tag.trim())
                }),
            });

            if (res.ok) {
                setMessage('Blog uploaded successfully! Waiting for admin approval.');
                setTimeout(() => navigate('/blogs'), 2000);
            } else {
                setMessage('Failed to upload blog.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Error uploading blog.');
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-black text-white">
            <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden glassmorphism">
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-bold text-center text-teal-400 mb-8">Share Your Adventure</h2>
                    {message && (
                        <div className={`p-4 mb-4 rounded ${message.includes('success') ? 'bg-green-600' : 'bg-red-600'}`}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Blog Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                required
                                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-teal-500 focus:border-teal-500"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-300">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                id="image"
                                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-teal-500 focus:border-teal-500"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/beautiful-view.jpg"
                            />
                        </div>
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-300">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                id="tags"
                                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-teal-500 focus:border-teal-500"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="travel, nature, mountains"
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-300">Story Content</label>
                            <textarea
                                name="content"
                                id="content"
                                rows="6"
                                required
                                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm text-white focus:ring-teal-500 focus:border-teal-500"
                                value={formData.content}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform hover:scale-105 transition-all duration-200"
                            >
                                Submit for Approval
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadBlog;
