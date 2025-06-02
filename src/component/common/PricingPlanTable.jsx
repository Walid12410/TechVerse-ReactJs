import React from 'react';
import { Trash2, Edit, Eye } from "lucide-react";

const PricingPlanTable = ({
    pricing,
    loadingPricing,
    errorPricing,
    onViewDetails,
    onEdit,
    onDelete
}) => {
    if (loadingPricing) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (errorPricing) {
        return (
            <div className="text-red-500 text-center">{errorPricing}</div>
        );
    }

    if (!pricing || pricing.length === 0) {
        return (
            <div className="text-white text-center">No price added yet</div>
        );
    }

    return (
        <div className="overflow-x-auto flex-grow">
            <table className="min-w-full text-left border rounded-lg overflow-hidden">
                <thead className="text-white">
                    <tr>
                        <th className="px-3 md:px-4 py-2 text-sm">Plan Title</th>
                        <th className="px-3 md:px-4 py-2 text-sm">Price</th>
                        <th className="px-3 md:px-4 py-2 text-sm">Billing Period</th>
                        <th className="px-3 md:px-4 py-2 text-center text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pricing.map((plan, idx) => (
                        <tr
                            key={plan.id}
                            className={`border-t border-gray-200 hover:bg-gray-700 transition duration-150 ${idx % 2 === 1 ? "bg-gray-800" : ""}`}
                        >
                            <td className="px-3 md:px-4 py-2 text-sm">{plan.plan_title}</td>
                            <td className="px-3 md:px-4 py-2 text-sm">${plan.price}</td>
                            <td className="px-3 md:px-4 py-2 text-sm">{plan.billing_period}</td>
                            <td className="px-3 md:px-4 py-2 text-center">
                                <div className="flex justify-center gap-2 md:gap-3">
                                    <button
                                        onClick={() => onViewDetails(plan)}
                                        className="text-blue-300 hover:text-blue-500 cursor-pointer"
                                        title="Details"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={() => onEdit(plan)}
                                        className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(plan.id)}
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

export default PricingPlanTable; 