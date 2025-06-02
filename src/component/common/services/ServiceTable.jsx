import { Trash2, Edit, Eye } from "lucide-react";
import config from "../../../utils/config";

const ServiceTable = ({
    loadingServices,
    errorServices,
    services,
    handleViewDetails,
    handleEdit,
    setIsDeleteOpen,
    setDeletingServiceId
}) => {
    return ( 
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full text-left border rounded-lg overflow-hidden">
            <thead className="text-white">
              <tr>
                <th className="px-3 md:px-4 py-2 text-sm">ID</th>
                <th className="px-3 md:px-4 py-2 text-sm">Name</th>
                <th className="px-3 md:px-4 py-2 text-sm">Description</th>
                <th className="px-3 md:px-4 py-2 text-sm">Image</th>
                <th className="px-3 md:px-4 py-2 text-center text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadingServices ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">Loading services...</td>
                </tr>
              ) : errorServices ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-red-500">Error loading services</td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">No services found</td>
                </tr>
              ) : (
                services.map((service, idx) => (
                  <tr
                    key={service.id}
                    className={`border-t border-gray-200 hover:bg-gray-700 transition duration-150 ${idx % 2 === 1 ? "bg-gray-800" : ""}`}
                  >
                    <td className="px-3 md:px-4 py-2 text-sm">{idx + 1}</td>
                    <td className="px-3 md:px-4 py-2 font-medium text-sm">{service?.service_name}</td>
                    <td className="px-3 md:px-4 py-2 text-sm">{service?.service_description}</td>
                    <td className="px-3 md:px-4 py-2">
                      {service.image_url ? (
                        <img
                          src={`${config.API_BASE_URL}/${service.image_url}`}
                          alt={service?.service_name}
                          className="h-10 w-10 md:h-12 md:w-12 object-cover rounded border"
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td className="px-3 md:px-4 py-2 text-center">
                      <div className="flex justify-center gap-2 md:gap-3">
                        <button
                          onClick={() => handleViewDetails(service)}
                          className="text-blue-300 hover:text-blue-500 cursor-pointer"
                          title="Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setIsDeleteOpen(true);
                            setDeletingServiceId(service.id);
                          }}
                          className="text-red-400 hover:text-red-600 cursor-pointer" title="Delete">
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
 
export default ServiceTable;