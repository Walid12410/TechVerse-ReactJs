import React from 'react';
import { X } from "lucide-react";

const ViewPricingDetailsModal = ({
    isOpen,
    onClose,
    selectedPricing
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

                <h2 className="text-2xl font-bold text-white text-center">{selectedPricing.plan_title}</h2>
                
                <div className="space-y-4">
                    <div>
                        <h3 className="font-medium text-white mb-2">Description</h3>
                        <p className="text-gray-300">{selectedPricing.plan_description}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-white mb-2">Price</h3>
                        <p className="text-gray-300">${selectedPricing.price} / {selectedPricing.billing_period}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-white mb-2">Details</h3>
                        {selectedPricing.details?.length > 0 ? (
                            <ul className="list-disc list-inside text-white space-y-2">
                                {selectedPricing.details.map((detail) => (
                                    <li key={detail.id} className="pl-2">{detail.pricing_detail}</li>
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

export default ViewPricingDetailsModal; 