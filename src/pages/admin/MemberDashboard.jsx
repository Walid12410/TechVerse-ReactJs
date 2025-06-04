import { useEffect, useState } from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { clearCreateMember, 
    clearUpdateMember, 
    clearDeleteMember, 
    createMember, 
    deleteMember, 
    getMembers, 
    updateMember 
} from "../../redux/slices/memberSlice";
import DataTable from "../../component/admin/DataTable";
import FormModal from "../../component/admin/FormModal";
import DeleteModal from "../../component/admin/DeleteModal";
import Pagination from "../../component/admin/Pagination";
import { toast } from "react-toastify";
import DashboardHeader from "../../component/admin/DashboardHeader";

const MemberDashboard = () => {
    const dispatch = useDispatch();

    const { members,
        loading,
        error,
        totalPages,
        totalRecords,
        itemsPerPage,
        loadingCreateMember,
        isMemberCreate,
        errorCreateMember,
        isMemberUpdate,
        loadingUpdateMember,
        errorUpdateMember,
        isMemberDeleted,
        loadingMemberDeleting,
        errorDeletingMember
    } = useSelector(state => state.members);

    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        field_of_expertise: ''
    });

    const columns = [
        { label: 'Name', field: 'name', render: (item) => `${item.first_name} ${item.last_name}` },
        { label: 'Email', field: 'email' },
        { label: 'Number', field: 'phone_number' },
        { label: 'Field of Expertise', field: 'field_of_expertise' }
    ];

    const formFields = [
        { label: 'First Name', name: 'first_name', type: 'text', required: true },
        { label: 'Last Name', name: 'last_name', type: 'text', required: true },
        { label: 'Email', name: 'email', type: 'email', required: true },
        { label: 'Phone Number', name: 'phone_number', type: 'tel', required: true },
        { label: 'Field of Expertise', name: 'field_of_expertise', type: 'text', required: true }
    ];

    const validateMemberForm = (data) => {
        const { first_name, last_name, email, phone_number, field_of_expertise } = data;
       
        // Basic required fields check
        if (!first_name || !last_name || !email || !phone_number || !field_of_expertise) {
            toast.error("All fields are required");
            return false;
        }
       
        // Length validations
        if (first_name.length > 50) {
            toast.error("First name must be 50 characters or fewer");
            return false;
        }
       
        if (last_name.length > 50) {
            toast.error("Last name must be 50 characters or fewer");
            return false;
        }
       
        if (email.length > 100) {
            toast.error("Email must be 100 characters or fewer");
            return false;
        }

        if (field_of_expertise.length > 100) {
            toast.error("Field of expertise must be 100 characters or fewer");
            return false;
        }
     
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleModalClose = () => {
        if (loadingCreateMember) return;
        setIsModalOpen(false);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            field_of_expertise: ''
        });
    };

    const handleEditModalClose = () => {
        if (loadingUpdateMember) return;
        setIsEditOpen(false);
        setSelectedMember(null);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            field_of_expertise: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateMemberSubmit = async (e) => {
        e.preventDefault();
       
        if (loadingCreateMember) return;
       
        if (!validateMemberForm(formData)) return;
       
        dispatch(createMember({ data: formData }));
    };

    const handleEditMemberSubmit = async (e) => {
        e.preventDefault();
       
        if (loadingUpdateMember) return;
       
        if (!validateMemberForm(formData)) return;
       
        dispatch(updateMember({id: selectedMember.id, data:formData}));
    };

    const handleDeleteMember = () => {
        if (loadingMemberDeleting) return;
        dispatch(deleteMember({ id: selectedMember.id }));
    };

    useEffect(() => {
        dispatch(getMembers({ page, limit: 10 }));
    }, [page]);

    useEffect(() => {
        if(isMemberCreate){
            toast.success("Member added successfully!");
            dispatch(getMembers({page: 1, limit: 10}));
            dispatch(clearCreateMember());
            handleModalClose();
        }else if(errorCreateMember){
            dispatch(clearCreateMember());
            handleModalClose();
        }
    },[isMemberCreate, errorCreateMember]);

    useEffect(()=>{
        if(isMemberUpdate){
            toast.success("Member update successfully!");
            dispatch(getMembers({page, limit:10}));
            dispatch(clearUpdateMember());
            handleEditModalClose();
        }else if(errorUpdateMember){
            dispatch(clearUpdateMember());
            handleEditModalClose();
        }
    },[isMemberUpdate, errorUpdateMember]);

    useEffect(() => {
        if(isMemberDeleted){
            toast.success("Member deleted successfully!");
            dispatch(getMembers({page, limit:10}));
            dispatch(clearDeleteMember());
            setIsDeleteOpen(false);
            setSelectedMember(null);
        }else if(errorDeletingMember){
            dispatch(clearDeleteMember());
            setIsDeleteOpen(false);
            setSelectedMember(null);
        }
    },[isMemberDeleted, errorDeletingMember]);

    useEffect(() => {
        if(selectedMember) {
            setFormData({
                first_name: selectedMember.first_name,
                last_name: selectedMember.last_name,
                email: selectedMember.email,
                phone_number: selectedMember.phone_number,
                field_of_expertise: selectedMember.field_of_expertise
            });
        }
    }, [selectedMember]);

    return (
        <AdminLayout>
            <div
                className="rounded-lg shadow p-4 md:p-6 h-[90vh] flex flex-col text-white"
                style={{ backgroundColor: "var(--color-navy-dark)" }}
            >
                <DashboardHeader title="Members" onAddClick={() => setIsModalOpen(true)} buttonText="Add New Member" />


                <DataTable
                    loading={loading}
                    error={error}
                    data={members}
                    columns={columns}
                    actions={{
                        edit: (item) => {
                            setIsEditOpen(true);
                            setSelectedMember(item);
                        },
                        delete: (item) => {
                            setIsDeleteOpen(true);
                            setSelectedMember(item);
                        },
                    }}
                />

                <div className="mt-auto pt-4 border-t border-gray-600">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    {totalRecords > 0 && (
                        <div className="text-center text-sm text-gray-300 mt-2">
                            Showing {Math.min((page - 1) * itemsPerPage + 1, totalRecords)} to{" "}
                            {Math.min(page * itemsPerPage, totalRecords)} of {totalRecords} members
                        </div>
                    )}
                </div>

                {isModalOpen && (
                    <FormModal
                        title="Add Member"
                        handleModalClose={handleModalClose}
                        handleSubmit={handleCreateMemberSubmit}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        fields={formFields}
                        loading={loadingCreateMember}
                        submitText="Create Member"
                    />
                )}

                {isEditOpen && selectedMember && (
                    <FormModal
                        title="Edit Member"
                        handleModalClose={handleEditModalClose}
                        handleSubmit={handleEditMemberSubmit}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        fields={formFields}
                        loading={loadingUpdateMember}
                        submitText="Update Member"
                    />
                )}

                {isDeleteOpen && selectedMember && (
                    <DeleteModal
                        title="Delete Member"
                        message="Are you sure you want to delete this member?"
                        handleDelete={handleDeleteMember}
                        loading={loadingMemberDeleting}
                        setIsDeleteOpen={setIsDeleteOpen}
                        setSelectedItem={setSelectedMember}
                    />
                )}
            </div>
        </AdminLayout>
    );
}

export default MemberDashboard;