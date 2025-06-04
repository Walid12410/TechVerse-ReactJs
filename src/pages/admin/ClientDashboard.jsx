import { useEffect, useState } from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
    getClients,
    createClient,
    updateClient,
    deleteClient,
    clearCreateClient,
    clearUpdateClient,
    clearDeleteClient
} from "../../redux/slices/clientSlice";
import DataTable from "../../component/admin/DataTable";
import FormModal from "../../component/admin/FormModal";
import DeleteModal from "../../component/admin/DeleteModal";
import Pagination from "../../component/admin/Pagination";
import { toast } from "react-toastify";
import DashboardHeader from "../../component/admin/DashboardHeader";

const ClientDashboard = () => {
    const dispatch = useDispatch();

    const {
        clients,
        loading,
        error,
        totalPages,
        totalRecords,
        itemsPerPage,
        isClientCreate,
        loadingCreateClient,
        errorCreateClient,
        isClientUpdate,
        loadingUpdateClient,
        errorUpdateClient,
        isClientDeleted,
        loadingClientDeleting,
        errorDeletingClient
    } = useSelector(state => state.clients);

    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        country_of_origin: ''
    });

    const columns = [
        { label: 'Name', field: 'name', render: (item) => `${item.first_name} ${item.last_name}` },
        { label: 'Email', field: 'email' },
        { label: 'Number', field: 'phone_number' },
        { label: 'Country', field: 'country_of_origin' }
    ];

    const formFields = [
        { label: 'First Name', name: 'first_name', type: 'text', required: true },
        { label: 'Last Name', name: 'last_name', type: 'text', required: true },
        { label: 'Email', name: 'email', type: 'email', required: true },
        { label: 'Phone Number', name: 'phone_number', type: 'tel', required: true },
        { label: 'Country of Origin', name: 'country_of_origin', type: 'text', required: true }
    ];

    const validateClientForm = (data) => {
        const { first_name, last_name, email, phone_number, country_of_origin } = data;

        // Basic required fields check
        if (!first_name || !last_name || !email || !phone_number || !country_of_origin) {
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

        if (country_of_origin.length > 100) {
            toast.error("Country name must be 100 characters or fewer");
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
        if (loadingCreateClient) return;
        setIsModalOpen(false);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            country_of_origin: ''
        });
    };

    const handleEditModalClose = () => {
        if (loadingUpdateClient) return;
        setIsEditOpen(false);
        setSelectedClient(null);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            country_of_origin: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateClientSubmit = async (e) => {
        e.preventDefault();

        if (loadingCreateClient) return;

        if (!validateClientForm(formData)) return;

        dispatch(createClient({ data: formData }));
    };

    const handleEditClientSubmit = async (e) => {
        e.preventDefault();

        if (loadingUpdateClient) return;

        if (!validateClientForm(formData)) return;

        dispatch(updateClient({ id: selectedClient.id, data: formData }));
    };

    const handleDeleteClient = () => {
        if (loadingClientDeleting) return;
        dispatch(deleteClient({ id: selectedClient.id }));
    };

    useEffect(() => {
        dispatch(getClients({ page, limit: 10 }));
    }, [page]);

    useEffect(() => {
        if (isClientCreate) {
            toast.success("Client added successfully!");
            dispatch(getClients({ page: 1, limit: 10 }));
            dispatch(clearCreateClient());
            handleModalClose();
        } else if (errorCreateClient) {
            dispatch(clearCreateClient());
            handleModalClose();
        }
    }, [isClientCreate, errorCreateClient]);

    useEffect(() => {
        if (isClientUpdate) {
            toast.success("Client updated successfully!");
            dispatch(getClients({ page, limit: 10 }));
            dispatch(clearUpdateClient());
            handleEditModalClose();
        } else if (errorUpdateClient) {
            dispatch(clearUpdateClient());
            handleEditModalClose();
        }
    }, [isClientUpdate, errorUpdateClient]);

    useEffect(() => {
        if (isClientDeleted) {
            toast.success("Client deleted successfully!");
            dispatch(getClients({ page, limit: 10 }));
            dispatch(clearDeleteClient());
            setIsDeleteOpen(false);
            setSelectedClient(null);
        } else if (errorDeletingClient) {
            dispatch(clearDeleteClient());
            setIsDeleteOpen(false);
            setSelectedClient(null);
        }
    }, [isClientDeleted, errorDeletingClient]);

    useEffect(() => {
        if (selectedClient) {
            setFormData({
                first_name: selectedClient.first_name,
                last_name: selectedClient.last_name,
                email: selectedClient.email,
                phone_number: selectedClient.phone_number,
                country_of_origin: selectedClient.country_of_origin
            });
        }
    }, [selectedClient]);

    return (
        <AdminLayout>
            <div
                className="rounded-lg shadow p-4 md:p-6 h-[90vh] flex flex-col text-white"
                style={{ backgroundColor: "var(--color-navy-dark)" }}
            >
                <DashboardHeader title="Clients" onAddClick={() => setIsModalOpen(true)} buttonText="Add New Client" />

                <DataTable
                    loading={loading}
                    error={error}
                    data={clients}
                    columns={columns}
                    actions={{
                        edit: (item) => {
                            setIsEditOpen(true);
                            setSelectedClient(item);
                        },
                        delete: (item) => {
                            setIsDeleteOpen(true);
                            setSelectedClient(item);
                        },
                        // Optional: add `view` if needed
                        // view: (item) => handleViewClient(item)
                    }}
                />

                <div className="mt-auto pt-4 border-t border-gray-600">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    {totalRecords > 0 && (
                        <div className="text-center text-sm text-gray-300 mt-2">
                            Showing {Math.min((page - 1) * itemsPerPage + 1, totalRecords)} to{" "}
                            {Math.min(page * itemsPerPage, totalRecords)} of {totalRecords} clients
                        </div>
                    )}
                </div>

                {isModalOpen && (
                    <FormModal
                        title="Add Client"
                        handleModalClose={handleModalClose}
                        handleSubmit={handleCreateClientSubmit}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        fields={formFields}
                        loading={loadingCreateClient}
                        submitText="Create Client"
                    />
                )}

                {isEditOpen && selectedClient && (
                    <FormModal
                        title="Edit Client"
                        handleModalClose={handleEditModalClose}
                        handleSubmit={handleEditClientSubmit}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        fields={formFields}
                        loading={loadingUpdateClient}
                        submitText="Update Client"
                    />
                )}

                {isDeleteOpen && selectedClient && (
                    <DeleteModal
                        title="Delete Client"
                        message="Are you sure you want to delete this client?"
                        handleDelete={handleDeleteClient}
                        loading={loadingClientDeleting}
                        setIsDeleteOpen={setIsDeleteOpen}
                        setSelectedItem={setSelectedClient}
                    />
                )}
            </div>
        </AdminLayout>
    );
}

export default ClientDashboard;