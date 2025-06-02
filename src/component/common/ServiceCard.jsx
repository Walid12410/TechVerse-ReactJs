import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import config from "../../utils/config";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const detailVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
        },
    }),
};

const ServiceCard = ({ serviceItem, index }) => {
    const reversed = index % 2 === 1;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row gap-8 items-start ${
                reversed ? "md:flex-row-reverse" : ""
            }`}
        >
            {/* Image Section */}
            <motion.div
                variants={imageVariants}
                className="w-full md:w-3/5 aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
            >
                <img
                    src={`${config.API_BASE_URL}/${serviceItem?.image_url}`}
                    alt={serviceItem?.service_name}
                    className="w-full h-full object-fill transition-transform duration-500"
                    loading="lazy"
                />
            </motion.div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col">
                <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "FootbarPro, sans-serif" }}
                >
                    {serviceItem?.service_name}
                </h3>

                <p
                    className="text-white/80 mb-6"
                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                >
                    {serviceItem?.service_description}
                </p>

                {serviceItem?.details &&
                    serviceItem?.details.length > 0 && (
                        <div className="space-y-3">
                            {serviceItem.details.map((detail, i) => (
                                <motion.div
                                    key={detail.id}
                                    className="flex items-center gap-3 text-white/90"
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={detailVariants}
                                >
                                    <ArrowRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                    <span
                                        style={{
                                            fontFamily: "CelabRegular, sans-serif",
                                        }}
                                    >
                                        {detail?.detail_description}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    )}
            </div>
        </motion.div>
    );
};

export default ServiceCard;
