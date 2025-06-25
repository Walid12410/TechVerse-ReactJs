import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "./Button";

const PriceCard = ({ price, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });


    return (
        <motion.div
            ref={ref}
            key={price.id}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{
                duration: 0.8,
                delay: 0.2 * index,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={`p-8 flex-1 min-w-[300px] max-w-[400px] border rounded-2xl border-[#302e2e] transition-all duration-300 hover:border-white hover:shadow-[0_0_20px_white]`}
            style={{ backgroundColor: "var(--color-black-wash)" }}
        >

            <div className="flex flex-col gap-2 text-center h-full">
                {/* Title */}
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 * index + 0.2 }}
                    className="text-3xl font-bold " // glow-text
                    style={{ fontFamily: "CelabRegular, sans-serif", color: "var(--color-purple)" }}
                >
                    {price?.plan_title}
                </motion.h3>


                {/* Price */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 * index + 0.3 }}
                    className="flex items-center gap-2 text-center justify-center text-white"
                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                >
                    ${price?.price}/{price?.billing_period}
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 * index + 0.4 }}
                    className="text-white text-xs mt-4"
                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                >
                    {price?.plan_description}
                </motion.p>

                <hr className="w-full text-white" />

                {/* Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 * index + 0.5 }}
                    className="flex flex-col pt-5 pb-10 flex-grow"
                >
                    {price?.details.map((detail, detailIndex) => (
                        <motion.div
                            key={detail?.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: 0.3 * index + 0.6 + (detailIndex * 0.1) }}
                            className="flex items-center text-center justify-center text-white text-lg"
                            style={{ fontFamily: "CelabRegular, sans-serif" }}
                        >
                            {detail?.pricing_detail}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 * index + 0.8 }}
                    className="w-full flex justify-center mt-auto"
                >
                    <Button children={"CONTACT US NOW"} path={"/contact-us"} />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default PriceCard;