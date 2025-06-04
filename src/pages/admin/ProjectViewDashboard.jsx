import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearCreateProjectView,
    clearUpdateProjectView,
    clearUpdateProjectViewImage,
    clearDeleteProjectView,
    getProjectView,
    createProjectView,
    updateProjectView,
    updateProjectViewImage,
    deleteProjectView
} from "../../redux/slices/projectViewSlice";
import Pagination from "../../component/admin/Pagination";
import { toast } from "react-toastify";
import AdminLayout from "../../component/layout/AdminLayout";
import AddProjectViewModal from "../../component/admin/AddProjectViewModal";
import EditProjectViewModal from "../../component/admin/EditProjectViewModal";
import DashboardHeader from "../../component/admin/DashboardHeader";
import DeleteModal from "../../component/admin/DeleteModal";
import DataTable from "../../component/admin/DataTable";
import config from "../../utils/config";

const ProjectViewDashboard = () => {
    const dispatch = useDispatch();

    const {
        projectViews,
        loadingProjectViews,
        errorProjectViews,
        totalPages,
        totalRecords,
        itemsPerPage,
        isProjectViewCreated,
        loadingCreatingProjectView,
        errorCreatingProjectView,
        isProjectViewUpdated,
        loadingUpdatingProjectView,
        errorUpdatingProjectView,
        isProjectViewImageUpdated,
        loadingUpdatingProjectViewImage,
        errorUpdatingProjectViewImage,
        isProjectViewDeleted,
        loadingDeletingProjectView,
        errorDeletingProjectView
    } = useSelector((state) => state.projectView);

    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedProjectView, setSelectedProjectView] = useState(null);
    const [deletingProjectViewId, setDeletingProjectViewId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showImageConfirm, setShowImageConfirm] = useState(false);
    const [tempImage, setTempImage] = useState(null);

    const [formData, setFormData] = useState({
        view_title: "",
        view_description: "",
        view_link: "",
        image_url: null
    });

    useEffect(() => {
        dispatch(getProjectView({ page, limit: 6 }));
    }, [dispatch, page]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleModalClose = () => {
        if (loadingCreatingProjectView) return;
        setIsModalOpen(false);
        setFormData({
            view_title: "",
            view_description: "",
            view_link: "",
            image_url: null
        });
        setSelectedImage(null);
        setImagePreview(null);
    };

    const handleEditClose = () => {
        setIsEditOpen(false);
        setSelectedProjectView(null);
        setSelectedImage(null);
        setImagePreview(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTempImage(file);
            setImagePreview(URL.createObjectURL(file));
            setFormData(prevState => ({
                ...prevState,
                image_url: file
            }));
            setShowImageConfirm(true);
        }
    };

    const handleConfirmImageChange = () => {
        if (tempImage) {
            setSelectedImage(tempImage);
            setFormData(prevState => ({
                ...prevState,
                image_url: tempImage
            }));
            setShowImageConfirm(false);
            setTempImage(null);
        }
    };

    const handleCancelImageChange = () => {
        setTempImage(null);
        setImagePreview(null);
        setFormData(prevState => ({
            ...prevState,
            image_url: null
        }));
        setShowImageConfirm(false);
    };

    const handleCreateProjectViewSubmit = (e) => {
        e.preventDefault();

        if (loadingCreatingProjectView) return;

        const { view_title, view_description, view_link, image_url } = formData;

        if (!view_title || !view_description || !view_link || !image_url) {
            return toast.error("All fields are required");
        }

        const formDataToSend = new FormData();
        formDataToSend.append('view_title', view_title);
        formDataToSend.append('view_description', view_description);
        formDataToSend.append('view_link', view_link);
        formDataToSend.append('image', image_url);

        dispatch(createProjectView({ data: formDataToSend }));
    };

    useEffect(() => {
        if (isProjectViewCreated) {
            handleModalClose();
            dispatch(clearCreateProjectView());
            dispatch(getProjectView({ page, limit: 6 }));
        } else if (errorCreatingProjectView) {
            dispatch(clearCreateProjectView());
        }
    }, [isProjectViewCreated, errorCreatingProjectView]);

    const handleUpdateProjectView = (id) => {
        if (loadingUpdatingProjectView) return;

        if (!selectedProjectView.view_title || !selectedProjectView.view_description || !selectedProjectView.view_link) {
            return toast.error("All fields are required");
        }

        const data = {
            view_title: selectedProjectView.view_title,
            view_description: selectedProjectView.view_description,
            view_link: selectedProjectView.view_link
        };

        dispatch(updateProjectView({ id, data }));
    };

    const handleUpdateImage = (id) => {
        if (loadingUpdatingProjectViewImage) return;

        if (!selectedImage) {
            return toast.error("Please select an image first");
        }

        const imageData = new FormData();
        imageData.append('image', selectedImage);
        dispatch(updateProjectViewImage({ id, image: imageData }));
    };

    useEffect(() => {
        if (isProjectViewUpdated) {
            toast.success("Project view updated successfully");
            dispatch(clearUpdateProjectView());
            dispatch(getProjectView({ page, limit: 6 }));
            handleEditClose();
        } else if (errorUpdatingProjectView) {
            dispatch(clearUpdateProjectView());
        }
    }, [isProjectViewUpdated, errorUpdatingProjectView]);

    useEffect(() => {
        if (isProjectViewImageUpdated) {
            toast.success("Project image updated successfully");
            dispatch(clearUpdateProjectViewImage());
            dispatch(getProjectView({ page, limit: 6 }));
            setSelectedImage(null);
            setImagePreview(null);
        } else if (errorUpdatingProjectViewImage) {
            toast.error("Failed to update project image");
            dispatch(clearUpdateProjectViewImage());
        }
    }, [isProjectViewImageUpdated, errorUpdatingProjectViewImage]);

    const handleDeleteProjectView = (id) => {
        if (loadingDeletingProjectView) return;

        dispatch(deleteProjectView({ id }))
            .then(() => {
                setIsDeleteOpen(false);
                setDeletingProjectViewId(null);
                dispatch(getProjectView({ page, limit: 6 }));
            })
            .catch((error) => {
                console.error("Error deleting project view:", error);
                toast.error("Failed to delete project view");
            });
    };

    useEffect(() => {
        if (isProjectViewDeleted) {
            toast.success("Project view deleted successfully");
            dispatch(clearDeleteProjectView());
            dispatch(getProjectView({ page, limit: 6 }));
        } else if (errorDeletingProjectView) {
            toast.error("Failed to delete project view");
            dispatch(clearDeleteProjectView());
        }
    }, [isProjectViewDeleted, errorDeletingProjectView]);


    const columns = [
        {
            label: "Image",
            render: (item) => {
                return (
                    <img
                        src={`${config.API_BASE_URL}/${item.image_url}`}
                        alt={item.view_title}
                        className="h-20 w-20  rounded-lg overflow-hidden object-cover"
                    />
                )
            }
        },
        {
            label: "Title",
            field: "view_title"
        },
        {
            label: "Description",
            field: "view_description"
        },
        {
            label: "Link",
            render: (item) => {
                return (
                    <a href={item.view_link} target="_blank" rel="noopener noreferrer">View Project</a>
                )
            }
        },
    ]

    return (
        <AdminLayout>
            <div
                className="rounded-lg shadow p-4 md:p-6 h-[90vh] flex flex-col text-white"
                style={{ backgroundColor: "var(--color-navy-dark)" }}
            >
                <DashboardHeader title="Project Views" onAddClick={() => setIsModalOpen(true)} buttonText="Add New View" />


                <DataTable
                    data={projectViews}
                    columns={columns}
                    loading={loadingProjectViews}
                    error={errorProjectViews}
                    actions={{
                        edit: (item) => {
                            setIsEditOpen(true);
                            setSelectedProjectView(item);
                        },
                        delete: (item) => {
                            setIsDeleteOpen(true);
                            setDeletingProjectViewId(item.id);
                        },

                    }}
                />

                <div className="mt-auto pt-4 border-t border-gray-600">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    {totalRecords > 0 && (
                        <div className="text-center text-sm text-gray-300 mt-2">
                            Showing {Math.min((page - 1) * itemsPerPage + 1, totalRecords)} to{" "}
                            {Math.min(page * itemsPerPage, totalRecords)} of {totalRecords} views
                        </div>
                    )}
                </div>
            </div>

            <AddProjectViewModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                formData={formData}
                onInputChange={handleInputChange}
                onImageChange={handleImageChange}
                imagePreview={imagePreview}
                onSubmit={handleCreateProjectViewSubmit}
                loadingCreatingProjectView={loadingCreatingProjectView}
            />

            <EditProjectViewModal
                isOpen={isEditOpen}
                onClose={handleEditClose}
                selectedProjectView={selectedProjectView}
                setSelectedProjectView={setSelectedProjectView}
                onImageChange={handleImageChange}
                imagePreview={imagePreview}
                onUpdateProjectView={handleUpdateProjectView}
                onUpdateImage={handleUpdateImage}
                loadingUpdatingProjectView={loadingUpdatingProjectView}
                loadingUpdatingProjectViewImage={loadingUpdatingProjectViewImage}
                showImageConfirm={showImageConfirm}
                onConfirmImageChange={handleConfirmImageChange}
                onCancelImageChange={handleCancelImageChange}
            />

            
            {isDeleteOpen && deletingProjectViewId && (
                <DeleteModal
                    title="Delete Project View"
                    message="Are you sure you want to delete this project view?"
                    handleDelete={() => handleDeleteProjectView(deletingProjectViewId)}
                    loading={loadingDeletingProjectView}
                    setIsDeleteOpen={setIsDeleteOpen}
                    setSelectedItem={setDeletingProjectViewId}
                />
            )}
        </AdminLayout>
    );
};

export default ProjectViewDashboard;