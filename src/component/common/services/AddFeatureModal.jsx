import { X } from "lucide-react";
import { useState, useEffect } from "react";
import config from "../../../utils/config";

const AddFeatureModal = ({
    handleModalClose,
    handleAddFeature,
    services,
    loadingFeatureCreate,
    features
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(() => {
        // Filter services based on search term
        const filtered = services.filter(service =>
            service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredServices(filtered);
    }, [searchTerm, services]);

    // Check if a service already has 3 features
    const hasMaxFeatures = (serviceId) => {
        return features?.filter(f => f.service_id === serviceId).length >= 3;
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8" style={{ backgroundColor: "var(--color-navy)" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                        Add Service Feature
                    </h2>
                    <button
                        onClick={handleModalClose}
                        className="transition"
                        style={{ color: '#888' }}
                        onMouseEnter={(e) => (e.target.style.color = '#555')}
                        onMouseLeave={(e) => (e.target.style.color = '#888')}
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border text-white"
                            style={{
                                backgroundColor: "var(--color-navy-medium)",
                                borderColor: "var(--color-navy-light)",
                            }}
                        />
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                        {filteredServices.map((service) => (
                            <div
                                key={service.id}
                                className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                                    hasMaxFeatures(service.id)
                                        ? 'bg-gray-700 cursor-not-allowed'
                                        : 'hover:bg-gray-700'
                                }`}
                                onClick={() => {
                                    if (!hasMaxFeatures(service.id)) {
                                        handleAddFeature(service.id);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    {service.image_url && (
                                        <img
                                            src={`${config.API_BASE_URL}/${service.image_url}`}
                                            alt={service.service_name}
                                            className="h-10 w-10 object-cover rounded"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-medium">{service.service_name}</span>
                                            {hasMaxFeatures(service.id) && (
                                                <span className="text-red-400 text-sm">Max features reached</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                            {service.service_description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFeatureModal; 