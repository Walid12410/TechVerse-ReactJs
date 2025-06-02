import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Assuming you use FaTrash for delete

const ContactUsTable = ({
    loading,
    error,
    data,
    columns,
    setIsDeleteOpen,
    setSelectedItem,
}) => {

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setIsDeleteOpen(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-4 p-4 bg-red-600 text-white rounded">
                Error loading data: {error}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center text-white py-8">
                No contact messages found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-700">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                {col.label}
                            </th>
                        ))}
                        {/* Actions Column Header */}
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {col.render ? col.render(item) : item[col.field]}
                                </td>
                            ))}
                            {/* Actions Column */}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => handleDeleteClick(item)}
                                    className="text-red-600 hover:text-red-900 mr-3"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactUsTable; 