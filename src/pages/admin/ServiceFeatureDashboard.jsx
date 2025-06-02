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
import FeatureTable from "../../component/common/services/FeatureTable";
import FeatureHeader from "../../component/common/services/FeatureHeader";
import AddFeatureModal from "../../component/common/services/AddFeatureModal";
import { toast } from "react-toastify";

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
    
    const handleDeleteFeature = (id) => {
        if (loadingFeatureDelete) return;
        dispatch(deleteServiceFeature({ id }));
    };

    return (
        <AdminLayout>
            <div
                className="rounded-lg shadow p-4 md:p-6 h-[90vh] flex flex-col text-white"
                style={{ backgroundColor: "var(--color-navy-dark)" }}
            >
                <FeatureHeader setIsModalOpen={setIsModalOpen} />

                <FeatureTable
                    loadingFeatures={loadingServiceFeature}
                    errorFeatures={errorServiceFeature}
                    features={serviceFeature}
                    handleDeleteFeature={handleDeleteFeature}
                />
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