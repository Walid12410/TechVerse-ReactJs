import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../component/layout/AdminLayout";
import { getProjects } from "../../redux/slices/projectSlice";
import Pagination from "../../component/admin/Pagination";
import { format } from "date-fns";
import DashboardHeader from "../../component/admin/DashboardHeader";
import config from "../../utils/config";
import { FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";


const ProjectDashboard = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { projects,
        errorProjects,
        loadingProjects,
        totalPages, 
        itemsPerPage
    } = useSelector((state) => state.project);

    useEffect(() => {
        dispatch(getProjects({ page: currentPage, limit: itemsPerPage }));
    }, [dispatch, currentPage, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <AdminLayout>
            <div className="container-fluid py-4">
                <DashboardHeader title="Projects" buttonText="Add Project" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loadingProjects ? (
                        <div className="text-center">Loading...</div>
                    ): errorProjects ? (
                        <div className="text-center">Error loading projects</div>
                    ): projects.length === 0 ? (
                        <div className="text-center">No projects found</div>
                    ): (
                        projects.map((project) => (
                        <div key={project.id} className="rounded-lg shadow-sm overflow-hidden"
                        style={{backgroundColor: "var(--color-navy-dark)"}}
                        >
                            <div className="h-52 overflow-hidden">
                                <img
                                    src={`${config.API_BASE_URL}/${project.image_url}`}
                                    alt={project.project_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 truncate" title={project.project_name}>{project.project_name}</h3>
                                <div className="space-y-2 text-sm">
                                    <p className="truncate text-xl" title={project.project_description}>
                                        {project.project_description}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-xs">Cost:</span> ${project.project_cost.toFixed(2)}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-xs">Client:</span> {project.client.name}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-xs">Start Date:</span> {format(new Date(project.start_date), 'MMM dd, yyyy')}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-xs ">End Date:</span> {format(new Date(project.end_date), 'MMM dd, yyyy')}
                                    </p>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <Link 
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer"
                                        to={`/admin/project-detail/${project.id}`}
                                    >
                                        <FaEye />
                                    </Link>
                                    <button 
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    )}
                </div>
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default ProjectDashboard;