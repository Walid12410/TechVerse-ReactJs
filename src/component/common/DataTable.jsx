import { Trash2, Edit, Eye } from "lucide-react";

const DataTable = ({
    loading,
    error,
    data,
    columns,
    setIsEditOpen,
    setSelectedItem,
    setIsDeleteOpen,
    showActions = true
}) => {
    return (
        <div className="overflow-x-auto flex-grow">
            <table className="min-w-full text-left border rounded-lg overflow-hidden">
                <thead className="text-white">
                    <tr>
                        <th className="px-3 md:px-4 py-2 text-sm">ID</th>
                        {columns.map((column, index) => (
                            <th key={index} className="px-3 md:px-4 py-2 text-sm">{column.label}</th>
                        ))}
                        {showActions && (
                            <th className="px-3 md:px-4 py-2 text-center text-sm">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length + (showActions ? 2 : 1)} className="text-center py-4">Loading...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={columns.length + (showActions ? 2 : 1)} className="text-center py-4 text-red-500">Error loading data</td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (showActions ? 2 : 1)} className="text-center py-4">No data found</td>
                        </tr>
                    ) : (
                        data.map((item, idx) => (
                            <tr
                                key={item.id}
                                className={`border-t border-gray-200 hover:bg-gray-700 transition duration-150 ${idx % 2 === 1 ? "bg-gray-800" : ""}`}
                            >
                                <td className="px-3 md:px-4 py-2 text-sm">{idx + 1}</td>
                                {columns.map((column, index) => (
                                    <td key={index} className="px-3 md:px-4 py-2 text-sm">
                                        {column.render ? column.render(item) : item[column.field]}
                                    </td>
                                ))}
                                {showActions && (
                                    <td className="px-3 md:px-4 py-2 text-center">
                                        <div className="flex justify-center gap-2 md:gap-3">
                                            <button
                                                className="text-blue-300 hover:text-blue-500 cursor-pointer"
                                                title="Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEditOpen(true);
                                                    setSelectedItem(item);
                                                }}
                                                className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsDeleteOpen(true);
                                                    setSelectedItem(item);
                                                }}
                                                className="text-red-400 hover:text-red-600 cursor-pointer" 
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable; 