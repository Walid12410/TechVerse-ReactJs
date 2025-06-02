const DeleteServiceModel = ({
    handleDeleteService,
    loadingDeleteService,
    setIsDeleteOpen,
    setDeletingServiceId
}) => {
    return ( 
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto p-4 ">
        <div className=" shadow-2xl rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative space-y-6"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <h2 className="text-2xl font-bold text-white text-center">Delete Service</h2>
          <p className="text-white text-center">Are you sure you want to delete this service?</p>
          <div className="flex justify-center">
            <button
              onClick={() => handleDeleteService()}
              className="text-white font-medium px-5 py-2 rounded-lg shadow-md" style={{ backgroundColor: "var(--color-purple)" }}>
              {loadingDeleteService ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={() => {
                setIsDeleteOpen(false);
                setDeletingServiceId(null);
              }}
              className="text-white font-medium ml-2 px-5 py-2 rounded-lg shadow-md" style={{ backgroundColor: "var(--color-purple)" }}>Cancel</button>
          </div>
        </div>
      </div>

     );
}
 
export default DeleteServiceModel;