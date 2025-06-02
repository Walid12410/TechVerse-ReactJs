const EditImageService = ({
    handleConfirmImageChange,
    loadingChangingServiceImage,
    handleCancelImageChange
}) => {
    return ( 
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="shadow-2xl rounded-xl w-full max-w-md p-6 relative space-y-6" style={{ backgroundColor: "var(--color-navy)" }}>
          <h2 className="text-xl font-bold text-white text-center">Change Image</h2>
          <p className="text-white text-center">Are you sure you want to change the image?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirmImageChange}
              className="text-white font-medium px-5 py-2 rounded-lg shadow-md"
              style={{ backgroundColor: "var(--color-purple)" }}
            >
              {loadingChangingServiceImage ? "Changing..." : "Confirm"}
            </button>
            <button
              onClick={handleCancelImageChange}
              className="text-white font-medium px-5 py-2 rounded-lg shadow-md"
              style={{ backgroundColor: "var(--color-purple)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

     );
}
 
export default EditImageService;