import config from "../../utils/config";
import {X} from "lucide-react";


const EditServiceModel = ({
    handleEditClose,
    handleImageChangeClick,
    handleUpdateService,
    selectedService,
    setSelectedService,
    loadingUpdatingService,
    handleCreateServiceDetailSubmit,
    DetailsDescription,
    setDetailDescription,
    loadingCreatedServiceDetail,
    handleRemoveDetail,
    loadingDeletingServiceDetail,
    deletingDetailId
}) => {
    return ( 
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto p-4 ">
        <div className=" shadow-2xl rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative space-y-6"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          {/* Close Button */}
          <button
            onClick={handleEditClose}
            className="absolute top-4 right-4 text-white"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-white text-center">Edit Service</h2>

          {/* Image Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={`${config.API_BASE_URL}/${selectedService?.image_url}`}
              alt={selectedService?.service_name}
              className="w-full h-auto object-fill rounded-lg shadow"
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-white mb-1">Change Image</label>
              <input
                type="file"
                onChange={handleImageChangeClick}
                className="w-full text-sm file:py-2 file:px-4 file:border-0 file:rounded-lg transition text-white rounded-2xl border-1"
                accept="image/*"
              />
            </div>
          </div>

          {/* Service Name & Description Fields */}
          <h2 className="text-2xl font-bold text-white text-start">Service Field</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateService(selectedService.id);
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-white mb-1">Service Name</label>
              <input
                type="text"
                name="service_name"
                value={selectedService?.service_name || ""}
                onChange={(e) =>
                  setSelectedService((prev) => ({
                    ...prev,
                    service_name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-white rounded-lg shadow-sm text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Description</label>
              <textarea
                name="service_description"
                value={selectedService?.service_description || ""}
                onChange={(e) =>
                  setSelectedService((prev) => ({
                    ...prev,
                    service_description: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-white rounded-lg text-white shadow-sm h-24 resize-none"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white font-medium px-5 py-2 rounded-lg shadow-md"
                style={{ backgroundColor: "var(--color-purple)" }}
              >
                {loadingUpdatingService ? "Updating..." : "Update Fields"}
              </button>
            </div>
          </form>

          {/* Details Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Details:</h3>

            {/* Add Description Section */}
            <form onSubmit={handleCreateServiceDetailSubmit} className="flex space-x-4">
              <input
                type="text"
                value={DetailsDescription}
                onChange={(e) => setDetailDescription(e.target.value)}
                className="w-full px-4 py-2 border border-white rounded-lg shadow-sm text-white"
                placeholder="Add new detail description"
              />
              <button
                type="submit"
                className="text-white px-4 py-2 rounded-lg shadow-md "
                style={{ backgroundColor: "var(--color-purple)" }}
              >
                {loadingCreatedServiceDetail ? "Adding..." : "Add"}
              </button>
            </form>

            {selectedService.details?.length > 0 ? (
              <ul className="list-disc list-inside text-white space-y-2">
                {selectedService.details.map((detail) => (
                  <li key={detail.id} className="flex justify-between items-center pl-2 pr-2">
                    <span>{detail.detail_description}</span>
                    <button
                      onClick={() => handleRemoveDetail(detail.id)}
                      disabled={loadingDeletingServiceDetail && deletingDetailId === detail.id}
                      className={`text-red-600 hover:text-red-800 ${loadingDeletingServiceDetail && deletingDetailId === detail.id
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                        }`}
                    >
                      {loadingDeletingServiceDetail && deletingDetailId === detail.id ? "Deleting..." : <X size={16} />}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white italic">No additional details available.</p>
            )}
          </div>

        </div>
      </div>

     );
}
 
export default EditServiceModel;