import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { useAuth } from '../context/AuthContext';
import { Calendar, Check } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [pkg, setPkg] = useState(null);
    const [date, setDate] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/packages/${id}`);
                setPkg(data);
            } catch (err) {
                console.log("Using Mock Data for Package Details");
                if (id === '1') setPkg({ _id: '1', title: 'Bali Bliss', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', price: 95999, duration: '5 Days', location: 'Indonesia', description: 'Experience the ultimate tropical getaway.', activities: ['Beach Walk', 'Temple Visit', 'Snorkeling'] });
                else if (id === '2') setPkg({ _id: '2', title: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7', price: 199999, duration: '7 Days', location: 'Switzerland', description: 'Snowy peaks.', activities: ['Skiing', 'Hiking', 'Fondue Dinner'] });
                else if (id === '3') setPkg({ _id: '3', title: 'Kyoto Ancient', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e', price: 145999, duration: '6 Days', location: 'Japan', description: 'History and culture.', activities: ['Tea Ceremony', 'Shrine Visit', 'City Walk'] });
                else if (id === '4') setPkg({ _id: '4', title: 'Kerala Backwaters', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944', price: 29999, duration: '4 Days', location: 'India', description: 'Relax on a houseboat.', activities: ['Houseboat Stay', 'Ayurvedic Massage', 'Village Tour'] });
                else if (id === '5') setPkg({ _id: '5', title: 'Rajasthan Royals', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41', price: 39999, duration: '6 Days', location: 'India', description: 'Forts and palaces.', activities: ['Fort Tour', 'Camel Ride', 'Folk Dance'] });
                else if (id === '6') setPkg({ _id: '6', title: 'Ladakh Adventure', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2', price: 44999, duration: '7 Days', location: 'India', description: 'Mountains and lakes.', activities: ['Bike Ride', 'Camping', 'Monastery Visit'] });
                else if (id === '7') setPkg({ _id: '7', title: 'Goa Vibes', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2', price: 24999, duration: '4 Days', location: 'India', description: 'Party and beaches.', activities: ['Beach Party', 'Water Sports', 'Church Visit'] });
                else if (id === '8') setPkg({ _id: '8', title: 'Varanasi Spiritual', image: 'https://images.unsplash.com/photo-1561361513-35e6ba71bc62', price: 19999, duration: '3 Days', location: 'India', description: 'Spiritual journey.', activities: ['Ganga Aarti', 'Boat Ride', 'Temple Tour'] });
                else if (id === '9') setPkg({ _id: '9', title: 'Andaman Escape', image: 'https://images.unsplash.com/photo-1589394815804-964ed2c9d2f3', price: 55999, duration: '6 Days', location: 'India', description: 'Island life.', activities: ['Scuba Diving', 'Beach Hopping', 'Cellular Jail'] });
                else if (id === '10') setPkg({ _id: '10', title: 'Dubai Desert Safari', image: 'https://images.unsplash.com/photo-1512453979798-5ea904ac66de', price: 65999, duration: '5 Days', location: 'UAE', description: 'Experience the luxury of Dubai.', activities: ['Desert Safari', 'Burj Khalifa', 'Shopping'] });
                else if (id === '11') setPkg({ _id: '11', title: 'Rome & Vatican', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', price: 125999, duration: '7 Days', location: 'Italy', description: 'Walk through history.', activities: ['Colosseum Tour', 'Vatican Museums', 'Pizza Making'] });
                else if (id === '12') setPkg({ _id: '12', title: 'New York City', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', price: 189999, duration: '6 Days', location: 'USA', description: 'The city that never sleeps.', activities: ['Statue of Liberty', 'Broadway Show', 'Central Park'] });
                else if (id === '13') setPkg({ _id: '13', title: 'Vietnam Explorer', image: 'https://images.unsplash.com/photo-1528127269322-539801943592', price: 75999, duration: '8 Days', location: 'Vietnam', description: 'Culture and nature.', activities: ['Ha Long Bay Cruise', 'Cu Chi Tunnels', 'Street Food Tour'] });
                else if (id === '14') setPkg({ _id: '14', title: 'Iceland Aurora', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae', price: 210999, duration: '6 Days', location: 'Iceland', description: 'Land of fire and ice.', activities: ['Northern Lights Hunt', 'Blue Lagoon', 'Glacier Hike'] });
                else if (id === '15') setPkg({ _id: '15', title: 'Greek Islands', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077', price: 145999, duration: '7 Days', location: 'Greece', description: 'Beautiful sunsets.', activities: ['Santorini Sunset', 'Acropolis Visit', 'Island Hopping'] });
            }
        };
        fetchPackage();
    }, [id]);

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        setShowPayment(true);
    };

    const onPaymentSuccess = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/api/bookings`, { packageId: id, date, travelers },
                { headers: { Authorization: `Bearer ${token}` } });
            setShowPayment(false);
            alert('Payment Successful! Booking Confirmed.');
            navigate('/');
        } catch (err) {
            alert('Booking Failed: ' + (err.response?.data?.message || 'Server error'));
        }
    };

    if (!pkg) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <img src={pkg.image} alt={pkg.title} className="w-full h-96 object-cover rounded-xl shadow-lg" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-4 text-primary">{pkg.title}</h1>
                    <p className="text-2xl text-accent font-semibold mb-6">₹{pkg.price.toLocaleString('en-IN')} <span className="text-sm text-slate-500 font-normal">/ person</span></p>
                    <p className="text-slate-600 mb-6 leading-relaxed">{pkg.description}</p>

                    <div className="mb-8">
                        <h3 className="font-semibold mb-3 text-lg">Included Activities</h3>
                        <ul className="space-y-2">
                            {pkg.activities?.map((act, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-slate-600">
                                    <Check className="h-5 w-5 text-green-500" /> {act}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="font-semibold mb-4 text-lg">Book This Trip</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 rounded border" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Travelers</label>
                            <input type="number" min="1" required value={travelers} onChange={e => setTravelers(e.target.value)} className="w-full p-2 rounded border" />
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition">
                            Proceed to Payment
                        </button>
                    </form>
                </div>
            </div>

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={pkg.price * travelers}
                description={`Booking ${pkg.title} for ${travelers} people`}
                onSuccess={onPaymentSuccess}
            />
        </div>
    );
};
export default PackageDetails;
