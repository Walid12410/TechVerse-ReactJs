import React from 'react';
import { Plus } from "lucide-react";

const PricingPlanHeader = ({ onAddClick }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Pricing Plans</h1>
            <button
                onClick={onAddClick}
                className="text-white font-medium px-5 py-2 rounded-lg shadow-md transition flex items-center gap-2"
                style={{ backgroundColor: "var(--color-purple)" }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#b69ac7')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--color-purple)')}
            >
                <Plus size={20} />
                Add New Plan
            </button>
        </div>
    );
};

export default PricingPlanHeader; 