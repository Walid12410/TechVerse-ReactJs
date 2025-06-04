import { X } from "lucide-react";
import config from "../../utils/config";

const ViewDetailsModel = ({
    handleDetailsClose,
    selectedService
}) => {
    return ( 
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto p-4 ">
        <div className=" shadow-2xl rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative space-y-6"
          style={{ backgroundColor: 'var(--color-navy)' }}>

          <button
            onClick={handleDetailsClose}
            className="absolute top-4 right-4 transition text-white"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold mb-4 text-white">
            Service Details
          </h2>

          <img
            src={`${config.API_BASE_URL}/${selectedService?.image_url}`}
            alt={selectedService?.service_name}
            className="h-auto w-full object-cover rounded-lg mb-4"
          />

          <p className="text-lg font-medium mb-2 text-white" >
            {selectedService?.service_name}
          </p>

          <p className="mb-4 text-white" >
            {selectedService?.service_description}
          </p>

          {selectedService.details?.length > 0 ? (
            <div className="space-y-2">
              <h3 className="font-semibold text-white" >
                Details:
              </h3>
              <ul className="list-disc list-inside text-white">
                {selectedService.details.map((detail) => (
                  <li key={detail.id}>{detail?.detail_description}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="italic">
              No additional details available.
            </p>
          )}
        </div>
      </div>

     );
}
 
export default ViewDetailsModel;