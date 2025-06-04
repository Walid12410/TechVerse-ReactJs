import { useEffect } from "react";
import AnimatedBackground from "../../component/user/AnimationBackground";
import { useDispatch, useSelector } from "react-redux";
import TitleSection from "../../component/user/TitleSection";
import ServiceCard from "../../component/user/ServiceCard";
import { getServices } from "../../redux/slices/serviceSlice";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../component/user/LoadingAnimation";

const ServicePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { services,
        loadingServices,
        errorServices
    } = useSelector(state => state.services);

    useEffect(() => {
        dispatch(getServices({ page: 1, limit: 100 }));
    }, [dispatch]);

    if (loadingServices) {
        return <LoadingAnimation />;
    }

    if (errorServices) {
        return (
            <div className="min-h-screen bg-black/90 flex items-center justify-center">
                <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
                    <p className="text-white/80 mb-6">{errorServices}</p>
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
        <>
            <AnimatedBackground />
            
            <div className="mt-20 flex items-center justify-between max-w-6xl mx-auto px-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="text-white hover:text-purple-400 transition-colors group relative"
                >
                    <ArrowLeft size={24} />
                    <span className="absolute left-8 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Go Back
                    </span>
                </button>
                <TitleSection title={"all Services"} />
                <div className="w-6"></div>
            </div>

            <div className="flex flex-col gap-16 w-full max-w-6xl mx-auto px-4 mt-20 mb-20">
                {services && services.length > 0 ? (
                    services.map((service, index) => (
                        <ServiceCard key={service.id} serviceItem={service} index={index} />
                    ))
                ) : (
                    <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-4">No Services Available</h2>
                        <p className="text-white/80">We're currently updating our services. Please check back later.</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default ServicePage;