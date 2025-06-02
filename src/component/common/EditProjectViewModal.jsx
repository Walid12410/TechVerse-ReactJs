import React from 'react';
import { X } from "lucide-react";
import config from "../../utils/config";

const EditProjectViewModal = ({
    isOpen,
    onClose,
    selectedProjectView,
    setSelectedProjectView,
    onImageChange,
    imagePreview,
    onUpdateProjectView,
    onUpdateImage,
    loadingUpdatingProjectView,
    loadingUpdatingProjectViewImage,
    showImageConfirm,
    onConfirmImageChange,
    onCancelImageChange
}) => {
    if (!isOpen || !selectedProjectView) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto p-4">
            <div className="shadow-2xl rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative space-y-6"
                style={{ backgroundColor: "var(--color-navy)" }}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-white text-center">Edit Project View</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fields Form */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Update Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">View Title</label>
                            <input
                                type="text"
                                value={selectedProjectView.view_title}
                                onChange={(e) => setSelectedProjectView({...selectedProjectView, view_title: e.target.value})}
                                className="w-full px-4 py-2 border border-white rounded-lg shadow-sm text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">Description</label>
                            <textarea
                                value={selectedProjectView.view_description}
                                onChange={(e) => setSelectedProjectView({...selectedProjectView, view_description: e.target.value})}
                                className="w-full px-4 py-2 border border-white rounded-lg text-white shadow-sm h-24 resize-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">Project Link</label>
                            <input
                                type="url"
                                value={selectedProjectView.view_link}
                                onChange={(e) => setSelectedProjectView({...selectedProjectView, view_link: e.target.value})}
                                className="w-full px-4 py-2 border border-white rounded-lg shadow-sm text-white"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => onUpdateProjectView(selectedProjectView.id)}
                                disabled={loadingUpdatingProjectView}
                                className="text-white font-medium px-5 py-2 rounded-lg shadow-md"
                                style={{ backgroundColor: "var(--color-purple)" }}
                            >
                                {loadingUpdatingProjectView ? "Updating..." : "Update Information"}
                            </button>
                        </div>
                    </div>

                    {/* Image Form */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Update Image</h3>
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">Project Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onImageChange}
                                className="w-full px-4 py-2 border border-white rounded-lg shadow-sm text-white"
                                disabled={loadingUpdatingProjectViewImage}
                            />
                            {(imagePreview || selectedProjectView.image_url) && (
                                <div className="mt-4">
                                    <img
                                        src={imagePreview || `${config.API_BASE_URL}/${selectedProjectView.image_url}`}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            {imagePreview && (
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => onUpdateImage(selectedProjectView.id)}
                                        disabled={loadingUpdatingProjectViewImage}
                                        className="text-white font-medium px-5 py-2 rounded-lg shadow-md"
                                        style={{ backgroundColor: "var(--color-purple)" }}
                                    >
                                        {loadingUpdatingProjectViewImage ? "Updating Image..." : "Update Image"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Image Change Confirmation Modal */}
                {showImageConfirm && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                            <h3 className="text-xl font-semibold text-white mb-4">Confirm Image Change</h3>
                            <p className="text-gray-300 mb-6">Are you sure you want to change the project image?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={onCancelImageChange}
                                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                                    disabled={loadingUpdatingProjectViewImage}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirmImageChange}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    disabled={loadingUpdatingProjectViewImage}
                                >
                                    {loadingUpdatingProjectViewImage ? "Processing..." : "Confirm Change"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditProjectViewModal; 