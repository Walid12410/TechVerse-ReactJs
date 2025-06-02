import { motion } from "framer-motion";
import TitleSection from "../../../../component/common/TitleSection";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.2
        },
    },
};

const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        },
    },
};

const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        },
    },
};

const AboutSection = ({ aboutUs = [] }) => {
    if (!aboutUs || aboutUs == null) {
        return (
            <div className="h-screen relative overflow-hidden flex items-center justify-center">
                <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-4"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >About Us Coming Soon</h2>
                    <p className="text-white/80"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >We're currently updating our about section. Please check back later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen relative overflow-hidden">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="h-screen flex flex-col items-center justify-center space-y-6 px-4 sm:px-8 md:px-16 text-center"
            >
                <motion.div variants={titleVariants}>
                    <TitleSection title={"ABOUT US"} />
                </motion.div>

                <motion.p
                    variants={titleVariants}
                    className="text-3xl sm:text-5xl md:text-7xl font-bold text-white"
                    style={{ fontFamily: "FootbarPro, sans-serif", color: "var(--color-purple)" }}
                >
                    {aboutUs?.title}
                </motion.p>

                <motion.p
                    variants={titleVariants}
                    className="text-3xl sm:text-5xl md:text-7xl font-bold text-white"
                    style={{ fontFamily: "FootbarPro, sans-serif" }}
                >
                    {aboutUs?.subtitle}
                </motion.p>

                <motion.div
                    variants={contentVariants}
                    className="w-full max-w-md sm:max-w-lg md:max-w-xl"
                >
                    <p
                        className="text-xs text-white"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >
                        {aboutUs?.main_description}
                    </p>
                </motion.div>

                <motion.div
                    variants={contentVariants}
                    className="w-full max-w-md sm:max-w-lg md:max-w-xl"
                >
                    <p
                        className="text-xs text-white"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >
                        {aboutUs?.additional_description}
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default AboutSection;