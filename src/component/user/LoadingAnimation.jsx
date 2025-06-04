import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    Tech Verse Vision
                </motion.h1>
                <motion.div
                    className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </motion.div>
        </div>
    );
};

export default LoadingAnimation; 