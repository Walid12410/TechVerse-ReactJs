import React from 'react';
import { X } from "lucide-react";

const DeleteProjectViewModal = ({
    isOpen,
    onClose,
    onDelete,
    loadingDeletingProjectView
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8" style={{ backgroundColor: "var(--color-navy)" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Delete Project View</h2>
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
                <p className="text-gray-300 mb-6">Are you sure you want to delete this project view? This action cannot be undone.</p>
                <div className="flex justify-end">
                    <button
                        onClick={onDelete}
                        disabled={loadingDeletingProjectView}
                        className="font-medium px-5 py-2 rounded-lg shadow-md transition"
                        style={{
                            backgroundColor: '#dc2626',
                            color: '#fff',
                            border: 'none',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#b91c1c')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc2626')}
                    >
                        {loadingDeletingProjectView ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProjectViewModal; 