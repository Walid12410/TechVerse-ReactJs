import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearUpdatePricing,
    clearCreatePricingDetails,
    clearDeletePricingDetails,
    clearDeletePrice,
    getPricing,
    createPricing,
    updatePricing,
    createPricingDetails,
    deletePricingDetails,
    deletePrice,
    clearCreatePrice
} from "../../redux/slices/pricingSlice";
import Pagination from "../../component/admin/Pagination";
import { toast } from "react-toastify";
import AdminLayout from "../../component/layout/AdminLayout";
import AddPricingPlanModal from "../../component/admin/AddPricingPlanModal";
import EditPricingPlanModal from "../../component/admin/EditPricingPlanModal";
import ViewPricingDetailsModal from "../../component/admin/ViewPricingDetailsModal";
import DashboardHeader from "../../component/admin/DashboardHeader";
import DataTable from "../../component/admin/DataTable";
import DeleteModal from "../../component/admin/DeleteModal";


const PricingPlanDashboard = () => {
    const dispatch = useDispatch();

    const {
        pricing,
        loadingPricing,
        errorPricing,
        totalPages,
        totalRecords,
        itemsPerPage,
        isPricingCreated,
        loadingCreatingPricing,
        errorCreatingPricing,
        isPricingDetailsCreated,
        loadingCreatingPricingDetails,
        errorCreatingPricingDetails,
        isPricingDetailsDeleted,
        loadingDeletingPricingDetails,
        errorDeletingPricingDetails,
        isPricingUpdated,
        loadingPricingUpdate,
        errorUpdatePricing,
        isPriceDeleted,
        loadingDeletingPrice,
        errorDeletingPrice
    } = useSelector((state) => state.price);

    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedPricing, setSelectedPricing] = useState(null);
    const [detailDescription, setDetailDescription] = useState("");
    const [deletingPricingId, setDeletingPricingId] = useState(null);

    const [formData, setFormData] = useState({
        plan_title: "",
        plan_description: "",
        price: "",
        billing_period: ""
    });

    useEffect(() => {
        dispatch(getPricing({ page, limit: 10 }));
    }, [dispatch, page]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleModalClose = () => {
        if (loadingCreatingPricing) return;
        setIsModalOpen(false);
        setFormData({
            plan_title: "",
            plan_description: "",
            price: "",
            billing_period: ""
        });
    };

    const handleEditClose = () => {
        setIsEditOpen(false);
        setSelectedPricing(null);
    };

    const handleDetailsClose = () => {
        setIsDetailsOpen(false);
        setSelectedPricing(null);
    };

    const handleViewDetails = (pricing) => {
        setSelectedPricing(pricing);
        setIsDetailsOpen(true);
    };

    const handleEdit = (pricing) => {
        setSelectedPricing(pricing);
        setIsEditOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreatePricingSubmit = (e) => {
        e.preventDefault();

        if (loadingCreatingPricing) return;

        const { plan_title, plan_description, price, billing_period } = formData;

        if (!plan_title || !plan_description || !price || !billing_period) {
            return toast.error("All fields are required");
        }

        if (plan_title.length > 255) {
            return toast.error("Plan title must be 255 characters or fewer");
        }

        dispatch(createPricing({ data: formData }));
    };

    useEffect(() => {
        if (isPricingCreated) {
            handleModalClose();
            dispatch(clearCreatePrice());
            dispatch(getPricing({ page, limit: 10 }));
        } else if (errorCreatingPricing) {
            dispatch(clearCreatePrice());
        }
    }, [isPricingCreated, errorCreatingPricing]);

    const handleCreatePricingDetailSubmit = (e) => {
        e.preventDefault();

        if (loadingCreatingPricingDetails) return;

        if (!detailDescription) {
            return toast.error("Detail description is required");
        }

        if (detailDescription.length > 200) {
            return toast.error("Detail description must be 200 characters or fewer");
        }

        const data = {
            pricing_id: selectedPricing.id,
            pricing_detail: detailDescription
        };

        dispatch(createPricingDetails({ data }))
            .then(() => {
                setDetailDescription("");
                dispatch(getPricing({ page, limit: 10 }));
                handleEditClose();
            })
            .catch((error) => {
                console.error("Error creating pricing detail:", error);
                toast.error("Failed to add pricing detail");
            });
    };

    useEffect(() => {
        if (isPricingDetailsCreated) {
            toast.success("Detail added successfully!");
            dispatch(clearCreatePricingDetails());
            
            setDetailDescription("");
        } else if (errorCreatingPricingDetails) {
            dispatch(clearCreatePricingDetails());
            setDetailDescription("");
        }
    }, [isPricingDetailsCreated, errorCreatingPricingDetails]);

    const handleRemoveDetail = (id) => {
        if (loadingDeletingPricingDetails) return;

        dispatch(deletePricingDetails({ id }))
            .then(() => {
                setSelectedPricing(prev => ({
                    ...prev,
                    details: prev.details.filter(detail => detail.id !== id),
                }));
            })
            .catch((error) => {
                console.error("Error deleting detail:", error);
            });
    };

    const handleDeletePricing = () => {
        if (loadingDeletingPrice) return;

        dispatch(deletePrice({ id: deletingPricingId }))
            .then(() => {
                setIsDeleteOpen(false);
                setDeletingPricingId(null);
                dispatch(getPricing({ page, limit: 10 }));
            })
            .catch((error) => {
                console.error("Error deleting pricing:", error);
                toast.error("Failed to delete pricing plan");
            });
    };

    useEffect(() => {
        if (isPriceDeleted) {
            toast.success("Pricing plan deleted successfully");
            dispatch(clearDeletePrice());
            dispatch(getPricing({ page, limit: 10 }));
        } else if (errorDeletingPrice) {
            toast.error("Failed to delete pricing plan");
            dispatch(clearDeletePrice());
        }
    }, [isPriceDeleted, errorDeletingPrice]);

    useEffect(() => {
        if (isPricingDetailsDeleted) {
            toast.success("Pricing detail deleted successfully");
            dispatch(clearDeletePricingDetails());
            dispatch(getPricing({ page, limit: 10 }));
        } else if (errorDeletingPricingDetails) {
            toast.error("Failed to delete pricing detail");
            dispatch(clearDeletePricingDetails());
        }
    }, [isPricingDetailsDeleted, errorDeletingPricingDetails]);

    const handleUpdatePricing = (id) => {
        if (loadingPricingUpdate) return;

        if (!selectedPricing.plan_title || !selectedPricing.plan_description || !selectedPricing.price || !selectedPricing.billing_period) {
            return toast.error("All fields are required");
        }

        if (selectedPricing.plan_title.length > 255) {
            return toast.error("Plan title must be 255 characters or fewer");
        }

        const data = {
            plan_title: selectedPricing.plan_title,
            plan_description: selectedPricing.plan_description,
            price: selectedPricing.price,
            billing_period: selectedPricing.billing_period
        };

        dispatch(updatePricing({ id, data }));
    };

    useEffect(() => {
        if (isPricingUpdated) {
            toast.success("Pricing plan updated successfully");
            dispatch(clearUpdatePricing());
            dispatch(getPricing({ page, limit: 10 }));
        } else if (errorUpdatePricing) {
            dispatch(clearUpdatePricing());
            dispatch(getPricing({ page, limit: 10 }));
        }
    }, [isPricingUpdated, errorUpdatePricing]);

    const columns = [
        {
          label: "Plan Title",
          field: "plan_title",
        },
        {
          label: "Price",
          field: "price",
        },
        {
            label: "Description",
            field: "plan_description",
        },
        {
          label: "Billing Period",
          field: "billing_period",
        },
    ];
    

    return (
        <AdminLayout>
            <div
                className="rounded-lg shadow p-4 md:p-6 h-[90vh] flex flex-col text-white"
                style={{ backgroundColor: "var(--color-navy-dark)" }}
            >
                <DashboardHeader title="Pricing Plans" onAddClick={() => setIsModalOpen(true)} buttonText="Add New Plan" />
           
                <DataTable
                    loading={loadingPricing}
                    error={errorPricing}
                    data={pricing}
                    columns={columns}
                    actions={{
                        edit: (item) => {
                            handleEdit(item);
                        },
                        delete: (item) => {
                            setDeletingPricingId(item.id);
                            setIsDeleteOpen(true);
                        },
                        view: (item) => {
                            handleViewDetails(item);
                        }
                    }}
                />

                <div className="mt-auto pt-4 border-t border-gray-600">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    {totalRecords > 0 && (
                        <div className="text-center text-sm text-gray-300 mt-2">
                            Showing {Math.min((page - 1) * itemsPerPage + 1, totalRecords)} to{" "}
                            {Math.min(page * itemsPerPage, totalRecords)} of {totalRecords} plans
                        </div>
                    )}
                </div>
            </div>

            <AddPricingPlanModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleCreatePricingSubmit}
                loadingCreatingPricing={loadingCreatingPricing}
            />

            <ViewPricingDetailsModal
                isOpen={isDetailsOpen}
                onClose={handleDetailsClose}
                selectedPricing={selectedPricing}
            />

            <EditPricingPlanModal
                isOpen={isEditOpen}
                onClose={handleEditClose}
                selectedPricing={selectedPricing}
                setSelectedPricing={setSelectedPricing}
                detailDescription={detailDescription}
                setDetailDescription={setDetailDescription}
                onUpdatePricing={handleUpdatePricing}
                onCreatePricingDetail={handleCreatePricingDetailSubmit}
                onRemoveDetail={handleRemoveDetail}
                loadingPricingUpdate={loadingPricingUpdate}
                loadingCreatingPricingDetails={loadingCreatingPricingDetails}
            />

  
            {isDeleteOpen && (
                <DeleteModal
                    title="Delete Pricing Plan"
                    message="Are you sure you want to delete this pricing plan?"
                    loading={loadingDeletingPrice}
                    handleDelete={handleDeletePricing}
                    setIsDeleteOpen={setIsDeleteOpen}
                    setSelectedItem={setDeletingPricingId}
                />
            )}

        </AdminLayout>
    );
};

export default PricingPlanDashboard;