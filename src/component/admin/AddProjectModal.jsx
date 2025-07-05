import React from 'react';
import { X } from "lucide-react";

const AddProjectModal = ({
    isOpen,
    onClose,
    formData,
    onInputChange,
    onImageChange,
    imagePreview,
    onSubmit,
    loadingCreatingProject,
    clients
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="shadow-2xl rounded-2xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "var(--color-navy)" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Add New Project</h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Client *</label>
                            <select
                                name="client_id"
                                value={formData.client_id}
                                onChange={onInputChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                                style={{ borderColor: '#ccc', backgroundColor: 'rgba(255,255,255,0.1)' }}
                                required
                            >
                                <option value="">Select a client</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id} className='text-black'>
                                        {client.first_name} {client.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Project Name *</label>
                            <input
                                type="text"
                                name="project_name"
                                value={formData.project_name}
                                onChange={onInputChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                                style={{ borderColor: '#ccc', backgroundColor: 'rgba(255,255,255,0.1)' }}
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Project Description *</label>
                        <textarea
                            name="project_description"
                            value={formData.project_description}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm h-24 resize-none text-white"
                            style={{ borderColor: '#ccc', backgroundColor: 'rgba(255,255,255,0.1)' }}
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Project Cost *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="project_cost"
                                value={formData.project_cost}
                                onChange={onInputChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                                style={{ borderColor: '#ccc', backgroundColor: 'rgba(255,255,255,0.1)' }}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Start Date *</label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={onInputChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                                style={{ borderColor: '#ccc', backgroundColor: 'rgba(255,255,255,0.1)' }}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">End Date *</label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={onInputChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                                style={{ borderColor: '#ccc', backgroundColor: 'rgba(255,255,255,0.1)' }}
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Project Image *</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onImageChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                            style={{ borderColor: '#ccc', backgroundColor: 'rgba(255,255,255,0.1)' }}
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
                    
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="font-medium px-5 py-2 rounded-lg shadow-md transition border"
                            style={{
                                borderColor: '#888',
                                color: '#888',
                                backgroundColor: 'transparent',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.borderColor = '#555';
                                e.target.style.color = '#555';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.borderColor = '#888';
                                e.target.style.color = '#888';
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loadingCreatingProject}
                            className="font-medium px-5 py-2 rounded-lg shadow-md transition"
                            style={{
                                backgroundColor: 'var(--color-purple)',
                                color: '#fff',
                                border: 'none',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#b69ac7')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--color-purple)')}
                        >
                            {loadingCreatingProject ? "Creating..." : "Add Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal; 