import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../component/layout/AdminLayout";
import { getProjects, createProject, clearCreateProject, deleteProject, clearDeleteProject } from "../../redux/slices/projectSlice";
import { getClients } from "../../redux/slices/clientSlice";
import Pagination from "../../component/admin/Pagination";
import { format } from "date-fns";
import DashboardHeader from "../../component/admin/DashboardHeader";
import config from "../../utils/config";
import { FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddProjectModal from "../../component/admin/AddProjectModal";
import DeleteModal from "../../component/admin/DeleteModal";
import { toast } from "react-toastify";


const ProjectDashboard = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const { projects,
        errorProjects,
        loadingProjects,
        totalPages, 
        itemsPerPage,
        isProjectCreated,
        loadingCreatingProject,
        errorCreatingProject,
        isProjectDeleted,
        loadingDeletingProject,
        errorDeletingProject
    } = useSelector((state) => state.project);

    const { clients } = useSelector((state) => state.clients);

    const [formData, setFormData] = useState({
        client_id: '',
        project_name: '',
        project_description: '',
        project_cost: '',
        start_date: '',
        end_date: ''
    });

    useEffect(() => {
        dispatch(getProjects({ page: currentPage, limit: itemsPerPage }));
        dispatch(getClients({ page: 1, limit: 1000 })); // Get all clients for dropdown
    }, [dispatch, currentPage, itemsPerPage]);

    useEffect(() => {
        if (isProjectCreated) {
            toast.success("Project created successfully!");
            dispatch(getProjects({ page: currentPage, limit: itemsPerPage }));
            dispatch(clearCreateProject());
            handleModalClose();
        } else if (errorCreatingProject) {
            toast.error(errorCreatingProject);
            dispatch(clearCreateProject());
        }
    }, [isProjectCreated, errorCreatingProject, dispatch, currentPage, itemsPerPage]);

    useEffect(() => {
        if (isProjectDeleted) {
            toast.success("Project deleted successfully!");
            dispatch(getProjects({ page: currentPage, limit: itemsPerPage }));
            dispatch(clearDeleteProject());
            setIsDeleteOpen(false);
            setSelectedProject(null);
        } else if (errorDeletingProject) {
            toast.error(errorDeletingProject);
            dispatch(clearDeleteProject());
        }
    }, [isProjectDeleted, errorDeletingProject, dispatch, currentPage, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleModalClose = () => {
        if (loadingCreatingProject) return;
        setIsModalOpen(false);
        setFormData({
            client_id: '',
            project_name: '',
            project_description: '',
            project_cost: '',
            start_date: '',
            end_date: ''
        });
        setImagePreview(null);
        setSelectedFile(null);
    };

    const handleDeleteModalClose = () => {
        if (loadingDeletingProject) return;
        setIsDeleteOpen(false);
        setSelectedProject(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loadingCreatingProject) return;

        if (!selectedFile) {
            toast.error("Please select an image");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('client_id', formData.client_id);
        formDataToSend.append('project_name', formData.project_name);
        formDataToSend.append('project_description', formData.project_description);
        formDataToSend.append('project_cost', formData.project_cost);
        formDataToSend.append('start_date', formData.start_date);
        formDataToSend.append('end_date', formData.end_date);
        formDataToSend.append('image', selectedFile);

        dispatch(createProject({ data: formDataToSend }));
    };

    const handleDeleteProject = () => {
        if (loadingDeletingProject) return;
        dispatch(deleteProject({ id: selectedProject.id }));
    };


    return (
        <AdminLayout>
            <div className="container-fluid py-4">
                <DashboardHeader title="Projects" buttonText="Add Project" onAddClick={() => setIsModalOpen(true)} />
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
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setIsDeleteOpen(true);
                                        }}
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

                {isModalOpen && (
                    <AddProjectModal
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        formData={formData}
                        onInputChange={handleInputChange}
                        onImageChange={handleImageChange}
                        imagePreview={imagePreview}
                        onSubmit={handleSubmit}
                        loadingCreatingProject={loadingCreatingProject}
                        clients={clients}
                    />
                )}

                {isDeleteOpen && selectedProject && (
                    <DeleteModal
                        title="Delete Project"
                        message={`Are you sure you want to delete "${selectedProject.project_name}"? This action cannot be undone.`}
                        handleDelete={handleDeleteProject}
                        loading={loadingDeletingProject}
                        setIsDeleteOpen={setIsDeleteOpen}
                        setSelectedItem={setSelectedProject}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default ProjectDashboard;