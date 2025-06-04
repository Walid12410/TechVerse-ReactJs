import React from 'react';
import AnimatedBackground from '../component/user/AnimationBackground';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../component/user/Button';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center">
            <AnimatedBackground />

            <div className="relative z-10 text-center bg-black/50 backdrop-blur-sm p-8 rounded-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                        style={{ fontFamily: "FootbarPro, sans-serif", color: "var(--color-purple)" }}
                    >
                        404 - Not Found
                    </h1>
                    <p className="text-white/80 text-lg mb-8"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >
                        The page you are looking for does not exist.
                    </p>
                </motion.div>

            </div>
            <Button children={"BACK TO HOME"} path={"/"}/>

        </div>
    );
}

export default NotFound;
