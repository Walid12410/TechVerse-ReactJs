import { useEffect } from "react";
import AnimatedBackground from "../../component/common/AnimationBackground";
import { useDispatch, useSelector } from "react-redux";
import TitleSection from "../../component/common/TitleSection";
import ProjectListCard from "../../component/common/ProjectListCard";
import { getProjectView } from "../../redux/slices/projectViewSlice";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../component/common/LoadingAnimation";

const ProjectPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { projectViews,
        loadingProjectViews,
        errorProjectViews,
    } = useSelector(state => state.projectView);

    useEffect(() => {
        dispatch(getProjectView({ page: 1, limit: 100 }));
    }, [dispatch]);

    if (loadingProjectViews) {
        return <LoadingAnimation />;
    }

    if (errorProjectViews) {
        return (
            <div className="min-h-screen bg-black/90 flex items-center justify-center">
                <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
                    <p className="text-white/80 mb-6">{errorProjectViews}</p>
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
                    <ArrowLeft size={32} />
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Go Back
                    </span>
                </button>
                <TitleSection title={"all Projects"} />
                <div className="w-8"></div>
            </div>

            <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto px-4 mt-20 mb-20">
                {projectViews && projectViews.length > 0 ? (
                    projectViews.map((project, index) => (
                        <ProjectListCard key={project.id} project={project} index={index} />
                    ))
                ) : (
                    <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-4">No Projects Available</h2>
                        <p className="text-white/80">We're currently updating our projects. Please check back later.</p>
                    </div>
                )}
            </div>
        </>
    );
}
 
export default ProjectPage;