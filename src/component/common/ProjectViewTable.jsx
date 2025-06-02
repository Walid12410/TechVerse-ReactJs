import React from 'react';
import { Trash2, Edit } from "lucide-react";
import config from "../../utils/config";

const ProjectViewTable = ({
    projectViews,
    loadingProjectViews,
    errorProjectViews,
    setSelectedProjectView,
    setIsEditOpen,
    setDeletingProjectViewId,
    setIsDeleteOpen,
}) => {

    if (loadingProjectViews) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (errorProjectViews) {
        return (
            <div className="text-red-500 text-center">{errorProjectViews}</div>
        );
    }

    if (!projectViews || projectViews.length === 0) {
        return (
            <div className="text-white text-center">No project views added yet</div>
        );
    }

    return (
        <div className="overflow-x-auto flex-grow">
            <table className="min-w-full text-left border rounded-lg overflow-hidden">
                <thead className="text-white">
                    <tr>
                        <th className="px-3 md:px-4 py-2 text-sm">Image</th>
                        <th className="px-3 md:px-4 py-2 text-sm">Title</th>
                        <th className="px-3 md:px-4 py-2 text-sm">Description</th>
                        <th className="px-3 md:px-4 py-2 text-sm">Link</th>
                        <th className="px-3 md:px-4 py-2 text-center text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projectViews.map((view, idx) => (
                        <tr
                            key={view.id}
                            className={`border-t border-gray-200 hover:bg-gray-700 transition duration-150 ${idx % 2 === 1 ? "bg-gray-800" : ""}`}
                        >
                            <td className="px-3 md:px-4 py-2">
                                <div className="w-20 h-20 rounded-lg overflow-hidden">
                                    <img
                                        src={`${config.API_BASE_URL}/${view.image_url}`}
                                        alt={view.view_title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </td>
                            <td className="px-3 md:px-4 py-2 text-sm">{view.view_title}</td>
                            <td className="px-3 md:px-4 py-2 text-sm">
                                <p className="line-clamp-2">{view.view_description}</p>
                            </td>
                            <td className="px-3 md:px-4 py-2 text-sm">
                                <a
                                    href={view.view_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300"
                                >
                                    View Project
                                </a>
                            </td>
                            <td className="px-3 md:px-4 py-2 text-center">
                                <div className="flex justify-center gap-2 md:gap-3">
                                    <button
                                        onClick={() => {
                                            setSelectedProjectView(view);
                                            setIsEditOpen(true);
                                        }}
                                        className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setDeletingProjectViewId(view.id);
                                            setIsDeleteOpen(true);
                                        }}
                                        className="text-red-400 hover:text-red-600 cursor-pointer"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectViewTable; 