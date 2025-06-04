import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../../component/user/AnimationBackground';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from '../../redux/slices/settingSlice';
import LoadingAnimation from '../../component/user/LoadingAnimation';
import { toast } from 'react-toastify';
import { createContactUs, clearCreateContactUs } from '../../redux/slices/contactUsSlice';


const ContactPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { settings, loadingSetting, errorSetting } = useSelector((state) => state.settings);
    const { isCreateContactUs,
        loadingCreateContactUs,
        errorCreateContactUs
    } = useSelector((state) => state.contactUs);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        dispatch(getSettings());
    }, [dispatch]);

    useEffect(() => {
        if (isCreateContactUs) {
            toast.success('Message sent successfully');
            setFormData({
                name: '',
                email: '',
                phone_number: '',
                subject: '',
                message: ''
            });
            dispatch(clearCreateContactUs());
        } else if (errorCreateContactUs) {
            toast.error(errorCreateContactUs);
            dispatch(clearCreateContactUs());
        }
    }, [isCreateContactUs, errorCreateContactUs, dispatch]);

    if (loadingSetting) {
        return <LoadingAnimation />
    }

    if (errorSetting) {
        return (
            <div className="min-h-screen bg-black/90 flex items-center justify-center">
                <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
                    <p className="text-white/80 mb-6">{errorSetting}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (loadingCreateContactUs) {
            return;
        }

        if (formData.name === '' || formData.email === '' || formData.message === ''
            || formData.subject === '' || formData.phone_number === ''
        ) {
            toast.error('Please fill all the fields');
            return;
        }


        if (!formData.email.includes('@')) {
            toast.error('Invalid email');
            return;
        }

        dispatch(createContactUs({data: formData}));
    }

    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />

            {/* Main Content */}
            <div className="relative z-10 pt-20 px-4 sm:px-8 md:px-16 mb-20">
                {/* Header with Back Button */}
                <div className="max-w-6xl mx-auto flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white hover:text-purple-400 transition-colors group relative"
                    >
                        <ArrowLeft size={32} />
                        <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Go Back
                        </span>
                    </button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                            style={{ fontFamily: "FootbarPro, sans-serif", color: "var(--color-purple)" }}
                        >
                            Contact Us
                        </h1>
                        <p className="text-white/80 text-lg"
                            style={{ fontFamily: "CelabRegular, sans-serif" }}
                        >
                            Get in touch with us for any inquiries
                        </p>
                    </motion.div>
                    <div className="w-8"></div> {/* Spacer for balance */}
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl"
                    >
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <div>
                                <label className="block text-white mb-2"
                                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                                >
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-white mb-2"
                                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                                >
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="block text-white mb-2"
                                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone_number}
                                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Subject Field */}
                            <div>
                                <label className="block text-white mb-2"
                                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                                >
                                    Subject
                                </label>
                                <input
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-white mb-2"
                                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                                >
                                    Message *
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 px-6 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                                style={{ fontFamily: "CelabRegular, sans-serif" }}
                            >
                                {loadingCreateContactUs ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8"
                            style={{ fontFamily: "FootbarPro, sans-serif" }}
                        >
                            Contact Information
                        </h2>

                        {/* Contact Methods */}
                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                                    <FaEnvelope className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold"
                                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                                    >
                                        Email
                                    </h3>
                                    <a href={`mailto:${settings.email}`}
                                        className="text-white/80 hover:text-purple-400 transition-colors"
                                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                                    >
                                        {settings.email}
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                                    <FaPhone className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold"
                                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                                    >
                                        Phone
                                    </h3>
                                    <a href={`tel:${settings.phone_number}`}
                                        className="text-white/80 hover:text-purple-400 transition-colors"
                                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                                    >
                                        {settings.phone_number}
                                    </a>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                                    <FaWhatsapp className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold"
                                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                                    >
                                        WhatsApp
                                    </h3>
                                    <a href={settings.whatsapp_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/80 hover:text-purple-400 transition-colors"
                                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                                    >
                                        Chat with us
                                    </a>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;