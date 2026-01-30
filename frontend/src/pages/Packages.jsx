import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLocation, setFilterLocation] = useState('');
    const [sortPrice, setSortPrice] = useState(''); // 'asc' or 'desc'

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/packages`);
                if (data.length > 0) {
                    setPackages(data);
                } else {
                    throw new Error("No packages in DB");
                }
            } catch (err) {
                console.log("Using mock data for Packages", err);
                // Fallback Mock Data if server fails
                setPackages([
                    { _id: '1', title: 'Bali Bliss', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', price: 95999, duration: '5 Days', location: 'Indonesia', description: 'Tropical paradise with serene beaches and lush green rice terraces.' },
                    { _id: '2', title: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7', price: 199999, duration: '7 Days', location: 'Switzerland', description: 'Experience the majestic snowy peaks and charming alpine villages.' },
                    { _id: '3', title: 'Kyoto Ancient', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e', price: 145999, duration: '6 Days', location: 'Japan', description: 'Dive deep into history, culture, and ancient temples of Kyoto.' },
                    { _id: '4', title: 'Kerala Backwaters', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', price: 29999, duration: '4 Days', location: 'India', description: 'Relax on a houseboat in the serene backwaters of Alleppey.' },
                    { _id: '5', title: 'Rajasthan Royals', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80', price: 39999, duration: '6 Days', location: 'India', description: 'Explore the majestic forts and palaces of Jaipur and Udaipur.' },
                    { _id: '6', title: 'Ladakh Adventure', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80', price: 44999, duration: '7 Days', location: 'India', description: 'Thrilling bike trips and breathtaking landscapes of the Himalayas.' },
                    { _id: '7', title: 'Goa Vibes', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', price: 24999, duration: '4 Days', location: 'India', description: 'Sun, sand, and sea. Enjoy the ultimate beach vacation.' },
                    { _id: '8', title: 'Varanasi Spiritual', image: 'https://images.unsplash.com/photo-1561361513-35e6ba71bc62?auto=format&fit=crop&w=800&q=80', price: 19999, duration: '3 Days', location: 'India', description: 'Experience the spiritual capital of India on the banks of Ganga.' },
                    { _id: '9', title: 'Andaman Escape', image: 'https://images.unsplash.com/photo-1589394815804-964ed2c9d2f3?auto=format&fit=crop&w=800&q=80', price: 55999, duration: '6 Days', location: 'India', description: 'Pristine beaches and clear waters, perfect for scuba diving.' },
                    { _id: '10', title: 'Dubai Desert Safari', image: 'https://images.unsplash.com/photo-1512453979798-5ea904ac66de', price: 65999, duration: '5 Days', location: 'UAE', description: 'Experience the luxury of Dubai and the thrill of desert safari.' },
                    { _id: '11', title: 'Rome & Vatican', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', price: 125999, duration: '7 Days', location: 'Italy', description: 'Walk through history in the Eternal City.' },
                    { _id: '12', title: 'New York City', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', price: 189999, duration: '6 Days', location: 'USA', description: 'The city that never sleeps. Experience Times Square and Central Park.' },
                    { _id: '13', title: 'Vietnam Explorer', image: 'https://images.unsplash.com/photo-1528127269322-539801943592', price: 75999, duration: '8 Days', location: 'Vietnam', description: 'From Ha Long Bay to the bustling streets of Hanoi.' },
                    { _id: '14', title: 'Iceland Aurora', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae', price: 210999, duration: '6 Days', location: 'Iceland', description: 'Chase the Northern Lights and relax in the Blue Lagoon.' },
                    { _id: '15', title: 'Greek Islands', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077', price: 145999, duration: '7 Days', location: 'Greece', description: 'White washed houses, blue domes, and crystal clear sea.' }
                ]);
            }
            setLoading(false);
        };
        fetchPackages();
    }, []);

    const filteredPackages = packages
        .filter(pkg => pkg.location.toLowerCase().includes(filterLocation.toLowerCase()))
        .sort((a, b) => {
            if (sortPrice === 'low') return a.price - b.price;
            if (sortPrice === 'high') return b.price - a.price;
            return 0;
        });

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-primary">Available Packages</h2>

            {/* Filter and Sort Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Filter by Location..."
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-slate-600 placeholder:text-slate-400"
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                    />
                </div>
                <div className="relative min-w-[200px]">
                    <select
                        className="w-full pl-4 pr-10 py-3 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all bg-white text-slate-600 appearance-none cursor-pointer"
                        value={sortPrice}
                        onChange={(e) => setSortPrice(e.target.value)}
                    >
                        <option value="">Sort by Price</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {filteredPackages.map(pkg => (
                    <div key={pkg._id} className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden hover:shadow-xl transition duration-300 border border-slate-100 group">
                        <div className="relative overflow-hidden h-48">
                            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">{pkg.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md"><Clock className="h-3 w-3" /> {pkg.duration}</span>
                                <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md"><MapPin className="h-3 w-3" /> {pkg.location}</span>
                            </div>
                            <p className="text-slate-600 mb-6 line-clamp-2 text-sm leading-relaxed">{pkg.description}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                <span className="text-2xl font-bold text-primary">₹{pkg.price.toLocaleString('en-IN')}</span>
                                <Link
                                    to={`/packages/${pkg._id}`}
                                    className="px-6 py-2.5 bg-gradient-to-r from-primary to-slate-800 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Packages;
