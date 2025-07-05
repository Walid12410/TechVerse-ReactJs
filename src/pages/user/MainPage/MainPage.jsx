import React, { useEffect } from "react";
import NavBar from "../../../component/user/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../../../redux/slices/aboutSlice";
import { getProjectView } from "../../../redux/slices/projectViewSlice";
import { getServiceName, getServicesFeature } from "../../../redux/slices/serviceSlice";
import { getPricing } from "../../../redux/slices/pricingSlice";
import AnimatedBackground from "../../../component/user/AnimationBackground";
import CubeShowcase from "../../../component/user/Cube";
import AboutSection from "./Section/AboutSection";
import ProjectSection from "./Section/ProjectSection";
import HomeSection from "./Section/HomeSection";
import ServiceSection from "./Section/ServiceSection";
import PriceSection from "./Section/PriceSection";
import ContactSection from "./Section/ContactSection";
import { getSettings } from "../../../redux/slices/settingSlice";
import LoadingAnimation from "../../../component/user/LoadingAnimation";
import { toast } from "react-toastify";
import ServiceNameSection from "./Section/ServiceNameSection";
import LogoImage from "../../../assets/image/logo.png";

const MainPage = () => {
  const dispatch = useDispatch();

  const { aboutUs, loading, error } = useSelector(state => state.about);
  const { projectViews, totalRecords, loadingProjectViews, errorProjectViews } = useSelector(state => state.projectView);
  const { serviceFeature, loadingServiceFeature, errorServiceFeature } = useSelector(state => state.services);
  const { pricing, loadingPricing, errorPricing } = useSelector(state => state.price);
  const { settings, loadingSetting, errorSetting } = useSelector(state => state.settings);
  const { serviceName, loadingServiceName, errorServiceName } = useSelector(state => state.services);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getAbout()),
          dispatch(getProjectView({ page: 1, limit: 3 })),
          dispatch(getServicesFeature()),
          dispatch(getPricing({ page: 1, limit: 3 })),
          dispatch(getSettings()),
          dispatch(getServiceName())
        ]);
      } catch (error) {
        toast.warning("Something went wrong, Try again later");
      }
    };
    fetchData();

  }, [dispatch]);

  if (loading || loadingPricing || loadingServiceName || loadingProjectViews || loadingServiceFeature || loadingSetting) {
    return <LoadingAnimation />;
  }

  // Check for any errors
  const hasError = error || errorProjectViews || errorServiceName || errorServiceFeature || errorPricing || errorSetting;
  if (hasError) {
    return (
      <div className="min-h-screen bg-black/90 flex items-center justify-center">
        <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
          <p className="text-white/80 mb-6">
            {error || errorProjectViews || errorServiceName || errorServiceFeature || errorPricing || errorSetting}
          </p>
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
      <NavBar />
      <div className="pt-20 space-y-10 relative" style={{ backgroundColor: 'var(--color-animation-background)' }}>
        <div id="cube" className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-animation-background)' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="/Vid1.mp4"
          />
          <div className="relative z-10">
            <CubeShowcase />
            <ServiceNameSection serviceName={serviceName} icon={LogoImage} />
          </div>
        </div>
        <div id="home" style={{ backgroundColor: 'var(--color-animation-background)' }}>
          <HomeSection />
        </div>
        <div id="about"  style={{ backgroundColor: 'var(--color-animation-background)' }}>
          <AboutSection aboutUs={aboutUs} />
        </div>
        <div id="services"  style={{ backgroundColor: 'var(--color-animation-background)' }}>
          <ServiceSection services={serviceFeature} />
        </div>
        <div id="projects"  style={{ backgroundColor: 'var(--color-animation-background)' }}>
          <ProjectSection projectView={projectViews} totalRecords={totalRecords} />
        </div>
        <div id="pricing"  style={{ backgroundColor: 'var(--color-animation-background)' }}>
          <PriceSection prices={pricing} />
        </div>
        <div id="contact" className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-animation-background)' }}>
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="/Vid1.mp4"
          />
          <div className="relative z-10">
          <ContactSection setting={settings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
