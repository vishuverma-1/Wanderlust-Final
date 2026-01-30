import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Eye, Heart, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import PaymentModal from '../components/PaymentModal';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/blogs/${id}`);
                setBlog(data);
                setLikes(data.likes?.length || 0);

                // check if current user liked it - would need decoding token or separate endpoint
            } catch (err) {
                console.error("Failed to fetch blog, using mock", err);
                // Fallback Mock Data for demo IDs (1, 2, 3...)
                const mockBlogs = {
                    '1': { _id: '1', title: 'My Trip to Paris', content: 'Paris is magical...', user: { name: 'Alice', role: 'user' }, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', likes: [], views: 120, tags: ['City'] },
                    '2': { _id: '2', title: 'Hidden Gems of Japan', content: 'Kyoto secret temples...', user: { name: 'Bob', role: 'guide', guideProfile: { city: 'Kyoto', pricePerDay: 5000 } }, image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd', likes: [], views: 85, tags: ['Adventure'] },
                    '3': { _id: '3', title: 'Backpacking Himachal', content: 'mountains calling...', user: { name: 'Charlie', role: 'user' }, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23', likes: [], views: 200, tags: ['Nature'] },
                    '4': { _id: '4', title: 'Street Food Delhi', content: 'Spicy and sweet...', user: { name: 'Divya', role: 'user' }, image: 'https://images.unsplash.com/photo-1587574293340-000000000000', likes: [], views: 300, tags: ['Food'] },
                    '5': { _id: '5', title: 'Safari in Kenya', content: 'The Masai Mara is incredible. We saw lions, elephants, and leopards...', user: { name: 'Elena', role: 'user' }, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801', likes: [], views: 2100, tags: ['Wildlife'] },
                    '6': { _id: '6', title: 'Road Trip Route 66', content: 'Classic diners and neon signs. It feels like a movie set.', user: { name: 'Frank', role: 'user' }, image: 'https://images.unsplash.com/photo-1525357948386-07faee2e8f00', likes: [], views: 1800, tags: ['Road Trip'] },
                    '7': { _id: '7', title: 'Diving in Maldives', content: 'The water clarity is unreal. Best diving of my life.', user: { name: 'Grace', role: 'user' }, image: 'https://images.unsplash.com/photo-1516685304081-de7947d96f54', likes: [], views: 3200, tags: ['Beach'] },
                    '8': { _id: '8', title: 'Hiking Patagonia', content: 'Windy, wild, and wonderful. The Fitz Roy trek is tough but worth it.', user: { name: 'Henry', role: 'guide', guideProfile: { city: 'El Chalten', pricePerDay: 4000 } }, image: 'https://images.unsplash.com/photo-1518182170546-0766aa6f6a56', likes: [], views: 900, tags: ['Hiking'] },
                    '9': { _id: '9', title: 'Cultural Kyoto', content: 'Fushimi Inari again, but this time at night. Spooky and spiritual.', user: { name: 'Iris', role: 'user' }, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e', likes: [], views: 1100, tags: ['Culture'] },
                    '10': { _id: '10', title: 'Wine Tasting in Tuscany', content: 'Chianti, pasta, and sunsets. La dolce vita.', user: { name: 'Jack', role: 'guide', guideProfile: { city: 'Florence', pricePerDay: 6000 } }, image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea', likes: [], views: 2500, tags: ['Wine'] }
                };
                if (mockBlogs[id]) {
                    setBlog(mockBlogs[id]);
                }
            }
        };
        fetchBlogDetails();
    }, [id]);

    const handleLike = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to like!");
            return;
        }

        try {
            const { data } = await axios.put(`${API_BASE_URL}/api/blogs/${id}/like`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLikes(data.likes.length);
            setIsLiked(!isLiked); // Optimistic UI
        } catch (err) {
            console.error(err);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    const handleSave = () => {
        alert("Saved to your collection! (Feature simulated)");
    };

    const handleHireGuide = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        setShowPayment(true);
    };

    const onPaymentSuccess = () => {
        setShowPayment(false);
        alert(`Successfully hired ${blog.user?.name}! They will contact you shortly.`);
    };

    if (!blog) return <div className="text-center py-20 text-white">Loading...</div>;

    const isGuide = blog.user?.role === 'guide';
    const guidePrice = blog.user?.guideProfile?.pricePerDay || 2000;

    return (
        <div className="min-h-screen bg-black text-gray-100 pb-20">
            <div className="max-w-5xl mx-auto px-4 pt-10">
                <Link to="/blogs" className="inline-flex items-center text-gray-400 hover:text-teal-400 mb-6 transition">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
                </Link>

                <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
                    <div className="h-96 relative group">
                        <img src={blog.image || 'https://via.placeholder.com/800'} alt={blog.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent flex items-end">
                            <div className="p-8 w-full">
                                <span className="bg-teal-600/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block shadow-lg">
                                    {blog.tags?.[0] || 'Travel'}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">{blog.title}</h1>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200 font-medium">
                                    <span className="flex items-center gap-2"><User className="w-4 h-4 text-teal-400" /> {blog.user?.name || 'Unknown'}</span>
                                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-teal-400" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm"><Eye className="w-4 h-4 text-teal-400" /> {blog.views || 0} Views</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Guide Hiring Section */}
                        {isGuide && (
                            <div className="mb-10 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                                <div>
                                    <h3 className="text-xl font-bold text-teal-400 mb-2">Hire {blog.user.name} as your Local Guide</h3>
                                    <p className="text-gray-400 text-sm">Expert in {blog.user.guideProfile?.city || 'local tours'}. Verified Local Guide.</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-white mb-2">₹{guidePrice}<span className="text-sm font-normal text-gray-400">/day</span></p>
                                    <button
                                        onClick={handleHireGuide}
                                        className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition shadow-lg shadow-teal-500/20"
                                    >
                                        Hire Now
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="prose prose-lg prose-invert max-w-none whitespace-pre-line leading-relaxed text-gray-300">
                            {blog.content}
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-4">
                                <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition font-medium border border-gray-700 hover:border-teal-500/50">
                                    <Share2 className="w-4 h-4" /> Share
                                </button>
                                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition font-medium border border-gray-700 hover:border-teal-500/50">
                                    <Bookmark className="w-4 h-4" /> Save
                                </button>
                            </div>
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition transform active:scale-95 shadow-lg ${isLiked
                                    ? 'bg-red-500/10 text-red-500 border border-red-500/50'
                                    : 'bg-gray-800 text-gray-300 hover:text-red-400 hover:bg-gray-700 border border-gray-700'}`}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                {likes} Likes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={guidePrice}
                description={`Hiring guide ${blog.user?.name}`}
                onSuccess={onPaymentSuccess}
            />
        </div>
    );
};

export default BlogDetails;
