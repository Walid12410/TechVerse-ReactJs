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
import ReCAPTCHA from 'react-google-recaptcha';

const ContactPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { settings, loadingSetting, errorSetting } = useSelector((state) => state.settings);
    const {
        isCreateContactUs,
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

    const [captchaValue, setCaptchaValue] = useState(null);

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
            setCaptchaValue(null);
            dispatch(clearCreateContactUs());
        } else if (errorCreateContactUs) {
            toast.error(errorCreateContactUs);
            dispatch(clearCreateContactUs());
        }
    }, [isCreateContactUs, errorCreateContactUs, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (loadingCreateContactUs) return;

        const { name, email, phone_number, subject, message } = formData;

        if (!name || !email || !phone_number || !subject || !message) {
            toast.error('Please fill all the fields');
            return;
        }

        if (!email.includes('@')) {
            toast.error('Invalid email');
            return;
        }

        if (!captchaValue) {
            toast.error('Please verify that you are not a robot');
            return;
        }

        const data = {
            ...formData,
            recaptchaToken: captchaValue
        };


        dispatch(createContactUs({ data }));
    };

    if (loadingSetting) return <LoadingAnimation />;

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

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-animation-background)' }}>
            <div className="relative z-10 pt-20 px-4 sm:px-8 md:px-16 mb-20">
                {/* Header */}
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
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
                            style={{ fontFamily: "FootbarPro, sans-serif",  }}
                        >
                            Contact Us
                        </h1>
                        <p className="text-white text-lg"
                            style={{ fontFamily: "CelabRegular, sans-serif" }}
                        >
                            Get in touch with us for any inquiries
                        </p>
                    </motion.div>
                    <div className="w-8" />
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
                            {["name", "email", "phone_number", "subject", "message"].map((field) => (
                                <div key={field}>
                                    <label className="block text-white mb-2" style={{ fontFamily: "CelabRegular, sans-serif" }}>
                                        {field.replace("_", " ").replace(/^\w/, c => c.toUpperCase())} {field !== "subject" ? "*" : ""}
                                    </label>
                                    {field === "message" ? (
                                        <textarea
                                            rows="4"
                                            required
                                            value={formData[field]}
                                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-500 focus:outline-none resize-none"
                                        />
                                    ) : (
                                        <input
                                            type={field === "email" ? "email" : field === "phone_number" ? "tel" : "text"}
                                            required={field !== "subject"}
                                            value={formData[field]}
                                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-500 focus:outline-none"
                                        />
                                    )}
                                </div>
                            ))}

                            {/* reCAPTCHA */}
                            <div>
                                <ReCAPTCHA
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    onChange={value => setCaptchaValue(value)}
                                />
                            </div>

                            {/* reCAPTCHA Terms Notice */}
                            <p className="text-xs text-white/50 mt-2">
                                This site is protected by reCAPTCHA and the Google{' '}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-purple-400"
                                >
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a
                                    href="https://policies.google.com/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-purple-400"
                                >
                                    Terms of Service
                                </a>{' '}
                                apply.
                            </p>

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
                        <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: "FootbarPro, sans-serif" }}>
                            Contact Information
                        </h2>

                        {[{
                            icon: FaEnvelope,
                            title: "Email",
                            value: settings?.email,
                            href: `mailto:${settings?.email}`
                        }, {
                            icon: FaPhone,
                            title: "Phone",
                            value: settings?.phone_number,
                            href: `tel:${settings?.phone_number}`
                        }, {
                            icon: FaWhatsapp,
                            title: "WhatsApp",
                            value: settings?.whatsapp_url,
                            href: `https://wa.me/${settings?.whatsapp_url}`
                        }].map(({ icon: Icon, title, value, href }, i) => (
                            <div key={i} className="flex items-center space-x-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                                    <Icon className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold" style={{ fontFamily: "CelabRegular, sans-serif" }}>
                                        {title}
                                    </h3>
                                    <a href={href}
                                        className="text-white/80 hover:text-purple-400 transition-colors"
                                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                                    >
                                        {value}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
