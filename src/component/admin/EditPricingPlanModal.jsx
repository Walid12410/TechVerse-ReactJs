import React from 'react';
import { X } from "lucide-react";

const EditPricingPlanModal = ({
    isOpen,
    onClose,
    selectedPricing,
    setSelectedPricing,
    detailDescription,
    setDetailDescription,
    onUpdatePricing,
    onCreatePricingDetail,
    onRemoveDetail,
    loadingPricingUpdate,
    loadingCreatingPricingDetails
}) => {
    if (!isOpen || !selectedPricing) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto p-4">
            <div className="shadow-2xl rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative space-y-6"
                style={{ backgroundColor: "var(--color-navy)" }}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-white text-center">Edit Pricing Plan</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Plan Title</label>
                        <input
                            type="text"
                            value={selectedPricing.plan_title}
                            onChange={(e) => setSelectedPricing({...selectedPricing, plan_title: e.target.value})}
                            className="w-full px-4 py-2 border border-white rounded-lg shadow-sm text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Description</label>
                        <textarea
                            value={selectedPricing.plan_description}
                            onChange={(e) => setSelectedPricing({...selectedPricing, plan_description: e.target.value})}
                            className="w-full px-4 py-2 border border-white rounded-lg text-white shadow-sm h-24 resize-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Price</label>
                        <input
                            type="number"
                            value={selectedPricing.price}
                            onChange={(e) => setSelectedPricing({...selectedPricing, price: e.target.value})}
                            className="w-full px-4 py-2 border border-white rounded-lg shadow-sm text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Billing Period</label>
                        <select
                            value={selectedPricing.billing_period}
                            onChange={(e) => setSelectedPricing({...selectedPricing, billing_period: e.target.value})}
                            className="w-full px-4 py-2 border border-white rounded-lg shadow-sm text-white"
                            required
                        >
                            <option value="none">None</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={() => onUpdatePricing(selectedPricing.id)}
                            disabled={loadingPricingUpdate}
                            className="text-white font-medium px-5 py-2 rounded-lg shadow-md"
                            style={{ backgroundColor: "var(--color-purple)" }}
                        >
                            {loadingPricingUpdate ? "Updating..." : "Update Plan"}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-white">Details:</h3>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                value={detailDescription}
                                onChange={(e) => setDetailDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-white rounded-lg shadow-sm text-white"
                                placeholder="Add new detail description"
                            />
                            <button
                                onClick={onCreatePricingDetail}
                                className="text-white px-4 py-2 rounded-lg shadow-md"
                                style={{ backgroundColor: "var(--color-purple)" }}
                            >
                                {loadingCreatingPricingDetails ? "Adding..." : "Add"}
                            </button>
                        </div>

                        {selectedPricing.details?.length > 0 ? (
                            <ul className="list-disc list-inside text-white space-y-2">
                                {selectedPricing.details.map((detail) => (
                                    <li key={detail.id} className="flex justify-between items-center pl-2 pr-2">
                                        <span>{detail.pricing_detail}</span>
                                        <button
                                            onClick={() => onRemoveDetail(detail.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <X size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white italic">No additional details available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPricingPlanModal; 