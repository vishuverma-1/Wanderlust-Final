import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                            <Plane className="h-8 w-8 text-accent" />
                            Wanderlust
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/packages" className="text-secondary hover:text-primary transition font-medium">Packages</Link>
                        <Link to="/blogs" className="text-secondary hover:text-primary transition font-medium">Blogs</Link>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-slate-700">{user.name}</span>
                                <button onClick={logout} className="text-red-500 hover:text-red-600">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition shadow-sm hover:shadow-md">
                                <User className="h-4 w-4" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
