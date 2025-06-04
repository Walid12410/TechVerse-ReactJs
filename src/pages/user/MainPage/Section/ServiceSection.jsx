import React from "react";
import { motion } from "framer-motion";
import TitleSection from "../../../../component/user/TitleSection";
import ServiceCard from "../../../../component/user/ServiceCard";
import Button from "../../../../component/user/Button";


const ServiceSection = ({ services }) => {
    if (!services || services.length === 0) {
        return (
            <div className="relative overflow-hidden py-16 flex items-center justify-center">
                <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-4"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >Services Coming Soon</h2>
                    <p className="text-white/80"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >We're currently updating our services. Please check back later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden py-16">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex flex-col items-center justify-center space-y-12 px-4 sm:px-8 md:px-16"
            >
                <TitleSection title={"SERVICE"} />

                <div className="flex flex-col gap-16 w-full max-w-6xl">
                    {services.map((serviceItem, index) => (
                        <ServiceCard key={serviceItem.id} serviceItem={serviceItem.service} index={index} />
                    ))}
                </div>

                <div className="w-full flex justify-center py-5">
                    <Button children={"All Services"} path={"/service"} />
                </div>

            </motion.div>
        </div>
    );
}

export default ServiceSection;