import { X } from "lucide-react";

const FormModal = ({
    title,
    handleModalClose,
    handleSubmit,
    formData,
    handleInputChange,
    fields,
    loading,
    submitText
}) => {
    return ( 
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8" style={{ backgroundColor: "var(--color-navy)" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                        {title}
                    </h2>
                    <button
                        onClick={handleModalClose}
                        className="transition"
                        style={{ color: '#888' }}
                        onMouseEnter={(e) => (e.target.style.color = '#555')}
                        onMouseLeave={(e) => (e.target.style.color = '#888')}
                    >
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {fields.map((field, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium mb-1 text-white">
                                {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                                    style={{
                                        borderColor: '#ccc',
                                        backgroundColor: 'var(--color-navy-medium)'
                                    }}
                                    required={field.required}
                                    rows={field.rows || 4}
                                />
                            ) : (
                                <input
                                    type={field.type || 'text'}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                                    style={{
                                        borderColor: '#ccc',
                                        backgroundColor: 'var(--color-navy-medium)'
                                    }}
                                    required={field.required}
                                    accept={field.accept}
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="text-white font-medium px-5 py-2 rounded-lg shadow-md"
                            style={{ backgroundColor: "var(--color-purple)" }}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormModal; 