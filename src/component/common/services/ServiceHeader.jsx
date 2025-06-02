import { Plus } from "lucide-react";

const ServiceHeader = ({ setIsModalOpen }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">Services Dashboard</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer flex items-center gap-2 px-3 md:px-4 py-2 rounded transition duration-200 text-sm"
                style={{ backgroundColor: "var(--color-purple)", color: "#fff" }}
            >
                <Plus size={18} />
                <span className="hidden md:inline">Add Service</span>
            </button>
        </div>
    );
}

export default ServiceHeader;