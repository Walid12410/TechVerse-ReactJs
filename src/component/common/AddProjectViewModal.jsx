import React from 'react';
import { X } from "lucide-react";

const AddProjectViewModal = ({
    isOpen,
    onClose,
    formData,
    onInputChange,
    onImageChange,
    imagePreview,
    onSubmit,
    loadingCreatingProjectView
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8" style={{ backgroundColor: "var(--color-navy)" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Add New Project View</h2>
                    <button
                        onClick={onClose}
                        className="transition"
                        style={{ color: '#888' }}
                        onMouseEnter={(e) => (e.target.style.color = '#555')}
                        onMouseLeave={(e) => (e.target.style.color = '#888')}
                    >
                        <X size={22} />
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">View Title</label>
                        <input
                            type="text"
                            name="view_title"
                            value={formData.view_title}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                            style={{ borderColor: '#ccc' }}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Description</label>
                        <textarea
                            name="view_description"
                            value={formData.view_description}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm h-24 resize-none text-white"
                            style={{ borderColor: '#ccc' }}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Project Link</label>
                        <input
                            type="url"
                            name="view_link"
                            value={formData.view_link}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                            style={{ borderColor: '#ccc' }}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Project Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onImageChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                            style={{ borderColor: '#ccc' }}
                            required
                        />
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loadingCreatingProjectView}
                            className="font-medium px-5 py-2 rounded-lg shadow-md transition"
                            style={{
                                backgroundColor: 'var(--color-purple)',
                                color: '#fff',
                                border: 'none',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#b69ac7')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--color-purple)')}
                        >
                            {loadingCreatingProjectView ? "Creating..." : "Add View"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectViewModal; 