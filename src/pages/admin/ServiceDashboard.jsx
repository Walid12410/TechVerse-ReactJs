import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreatingService,
  clearCreatingServiceDetails,
  clearDeleteServiceDetails,
  clearUpdateService,
  clearChangingServiceImage,
  createService,
  createServiceDetails,
  deleteServiceDetail,
  getServices,
  updateService,
  changeServiceImage,
  deleteService,
  clearServiceDelete
} from "../../redux/slices/serviceSlice";
import Pagination from "../../component/common/Pagination";
import { toast } from "react-toastify";
import AdminLayout from "../../component/layout/AdminLayout";
import ServiceTable from "../../component/common/services/ServiceTable";
import ServiceHeader from "../../component/common/services/ServiceHeader";
import AddServiceModel from "../../component/common/services/AddServiceModel";
import ViewDetailsModel from "../../component/common/services/ViewDetailsModel";
import EditServiceModel from "../../component/common/services/EditServiceModel";
import DeleteServiceModel from "../../component/common/services/DeleteServiceModel";
import EditImageService from "../../component/common/services/EditImageService";


const ServiceDashboard = () => {

  const dispatch = useDispatch();

  const {
    services,
    loadingServices,
    errorServices,
    totalPages,
    totalRecords,
    itemsPerPage,
    isCreated,
    loadingCreating,
    errorCreating,
    loadingCreatedServiceDetail,
    isServiceDetailCreated,
    errorCreatingServiceDetail,
    isServiceDetailDeleting,
    loadingDeletingServiceDetail,
    errorDeleteServiceDetail,
    loadingUpdatingService,
    errorUpdateService,
    isServiceUpdating,
    isServiceImageChanging,
    loadingChangingServiceImage,
    errorChangingServiceImage,
    isServiceDeleted,
    loadingDeleteService,
    errorDeletingService
  } = useSelector((state) => state.services);

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isImageChangeOpen, setIsImageChangeOpen] = useState(false);

  const [selectedService, setSelectedService] = useState(null);
  const [DetailsDescription, setDetailDescription] = useState("");
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  const [tempImageFile, setTempImageFile] = useState(null);

  const [formData, setFormData] = useState({
    service_name: "",
    service_description: "",
    image: null,
  });


  useEffect(() => {
    dispatch(getServices({ page, limit: 10 }));
  }, [dispatch, page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleModalClose = () => {
    if (loadingCreating) return;
    setIsModalOpen(false);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setSelectedService(null);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
    setSelectedService(null);
  };


  const handleViewDetails = (service) => {
    setSelectedService(service);
    setIsDetailsOpen(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsEditOpen(true);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleCreateServiceSubmit = (e) => {
    e.preventDefault();

    if (loadingCreating) return;

    const { service_name, service_description, image } = formData;

    if (!service_name || !service_description || !image) {
      return toast.error("All fields are required");
    }

    if (service_name.length > 50) {
      return toast.error("Service name must be 50 characters or fewer");
    }

    dispatch(createService({ serviceData: formData }));
  };


  useEffect(() => {
    if (isCreated) {
      handleModalClose();
      dispatch(clearCreatingService());
      dispatch(getServices({ page: 1, limit: 10 }));
      // Clear form data after successful creation
      setFormData({
        service_name: "",
        service_description: "",
        image: null,
      });
    } else if (errorCreating) {
      dispatch(clearCreatingService());
    }
  }, [isCreated, errorCreating]);


  const handleCreateServiceDetailSubmit = (e) => {
    e.preventDefault();

    if (loadingCreatedServiceDetail) return;


    if (!DetailsDescription) {
      return toast.error("fields required");
    }

    if (DetailsDescription.length > 200) {
      return toast.error("Service detail must be 200 characters or fewer");
    }

    const data = {
      "service_id": selectedService.id,
      "detail_description": DetailsDescription
    }

    dispatch(createServiceDetails({ serviceDetailsData: data }));

    // Optimistically update UI
    const tempId = Date.now(); // temporary unique ID
    const tempDetail = {
      id: tempId,
      detail_description: DetailsDescription,
    };

    setSelectedService(prev => ({
      ...prev,
      details: [...prev.details, tempDetail],
    }));

    setDetailDescription(""); // clear input
  };

  useEffect(() => {
    if (isServiceDetailCreated) {
      toast.success("Detail added successfully!");
      dispatch(clearCreatingServiceDetails());
      setDetailDescription("");
    } else if (errorCreatingServiceDetail) {
      dispatch(clearCreatingServiceDetails());
      setDetailDescription("");
    }
  }, [isServiceDetailCreated, errorCreatingServiceDetail]);


  const handleRemoveDetail = (id) => {
    // Prevent triggering again if another delete is in progress
    if (loadingDeletingServiceDetail) return;


    dispatch(deleteServiceDetail({ id }))
      .then(() => {
        // After successful deletion, update local state
        setSelectedService(prev => ({
          ...prev,
          details: prev.details.filter(detail => detail.id !== id),
        }));
      })
      .catch((error) => {
        console.error("Error deleting detail:", error);
      });
  };

  const handleImageChangeClick = (e) => {
    setTempImageFile(e.target.files[0]);
    setIsImageChangeOpen(true);
  };

  const handleConfirmImageChange = () => {
    if (loadingChangingServiceImage) return;

    if (!tempImageFile) {
      return toast.error("Please select an image");
    }

    const formData = new FormData();
    formData.append("image", tempImageFile);


    dispatch(changeServiceImage({ id: selectedService.id, formDataImage: formData }));


    setIsImageChangeOpen(false);
    setTempImageFile(null);
  };


  useEffect(() => {
    if (isServiceImageChanging) {
      toast.success("Image changed successfully");
      dispatch(clearChangingServiceImage());
      dispatch(getServices({ page, limit: 10 }));
      handleEditClose();
    } else if (errorChangingServiceImage) {
      dispatch(clearChangingServiceImage());
    }
  }, [isServiceImageChanging, errorChangingServiceImage]);

  const handleCancelImageChange = () => {
    setIsImageChangeOpen(false);
    setTempImageFile(null);
  };

  useEffect(() => {
    if (isServiceDetailDeleting) {
      toast.success("Details remove successfully"); +
        dispatch(getServices({ page, limit: 10 }));
      dispatch(clearDeleteServiceDetails());
    } else if (errorDeleteServiceDetail) {
      dispatch(clearDeleteServiceDetails());
    }
  }, [isServiceDetailDeleting, errorDeleteServiceDetail]);


  const handleUpdateService = (id) => {
    if (loadingUpdatingService) return;

    if (selectedService.service_name === "" || !selectedService.service_description === "") {
      return toast.error("fields can not be empty!");
    }

    if (selectedService.service_name.length > 50) {
      return toast.error("Service name must be 50 characters or fewer");
    }



    const data = {
      "service_name": selectedService.service_name,
      "service_description": selectedService.service_description
    }

    dispatch(updateService({ id, updateData: data }));
  };

  useEffect(() => {
    if (isServiceUpdating) {
      toast.success("Service update successfully");
      dispatch(clearUpdateService());
      dispatch(getServices({ page, limit: 10 }));
    } else if (errorUpdateService) {
      dispatch(clearUpdateService());
      dispatch(getServices({ page, limit: 10 }));
    }
  }, [isServiceUpdating, errorUpdateService]);

  const handleDeleteService = () => {
    if (loadingDeleteService) return;

    dispatch(deleteService({ id: deletingServiceId }));
  }

  useEffect(() => {
    if (isServiceDeleted) {
      toast.success("Service Deleted successfully");
      dispatch(clearServiceDelete());
      dispatch(getServices({ page, limit: 10 }));
      setDeletingServiceId(null);
      setIsDeleteOpen(false);
    } else if (errorDeletingService) {
      setDeletingServiceId(null);
      setIsDeleteOpen(false);
    }
  })

  return (
    <AdminLayout>
      <div
        className="rounded-lg shadow p-4 md:p-6 h-[90vh] flex flex-col text-white"
        style={{ backgroundColor: "var(--color-navy-dark)" }}
      >

        <ServiceHeader setIsModalOpen={setIsModalOpen} />

        <ServiceTable
          loadingServices={loadingServices}
          errorServices={errorServices}
          services={services}
          handleViewDetails={handleViewDetails}
          handleEdit={handleEdit}
          setIsDeleteOpen={setIsDeleteOpen}
          setDeletingServiceId={setDeletingServiceId}
        />

        <div className="mt-auto pt-4 border-t border-gray-600">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          {totalRecords > 0 && (
            <div className="text-center text-sm text-gray-300 mt-2">
              Showing {Math.min((page - 1) * itemsPerPage + 1, totalRecords)} to{" "}
              {Math.min(page * itemsPerPage, totalRecords)} of {totalRecords} services
            </div>
          )}
        </div>
      </div>

      {/* Add Service Modal */}
      {isModalOpen && (
        <AddServiceModel
          handleModalClose={handleModalClose}
          handleCreateServiceSubmit={handleCreateServiceSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          loadingCreating={loadingCreating}
        />
      )}


      {/* View Details Modal */}
      {isDetailsOpen && selectedService && (
        <ViewDetailsModel
          handleDetailsClose={handleDetailsClose}
          selectedService={selectedService}
        />
      )}


      {isEditOpen && selectedService && (
        <EditServiceModel
          handleEditClose={handleEditClose}
          handleImageChangeClick={handleImageChangeClick}
          handleUpdateService={handleUpdateService}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          loadingUpdatingService={loadingUpdatingService}
          handleCreateServiceDetailSubmit={handleCreateServiceDetailSubmit}
          DetailsDescription={DetailsDescription}
          setDetailDescription={setDetailDescription}
          loadingCreatedServiceDetail={loadingCreatedServiceDetail}
          handleRemoveDetail={handleRemoveDetail}
          loadingDeletingServiceDetail={loadingDeletingServiceDetail}
          deletingDetailId={deleteServiceDetail}
        />
      )}

      {isDeleteOpen && (
        <DeleteServiceModel
          handleDeleteService={handleDeleteService}
          loadingDeleteService={loadingDeleteService}
          setIsDeleteOpen={setIsDeleteOpen}
          setDeletingServiceId={setDeletingServiceId}
        />
      )}

      {isImageChangeOpen && (
        <EditImageService
          handleConfirmImageChange={handleConfirmImageChange}
          loadingChangingServiceImage={loadingChangingServiceImage}
          handleCancelImageChange={handleCancelImageChange}
        />
      )}
    </AdminLayout>
  );
};

export default ServiceDashboard;
