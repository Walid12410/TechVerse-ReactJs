import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearLogin } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { errorAuth, loadingAuth, isLoggedIn } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(loadingAuth) return;

        if (!formData.email || !formData.password) {
            toast.error('Please enter your email and password');
            return;
        }


        dispatch(login({ data: formData }));
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/admin/dashboard');
            dispatch(clearLogin());
        } else if (errorAuth) {
            toast.error(errorAuth);
        }
    }, [isLoggedIn, errorAuth]);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: 'var(--color-navy)' }}>
            {/* Background animated circles */}
            <div className="absolute w-96 h-96 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-purple)', top: '-10%', left: '-10%', animation: 'float 6s ease-in-out infinite' }}></div>
            <div className="absolute w-72 h-72 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-navy-medium)', bottom: '-5%', right: '-5%', animation: 'float 8s ease-in-out infinite' }}></div>

            <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[420px] border border-white/20 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-white)' }}>Welcome Back</h1>
                    <p className="text-gray-300">Please sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loadingAuth}
                        className="w-full py-3 rounded-lg text-white font-semibold transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{ 
                            backgroundColor: 'var(--color-purple)',
                            boxShadow: '0 4px 15px rgba(102, 75, 201, 0.3)'
                        }}
                    >
                        {loadingAuth ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Signing in...
                            </div>
                        ) : 'Sign In'}
                    </button>
                </form>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;