import { Trash2 } from "lucide-react";
import config from "../../../utils/config";

const FeatureTable = ({
    loadingFeatures,
    errorFeatures,
    features,
    handleDeleteFeature
}) => {
    return ( 
        <div className="overflow-x-auto flex-grow">
            <table className="min-w-full text-left border rounded-lg overflow-hidden">
                <thead className="text-white">
                    <tr>
                        <th className="px-3 md:px-4 py-2 text-sm">ID</th>
                        <th className="px-3 md:px-4 py-2 text-sm">Service Name</th>
                        <th className="px-3 md:px-4 py-2 text-sm">Description</th>
                        <th className="px-3 md:px-4 py-2 text-sm">Image</th>
                        <th className="px-3 md:px-4 py-2 text-center text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loadingFeatures ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">Loading features...</td>
                        </tr>
                    ) : errorFeatures ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-red-500">Error loading features</td>
                        </tr>
                    ) : !features || features.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No features found</td>
                        </tr>
                    ) : (
                        features.map((feature, idx) => (
                            <tr
                                key={feature.id}
                                className={`border-t border-gray-200 hover:bg-gray-700 transition duration-150 ${idx % 2 === 1 ? "bg-gray-800" : ""}`}
                            >
                                <td className="px-3 md:px-4 py-2 text-sm">{idx + 1}</td>
                                <td className="px-3 md:px-4 py-2 font-medium text-sm">
                                    {feature.service.service_name}
                                </td>
                                <td className="px-3 md:px-4 py-2 text-sm">
                                    {feature.service.service_description}
                                </td>
                                <td className="px-3 md:px-4 py-2">
                                    {feature.service.image_url ? (
                                        <img
                                            src={`${config.API_BASE_URL}/${feature.service.image_url}`}
                                            alt={feature.service.name}
                                            className="h-10 w-10 md:h-12 md:w-12 object-cover rounded border"
                                        />
                                    ) : (
                                        "No image"
                                    )}
                                </td>
                                <td className="px-3 md:px-4 py-2 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleDeleteFeature(feature.id)}
                                            className="text-red-400 hover:text-red-600 cursor-pointer"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default FeatureTable; 