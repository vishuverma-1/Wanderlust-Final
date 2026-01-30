import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate sending
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center text-primary mb-4">Contact Us</h1>
            <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
                Have questions or need assistance? Our 24/7 support teams are here to help you plan your perfect trip.
            </p>

            <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden p-8 border border-slate-100">

                {/* Contact Info */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Phone</h3>
                            <p className="text-slate-600">+91 98765 43210</p>
                            <p className="text-xs text-slate-400">Available 24/7</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <p className="text-slate-600">support@wanderlust.in</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Office</h3>
                            <p className="text-slate-600">42, Connaught Place,</p>
                            <p className="text-slate-600">New Delhi, India 110001</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-slate-50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-700">Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-accent/50 focus:outline-none"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-700">Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-accent/50 focus:outline-none"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-700">Message</label>
                            <textarea
                                required
                                rows="4"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-accent/50 focus:outline-none"
                                placeholder="How can we help?"
                            />
                        </div>
                        <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                            {submitted ? 'Message Sent!' : (
                                <>Send Message <Send className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
