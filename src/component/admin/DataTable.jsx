import { Trash2, Edit, Eye } from "lucide-react";

const DataTable = ({
  loading,
  error,
  data,
  columns,
  showActions = true,
  showIdColumn = true,
  actions = {} // new: { view, edit, delete }
}) => {

  if(loading){
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if(error){
    return (
      <div className="text-red-500 text-center">{error}</div>
    );
  }

  if(!data ||data.length === 0){
    return (
      <div className="text-white text-center">No data found</div>
    );
  }
 
  return (
    <div className="overflow-x-auto flex-grow">
      <table className="min-w-full text-left border rounded-lg overflow-hidden">
        <thead className="text-white bg-gray-900">
          <tr>
            {showIdColumn && <th className="px-3 md:px-4 py-2 text-sm">ID</th>}
            {columns.map((column, index) => (
              <th key={index} className="px-3 md:px-4 py-2 text-sm">
                {column.label}
              </th>
            ))}
            {showActions && <th className="px-3 md:px-4 py-2 text-center text-sm">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0) + (showIdColumn ? 1 : 0)}
                className="text-center py-4"
              >
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0) + (showIdColumn ? 1 : 0)}
                className="text-center py-4 text-red-500"
              >
                Error loading data
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0) + (showIdColumn ? 1 : 0)}
                className="text-center py-4"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={item.id || idx}
                className={`border-t border-gray-200 hover:bg-gray-700 transition duration-150 ${
                  idx % 2 === 1 ? "bg-gray-800" : ""
                }`}
              >
                {showIdColumn && <td className="px-3 md:px-4 py-2 text-sm">{item.id}</td>}
                {columns.map((column, index) => (
                  <td key={index} className="px-3 md:px-4 py-2 text-sm">
                    {column.render ? column.render(item) : item[column.field]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-3 md:px-4 py-2 text-center">
                    <div className="flex justify-center gap-2 md:gap-3">
                      {actions.view && (
                        <button
                          onClick={() => actions.view(item)}
                          className="text-blue-300 hover:text-blue-500 cursor-pointer"
                          title="Details"
                        >
                          <Eye size={16} />
                        </button>
                      )}
                      {actions.edit && (
                        <button
                          onClick={() => actions.edit(item)}
                          className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                      {actions.delete && (
                        <button
                          onClick={() => actions.delete(item)}
                          className="text-red-400 hover:text-red-600 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
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
};

export default DataTable;
