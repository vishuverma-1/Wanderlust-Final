import { Link } from 'react-router-dom';
import { Plane, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                            <Plane className="h-8 w-8 text-blue-500" />
                            Wanderlust
                        </Link>
                        <p className="text-sm">
                            Your ultimate companion for unforgettable journeys. Explore the world with confidence and style.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-blue-500 transition">Home</Link></li>
                            <li><Link to="/packages" className="hover:text-blue-500 transition">Packages</Link></li>
                            <li><Link to="/blogs" className="hover:text-blue-500 transition">Blogs</Link></li>
                            <li><Link to="/login" className="hover:text-blue-500 transition">Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>support@wanderlust.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                                <span>42, Connaught Place, New Delhi, India</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-blue-500 transition"><Facebook className="h-6 w-6" /></a>
                            <a href="#" className="hover:text-blue-500 transition"><Twitter className="h-6 w-6" /></a>
                            <a href="#" className="hover:text-blue-500 transition"><Instagram className="h-6 w-6" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
