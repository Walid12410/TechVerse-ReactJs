import { motion } from "framer-motion";
import TitleSection from "../../../../component/common/TitleSection";
import PriceCard from "../../../../component/common/PriceCard";

const PriceSection = ({ prices }) => {
    if (!prices || prices.length === 0) {
        return (
            <div className="relative overflow-hidden py-16 flex items-center justify-center">
                <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-4"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >Pricing Plans Coming Soon</h2>
                    <p className="text-white/80"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >We're currently updating our pricing plans. Please check back later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden py-16">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center space-y-12 px-4 sm:px-8 md:px-16"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <TitleSection title={"PRICING"} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex flex-wrap justify-center items-center gap-2"
                >
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-bold text-white"
                        style={{ fontFamily: "FootbarPro, sans-serif" }}
                    >
                        See Our
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-bold pl-2 pr-2"
                        style={{
                            fontFamily: "FootbarPro, sans-serif",
                            color: "var(--color-purple)",
                        }}
                    >
                        Pricing
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-bold text-white"
                        style={{ fontFamily: "FootbarPro, sans-serif" }}
                    >
                        Plans
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="w-full max-w-md sm:max-w-lg md:max-w-xl text-center"
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-xs sm:text-sm text-white"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >
                        Choose the plan that best suits your needs and unlock exceptional design services tailored to your business
                    </motion.p>
                </motion.div>

                <motion.hr
                    initial={{ width: 0 }}
                    animate={{ width: "24rem" }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="text-white"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-row flex-wrap justify-center gap-8 w-full max-w-7xl"
                >
                    {prices.map((price, index) => (
                        <PriceCard key={price.id} price={price} index={index} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default PriceSection;