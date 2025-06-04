import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../component/layout/AdminLayout";
import { 
    clearFeatureCreate,
    clearFeatureDelete,
    getServicesFeature,
    createServiceFeature,
    deleteServiceFeature,
    getServices
} from "../../redux/slices/serviceSlice";
import AddFeatureModal from "../../component/admin/AddFeatureModal";
import { toast } from "react-toastify";
import DashboardHeader from "../../component/admin/DashboardHeader";
import DataTable from "../../component/admin/DataTable";
import config from "../../utils/config";
import DeleteModal from "../../component/admin/DeleteModal";

const ServiceFeatureDashboard = () => {
    const dispatch = useDispatch();
    const {
        serviceFeature,
        loadingServiceFeature,
        errorServiceFeature,
        isFeatureCreate,
        loadingFeatureCreate,   
        errorFeatureCreate,
        isFeatureDelete,
        loadingFeatureDelete,
        errorFeatureDelete,
        services
    } = useSelector(state => state.services);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(null);

    useEffect(() => {
        dispatch(getServicesFeature());
        dispatch(getServices({ page: 1, limit: 1000 })); // Get all services for the dropdown
    }, [dispatch]);

    useEffect(() => {
        if (isFeatureCreate) {
            toast.success("Feature added successfully!");
            dispatch(clearFeatureCreate());
            dispatch(getServicesFeature());
            setIsModalOpen(false);
        } else if (errorFeatureCreate) {
            toast.error(errorFeatureCreate);
            dispatch(clearFeatureCreate());
        }
    }, [isFeatureCreate, errorFeatureCreate, dispatch]);

    useEffect(() => {
        if (isFeatureDelete) {
            toast.success("Feature deleted successfully!");
            dispatch(clearFeatureDelete());
            dispatch(getServicesFeature());
            setIsDeleteOpen(false);
            setSelectedFeature(null);
        } else if (errorFeatureDelete) {
            toast.error(errorFeatureDelete);
            dispatch(clearFeatureDelete());
        }
    }, [isFeatureDelete, errorFeatureDelete, dispatch]);

    const handleAddFeature = (serviceId) => {
        if (loadingFeatureCreate) return;
    
        // Default to an empty array if serviceFeature is undefined
        const currentFeatures = serviceFeature || [];
    
    
        // Check if feature limit is reached
        if (currentFeatures.length >= 3) {
            toast.error("Maximum of 3 features allowed");
            return;
        }
    
        // Check if the service is already added
        const isAlreadyAdded = currentFeatures.some(feature => feature.service_id === serviceId.toString());
        if (isAlreadyAdded) {
            toast.error("This service is already added as a feature");
            return;
        }
    
        // Proceed to add the feature
        dispatch(createServiceFeature({ data: { service_id: serviceId } }));
    };
    
    const handleDeleteFeature = () => {
        if (loadingFeatureDelete) return;
        dispatch(deleteServiceFeature({ id: selectedFeature.id }));
    };


    const columns = [
        {
          label: "Name",
          render: (item) => (
            <div>
              {item.service.service_name}
            </div>
          ),
        },
        {
          label: "Description",
          render: (item) => (
            <div >
              {item.service.service_description}
            </div>
          ),
        },
        {
          label: "Image",
          render: (item) => (
            <img
              src={`${config.API_BASE_URL}/${item.service.image_url}`}
              alt={item.service_name}
              className="h-10 w-10 rounded object-cover"
            />
          ),
        },
      ];
    return (
        <AdminLayout>
            <div
                className="rounded-lg shadow p-4 md:p-6 h-[90vh] flex flex-col text-white"
                style={{ backgroundColor: "var(--color-navy-dark)" }}
            >
                <DashboardHeader title="Service Features" onAddClick={() => setIsModalOpen(true)} buttonText="Add New Feature" />


                <DataTable
                    loading={loadingServiceFeature}
                    error={errorServiceFeature}
                    data={serviceFeature}
                    columns={columns}
                    actions={{
                        delete: (item) => {
                            setIsDeleteOpen(true);
                            setSelectedFeature(item);
                        },
                    }}
                />

            {isDeleteOpen && selectedFeature && (
                <DeleteModal
                    title="Delete Feature"
                    message="Are you sure you want to delete this feature?"
                    handleDelete={handleDeleteFeature}
                    loading={loadingFeatureDelete}
                    setIsDeleteOpen={setIsDeleteOpen}
                    setSelectedItem={setSelectedFeature}
                />
            )}
                    
            </div>


            {isModalOpen && (
                <AddFeatureModal
                    handleModalClose={() => setIsModalOpen(false)}
                    handleAddFeature={handleAddFeature}
                    services={services}
                    loadingFeatureCreate={loadingFeatureCreate}
                    features={serviceFeature}
                />
            )}
        </AdminLayout>
    );
}

export default ServiceFeatureDashboard;