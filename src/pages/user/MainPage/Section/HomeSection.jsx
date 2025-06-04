import { ChevronDown } from "lucide-react";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TitleSection from "../../../../component/user/TitleSection";

const HomeSection = () => {
  const containerRef = useRef(null);

  // scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // drunk scroll effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const smoothY = useSpring(y, { stiffness: 10, damping: 20 });
  const smoothX = useSpring(x, { stiffness: 10, damping: 20 });
  const smoothRotate = useSpring(rotate, { stiffness: 10, damping: 20 });

  return (
    <div ref={containerRef} className="h-screen  relative overflow-hidden">

      {/* Main content with entry + scroll animation */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          y: smoothY,
          x: smoothX,
          rotate: smoothRotate,
        }}
        className="h-screen flex flex-col items-center justify-center space-y-6 px-4 sm:px-8 md:px-16 text-center"
      >
        <TitleSection title={"HOME"}/>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex flex-wrap justify-center items-center gap-2"
        >
          <p
            className="text-3xl sm:text-5xl md:text-7xl font-bold text-white"
            style={{ fontFamily: "FootbarPro, sans-serif" }}
          >
            Elevate Your
          </p>
          <p
            className="text-3xl sm:text-5xl md:text-7xl font-bold"
            style={{
              fontFamily: "FootbarPro, sans-serif",
              color: "var(--color-purple)",
            }}
          >
            Brand
          </p>
          <p
            className="text-3xl sm:text-5xl md:text-7xl font-bold text-white"
            style={{ fontFamily: "FootbarPro, sans-serif" }}
          >
            With
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-3xl sm:text-5xl md:text-7xl font-bold text-white"
          style={{ fontFamily: "FootbarPro, sans-serif" }}
        >
          Subscription Design Service
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl"
        >
          <p
            className="text-xs sm:text-sm text-white"
            style={{ fontFamily: "CelabRegular, sans-serif" }}
          >
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante.
          </p>
        </motion.div>

        {/* Chevron with bounce animation */}
        <motion.div
          className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mt-6"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="text-white w-full h-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeSection;
