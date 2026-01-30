import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, ArrowRight, Star } from 'lucide-react';

const Home = () => {
    const popularPackages = [
        {
            id: 1,
            title: "Bali Bliss",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
            price: "₹95,999",
            duration: "7 Days",
            rating: 4.8
        },
        {
            id: 8,
            title: "Varanasi Spiritual",
            image: "https://images.unsplash.com/photo-1561361513-35e6ba71bc62?auto=format&fit=crop&w=800&q=80",
            price: "₹19,999",
            duration: "3 Days",
            rating: 4.9
        },
        {
            id: 6,
            title: "Ladakh Adventure",
            image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
            price: "₹44,999",
            duration: "7 Days",
            rating: 4.7
        }
    ];

    return (
        <div className="relative font-sans text-slate-800">
            {/* Hero Section */}
            <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
                />

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
                            Wanderlust
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto drop-shadow-md">
                            Discover the world's most breathtaking destinations. Your journey begins here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/packages" className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                                Start Exploring <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/blogs" className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full font-semibold transition-all border border-white/30">
                                Read Blogs
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Features Info Bar */}
            <div className="relative z-20 -mt-16 max-w-6xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-3 gap-8">
                    <Link to="/packages" className="text-center p-4 hover:bg-slate-50 rounded-xl transition cursor-pointer group block">
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition">
                            <MapPin className="text-accent w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Curated Trips</h3>
                        <p className="text-slate-500 text-sm">Handpicked itineraries for the best experiences.</p>
                    </Link>
                    <Link to="/blogs" className="text-center p-4 hover:bg-slate-50 rounded-xl transition cursor-pointer group block">
                        <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-100 transition">
                            <Users className="text-teal-500 w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Expert Local Guides</h3>
                        <p className="text-slate-500 text-sm">Connect with locals who know the hidden gems.</p>
                    </Link>
                    <Link to="/contact" className="text-center p-4 hover:bg-slate-50 rounded-xl transition cursor-pointer group block">
                        <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition">
                            <Clock className="text-purple-500 w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                        <p className="text-slate-500 text-sm">We're here to help anytime, anywhere.</p>
                    </Link>
                </div>
            </div>

            {/* Popular Packages Preview */}
            <div className="py-20 bg-bg-soft">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-2">Popular Destinations</h2>
                            <p className="text-slate-500">Trending places our travelers love.</p>
                        </div>
                        <Link to="/packages" className="text-accent font-semibold hover:text-accent-hover hidden sm:flex items-center gap-1">
                            View all packages <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {popularPackages.map((pkg) => (
                            <Link to={`/packages/${pkg.id}`} key={pkg.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition z-10" />
                                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary z-20">
                                        {pkg.price}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-primary group-hover:text-accent transition">{pkg.title}</h3>
                                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span>{pkg.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 text-sm flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> {pkg.duration}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/packages" className="text-accent font-semibold hover:text-accent-hover flex items-center justify-center gap-1">
                            View all packages <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
