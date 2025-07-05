import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../component/layout/AdminLayout";
import { 
    getProjectById, 
    updateProject, 
    createProjectDetail, 
    deleteProjectDetail,
    clearCreateProjectDetail,
    clearDeleteProjectDetail,
    clearUpdateProject
} from "../../redux/slices/projectSlice";
import { getMembers } from "../../redux/slices/memberSlice";
import { format } from "date-fns";
import DashboardHeader from "../../component/admin/DashboardHeader";
import config from "../../utils/config";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import DeleteModal from "../../component/admin/DeleteModal";
import { toast } from "react-toastify";

const ProjectDetailDashboard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Redux state
    const { currentProject,
        loadingCurrentProject,
        errorCurrentProject,
        isProjectUpdated,
        isProjectDetailCreated,
        isProjectDetailDeleted
    } = useSelector((state) => state.project);
    const { members } = useSelector((state) => state.members);
    
    // Form states
    const [projectForm, setProjectForm] = useState({
        project_name: "",
        project_description: "",
        project_cost: "",
        start_date: "",
        end_date: ""
    });
    
    const [memberForm, setMemberForm] = useState({
        member_id: "",
        cost: "",
        cost_received: "",
        start_date: "",
        end_date: ""
    });
    
    const [detailForm, setDetailForm] = useState({
        detail_description: ""
    });

    // Delete modal states
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteType, setDeleteType] = useState(""); // "member" or "detail"
    
    // Clear states and refetch data after project update
    useEffect(() => {
        if (isProjectUpdated) {
            dispatch(clearUpdateProject());
            dispatch(getProjectById({ id }));
            toast.success("Project updated successfully!");
        }
    }, [isProjectUpdated, dispatch, id]);

    // Clear states and refetch data after project detail creation
    useEffect(() => {
        if (isProjectDetailCreated) {
            dispatch(clearCreateProjectDetail());
            dispatch(getProjectById({ id }));
            toast.success("Project detail added successfully!");
        }
    }, [isProjectDetailCreated, dispatch, id]);

    // Clear states and refetch data after project detail deletion
    useEffect(() => {
        if (isProjectDetailDeleted) {
            dispatch(clearDeleteProjectDetail());
            dispatch(getProjectById({ id }));
            toast.success("Project detail deleted successfully!");
        }
    }, [isProjectDetailDeleted, dispatch, id]);
    
    // Fetch project data and members
    useEffect(() => {
        if (id) {
            dispatch(getProjectById({ id }));
            dispatch(getMembers({ page: 1, limit: 1000 })); // Fetch all members for dropdown
        }
    }, [dispatch, id]);
    
    // Update form when project data is loaded
    useEffect(() => {
        if (currentProject) {
            setProjectForm({
                project_name: currentProject.project_name || "",
                project_description: currentProject.project_description || "",
                project_cost: currentProject.project_cost || "",
                start_date: currentProject.start_date || "",
                end_date: currentProject.end_date || ""
            });
        }
    }, [currentProject]);
    
    // Handle project form changes
    const handleProjectFormChange = (e) => {
        const { name, value } = e.target;
        setProjectForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // Handle member form changes
    const handleMemberFormChange = (e) => {
        const { name, value } = e.target;
        setMemberForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // Handle project form submit
    const handleProjectFormSubmit = (e) => {
        e.preventDefault();
        
        // Validate dates
        if (new Date(projectForm.start_date) > new Date(projectForm.end_date)) {
            toast.error("Start date must be before or equal to end date");
            return;
        }
        
        // Send as JSON data instead of FormData
        dispatch(updateProject({ id, data: projectForm }));
    };
    
    // Handle member form submit
    const handleMemberFormSubmit = (e) => {
        e.preventDefault();
        
        if (!memberForm.member_id) {
            toast.error("Please select a member");
            return;
        }
        
        // Validate member cost
        const currentTotalCost = currentProject.members?.reduce((sum, member) => sum + member.cost, 0) || 0;
        if (Number(memberForm.cost) > (currentProject.project_cost - currentTotalCost)) {
            toast.error("Member cost exceeds remaining project budget");
            return;
        }
        
        // Validate dates
        if (new Date(memberForm.start_date) > new Date(currentProject.end_date)) {
            toast.error("Member start date must be before project end date");
            return;
        }
        
        // Check for duplicate member
        if (currentProject.members?.some(member => member.member.id === memberForm.member_id)) {
            toast.error("This member is already added to the project");
            return;
        }
        
        dispatch(createProjectMember({ data: { ...memberForm, project_id: id } }));
    };
    
    // Handle detail form submit
    const handleDetailFormSubmit = (e) => {
        e.preventDefault();
        if (!detailForm.detail_description.trim()) {
            toast.error("Detail description cannot be empty");
            return;
        }
        dispatch(createProjectDetail({ data: { ...detailForm, project_id: id } }));
    };
    
    // Handle member deletion
    const handleDeleteMember = (memberId) => {
        setSelectedItem(memberId);
        setDeleteType("member");
        setIsDeleteOpen(true);
    };
    
    // Handle detail deletion
    const handleDeleteDetail = (detailId) => {
        setSelectedItem(detailId);
        setDeleteType("detail");
        setIsDeleteOpen(true);
    };

    // Handle actual deletion
    const handleDelete = () => {
        if (deleteType === "member") {
            dispatch(deleteProjectMember({ id: selectedItem }));
        } else if (deleteType === "detail") {
            dispatch(deleteProjectDetail({ id: selectedItem }));
        }
        setIsDeleteOpen(false);
        setSelectedItem(null);
    };
    
    if (loadingCurrentProject) {
        return <div>Loading...</div>;
    }
    
    if (errorCurrentProject) {
        toast.error(errorCurrentProject);
        return <div>Error: {errorCurrentProject}</div>;
    }
    
    if (!currentProject) {
        return <div>Project not found</div>;
    }
    
    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader 
                    title={`${currentProject.project_name} - ${currentProject.client.first_name} ${currentProject.client.last_name}`}
                />
                
                {/* Project Image */}
                <div className="mb-8">
                    <img 
                        src={`${config.API_BASE_URL}/${currentProject.image_url}`}
                        alt={currentProject.project_name}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                
                {/* Project Info Form */}
                <div className="rounded-lg shadow-md p-6 mb-8"
                    style={{ backgroundColor: "var(--color-navy-dark)" }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">Project Information</h2>
                    <form onSubmit={handleProjectFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-white">Project Name</label>
                                <input
                                    type="text"
                                    name="project_name"
                                    value={projectForm.project_name}
                                    onChange={handleProjectFormChange}
                                    className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-white">Project Cost</label>
                                <input
                                    type="number"
                                    name="project_cost"
                                    value={projectForm.project_cost}
                                    onChange={handleProjectFormChange}
                                    className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-white">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={projectForm.start_date}
                                    onChange={handleProjectFormChange}
                                    className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-white">End Date</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={projectForm.end_date}
                                    onChange={handleProjectFormChange}
                                    className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2 text-white">Description</label>
                            <textarea
                                name="project_description"
                                value={projectForm.project_description}
                                onChange={handleProjectFormChange}
                                className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                rows="4"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 text-white px-4 py-2 rounded hover:opacity-90"
                            style={{ backgroundColor: "var(--color-purple)" }}
                        >
                            Update Project
                        </button>
                    </form>
                </div>
                
                {/* Members Section */}
                <div className="rounded-lg shadow-md p-6 mb-8"
                    style={{ backgroundColor: "var(--color-navy-dark)" }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">Project Members</h2>
                    
                    {/* Add Member Form */}
                    <form onSubmit={handleMemberFormSubmit} className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-white">Member *</label>
                                <select
                                    name="member_id"
                                    value={memberForm.member_id}
                                    onChange={handleMemberFormChange}
                                    className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                    required
                                >
                                    <option value="">Select a member</option>
                                    {members.map((member) => (
                                        <option key={member.id} value={member.id} className="text-black">
                                            {member.first_name} {member.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-white">Cost *</label>
                                <input
                                    type="number"
                                    name="cost"
                                    value={memberForm.cost}
                                    onChange={handleMemberFormChange}
                                    className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-white">Cost Received *</label>
                                <input
                                    type="number"
                                    name="cost_received"
                                    value={memberForm.cost_received}
                                    onChange={handleMemberFormChange}
                                    className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-white">Start Date *</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={memberForm.start_date}
                                    onChange={handleMemberFormChange}
                                    className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-white">End Date *</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={memberForm.end_date}
                                    onChange={handleMemberFormChange}
                                    className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 text-white px-4 py-2 rounded hover:opacity-90"
                            style={{ backgroundColor: "var(--color-purple)" }}
                        >
                            Add Member
                        </button>
                    </form>
                    
                    {/* Members List */}
                    <div className="space-y-4">
                        {currentProject.members?.map((member) => (
                            <div key={member.id} className="border p-4 rounded bg-[--color-black-wash]">
                                <div className="flex justify-between items-center">
                                    <div className="text-white">
                                        <h3 className="font-bold">{member.member.first_name} {member.member.last_name}</h3>
                                        <p>Cost: ${member.cost}</p>
                                        <p>Cost Received: ${member.cost_received}</p>
                                        <p>Period: {format(new Date(member.start_date), 'MM/dd/yyyy')} - {format(new Date(member.end_date), 'MM/dd/yyyy')}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteMember(member.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Project Details Section */}
                <div className="rounded-lg shadow-md p-6"
                    style={{ backgroundColor: "var(--color-navy-dark)" }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">Project Details</h2>
                    
                    {/* Add Detail Form */}
                    <form onSubmit={handleDetailFormSubmit} className="mb-8">
                        <div>
                            <label className="block mb-2 text-white">Detail Description</label>
                            <textarea
                                name="detail_description"
                                value={detailForm.detail_description}
                                onChange={(e) => setDetailForm(prev => ({ ...prev, detail_description: e.target.value }))}
                                className="w-full p-2 border rounded bg-[--color-black-wash] text-white"
                                rows="4"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 text-white px-4 py-2 rounded hover:opacity-90"
                            style={{ backgroundColor: "var(--color-purple)" }}
                        >
                            Add Detail
                        </button>
                    </form>
                    
                    {/* Details List */}
                    <div className="space-y-4">
                        {currentProject.details?.map((detail) => (
                            <div key={detail.id} className="border p-4 rounded bg-[--color-black-wash]">
                                <div className="flex justify-between items-center">
                                    <p className="text-white">{detail.detail_description}</p>
                                    <button
                                        onClick={() => handleDeleteDetail(detail.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delete Modal */}
                {isDeleteOpen && (
                    <DeleteModal
                        title={deleteType === "member" ? "Delete Member" : "Delete Detail"}
                        message={deleteType === "member" 
                            ? "Are you sure you want to remove this member from the project?" 
                            : "Are you sure you want to delete this detail?"}
                        handleDelete={handleDelete}
                        loading={false}
                        setIsDeleteOpen={setIsDeleteOpen}
                        setSelectedItem={setSelectedItem}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default ProjectDetailDashboard;