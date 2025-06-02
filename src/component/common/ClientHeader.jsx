import { Plus } from "lucide-react";

const ClientHeader = ({setIsModalOpen}) => {
    return ( 
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
            <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer flex items-center gap-2 px-3 md:px-4 py-2 rounded transition duration-200 text-sm"
                style={{ backgroundColor: "var(--color-purple)", color: "#fff" }}
            >
                <Plus size={18} />
                <span className="hidden md:inline">Add Client</span>
            </button>
        </div>
    );
}

export default ClientHeader; 