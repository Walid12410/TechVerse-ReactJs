import React, { useEffect, useState } from 'react';
import AdminLayout from '../../component/layout/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getContactUs, deleteContactUs, clearDeleteContactUs } from '../../redux/slices/contactUsSlice';
import ContactUsTable from '../../component/common/ContactUsTable';
import Pagination from '../../component/common/Pagination';
import DeleteModal from '../../component/common/DeleteModal';
import { toast } from 'react-toastify';

const ContactUsDashboard = () => {
    const dispatch = useDispatch();

    const { contactUs,
        loadingContactUs,
        errorContactUs,
        totalPages,
        totalRecords,
        itemsPerPage,
        isDeleteContactUs,
        loadingDeleteContactUs,
        errorDeleteContactUs
    } = useSelector(state => state.contactUs);

    const [page, setPage] = useState(1);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const columns = [
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email' },
        { label: 'Subject', field: 'subject' },
        { label: 'Message', field: 'message' },
        { label: 'Number', field: 'phone_number' },
        { label: 'Received At', field: 'created_at' },
    ];

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleDeleteModalClose = () => {
        if (loadingDeleteContactUs) return;
        setIsDeleteOpen(false);
        setSelectedContact(null);
    };

    const handleDeleteContact = () => {
        if (loadingDeleteContactUs || !selectedContact) return;
        dispatch(deleteContactUs({ id: selectedContact.id }));
    };

    useEffect(() => {
        dispatch(getContactUs({ page, limit: 10 }));
    }, [page, dispatch]);

    useEffect(() => {
        if (isDeleteContactUs) {
            toast.success("Message deleted successfully!");
            dispatch(getContactUs({ page, limit: 10 })); // Refresh data
            dispatch(clearDeleteContactUs());
            handleDeleteModalClose();
        } else if (errorDeleteContactUs) {
            toast.error("Error deleting message. Try again later.");
            dispatch(clearDeleteContactUs());
            handleDeleteModalClose();
        }
    }, [isDeleteContactUs, errorDeleteContactUs, page, dispatch]);

    return (
        <AdminLayout>
            <div
                className="rounded-lg shadow p-4 md:p-6 h-[90vh] flex flex-col text-white"
                style={{ backgroundColor: "var(--color-navy-dark)" }}
            >
                <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-2">Contact Messages</h1>

                {/* Add a header/filter component here if needed in the future */}

                <ContactUsTable
                    loading={loadingContactUs}
                    error={errorContactUs}
                    data={contactUs}
                    columns={columns}
                    setIsDeleteOpen={setIsDeleteOpen}
                    setSelectedItem={setSelectedContact}
                />

                <div className="mt-auto pt-4 border-t border-gray-600">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    {totalRecords > 0 && ( // Check if totalRecords is greater than 0 before displaying
                        <div className="text-center text-sm text-gray-300 mt-2">
                            Showing {Math.min((page - 1) * itemsPerPage + 1, totalRecords)} to{" "}
                            {Math.min(page * itemsPerPage, totalRecords)} of {totalRecords} messages
                        </div>
                    )}
                 </div>

                {isDeleteOpen && selectedContact && (
                    <DeleteModal
                        title="Delete Message"
                        message={`Are you sure you want to delete the message from ${selectedContact.name}?`}
                        handleDelete={handleDeleteContact}
                        loading={loadingDeleteContactUs}
                        setIsDeleteOpen={setIsDeleteOpen}
                        setSelectedItem={setSelectedContact}
                    />
                )}
            </div>
        </AdminLayout>
    );
}

export default ContactUsDashboard;