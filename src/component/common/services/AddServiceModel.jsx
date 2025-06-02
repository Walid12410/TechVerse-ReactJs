import { X } from "lucide-react";


const AddServiceModel = ({
    handleModalClose,
    handleCreateServiceSubmit,
    formData,
    handleInputChange,
    handleFileChange,
    loadingCreating
}) => {
    return ( 
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className=" shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8" style={{ backgroundColor: "var(--color-navy)" }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white" >
              Add Service
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

          <form onSubmit={handleCreateServiceSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-white" >
                Service Name
              </label>
              <input
                type="text"
                name="service_name"
                value={formData.service_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                style={{
                  borderColor: '#ccc',
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Description
              </label>
              <textarea
                name="service_description"
                value={formData.service_description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm h-24 resize-none text-white"
                style={{
                  borderColor: '#ccc',
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white" >
                Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm file:py-2 file:px-4 file:border-0 file:rounded-lg transition text-white rounded-2xl border-1"
                accept="image/*"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="font-medium px-5 py-2 rounded-lg shadow-md transition"
                style={{
                  backgroundColor: 'var(--color-purple)',
                  color: '#fff',
                  border: 'none',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#b69ac7')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--color-purple)')}
              >
                {loadingCreating ? 'Creating...' : 'Add Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
     );
}
 
export default AddServiceModel;