import { useState, useEffect } from 'react';
import {
    FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaPhone, FaSave, FaTiktok
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { clearUpdateSetting, getSettings, updateSetting } from '../../redux/slices/settingSlice';
import AdminLayout from '../../component/layout/AdminLayout';
import { toast } from 'react-toastify';

const fieldConfig = [
    { name: "email", icon: <FaEnvelope />, label: "Email Address", type: "email", placeholder: "Enter email address" },
    { name: "facebook_url", icon: <FaFacebook />, label: "Facebook URL", type: "url", placeholder: "Enter Facebook URL" },
    { name: "instagram_url", icon: <FaInstagram />, label: "Instagram URL", type: "url", placeholder: "Enter Instagram URL" },
    { name: "linkedin_url", icon: <FaLinkedin />, label: "LinkedIn URL", type: "url", placeholder: "Enter LinkedIn URL" },
    { name: "tiktok_url", icon: <FaTiktok />, label: "TikTok URL", type: "url", placeholder: "Enter TikTok URL" },
    { name: "whatsapp_url", icon: <FaWhatsapp />, label: "WhatsApp URL", type: "url", placeholder: "Enter WhatsApp URL" },
    { name: "phone_number", icon: <FaPhone />, label: "Phone Number", type: "tel", placeholder: "Enter phone number" },
];

const SettingDashboard = () => {
    const dispatch = useDispatch();
    const { settings,
        loadingSetting,
        errorSetting,
        loadingSettingUpdate,
        errorUpdateSetting,
        isSettingUpdated
    } = useSelector(state => state.settings);

    const [formValues, setFormValues] = useState(null);
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        dispatch(getSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settings) {
            const normalizedData = Object.fromEntries(
                Object.entries(settings).map(([key, value]) => [key, value ?? ''])
            );
            setFormValues(normalizedData);
        }
    }, [settings]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(loadingSettingUpdate) return;

        dispatch(updateSetting({data: formValues}));
    };

    useEffect(()=>{
        if(isSettingUpdated){
            toast.success("Settings saved successfully!");
            dispatch(getSettings());
            dispatch(clearUpdateSetting());
        }else if(errorUpdateSetting){
            toast.error("Something went wrong. Try again later");
        }
    },[isSettingUpdated,errorUpdateSetting]);

    return (
        <AdminLayout>
            <div className="px-6 py-4">
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-white">Manage your contact information and social media links</p>
            </div>

            <div className="p-6">
                <div className="rounded-lg shadow-2xl p-6" style={{ backgroundColor: "var(--color-navy-dark)" }}>
                    {loadingSetting && (
                        <div className="flex justify-center items-center py-8">
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {errorSetting && (
                        <div className="mb-4 p-4 bg-red-600 text-white rounded">
                            {errorSetting}
                        </div>
                    )}

                    {!loadingSetting && !errorSetting && formValues && (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fieldConfig.map(({ name, icon, label, type, placeholder }) => (
                                        <div key={name}>
                                            <label htmlFor={name} className="block text-white font-medium mb-2">{label}</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black">
                                                    {icon}
                                                </div>
                                                <input
                                                    id={name}
                                                    type={type}
                                                    name={name}
                                                    value={formValues[name]}
                                                    onChange={handleChange}
                                                    className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                                    placeholder={placeholder}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center mt-6">
                                    <button
                                        type="submit"
                                        style={{ backgroundColor: 'var(--color-purple-dark)' }}
                                        className="flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <FaSave className="mr-2" />
                                      {loadingSettingUpdate? "Saving..." : "Save Settings"}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default SettingDashboard;
