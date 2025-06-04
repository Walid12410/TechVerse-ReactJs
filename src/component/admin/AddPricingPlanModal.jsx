import React from 'react';
import { X } from "lucide-react";

const AddPricingPlanModal = ({
    isOpen,
    onClose,
    formData,
    onInputChange,
    onSubmit,
    loadingCreatingPricing
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8" style={{ backgroundColor: "var(--color-navy)" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Add New Pricing Plan</h2>
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
                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Plan Title</label>
                        <input
                            type="text"
                            name="plan_title"
                            value={formData.plan_title}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                            style={{ borderColor: '#ccc' }}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Description</label>
                        <textarea
                            name="plan_description"
                            value={formData.plan_description}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm h-24 resize-none text-white"
                            style={{ borderColor: '#ccc' }}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                            style={{ borderColor: '#ccc' }}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Billing Period</label>
                        <select
                            name="billing_period"
                            value={formData.billing_period}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm text-white"
                            style={{ borderColor: '#ccc' }}
                            required
                        >
                            <option value="">Select Period</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loadingCreatingPricing}
                            className="font-medium px-5 py-2 rounded-lg shadow-md transition"
                            style={{
                                backgroundColor: 'var(--color-purple)',
                                color: '#fff',
                                border: 'none',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#b69ac7')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--color-purple)')}
                        >
                            {loadingCreatingPricing ? "Creating..." : "Add Plan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPricingPlanModal; 