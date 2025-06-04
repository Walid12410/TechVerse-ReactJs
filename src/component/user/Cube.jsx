import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './cube.css'; // Import cube styles
import image1 from '../../assets/image/image1.jpg';
import image2 from '../../assets/image/image2.jpg';
import image3 from '../../assets/image/image3.jpg';
import image4 from '../../assets/image/image4.jpg';

const CubeShowcase = () => {
  const containerRef = useRef(null);
  const [screenSize, setScreenSize] = useState('desktop'); // 'mobile', 'tablet', 'desktop'

  // Scroll animation setup
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 300], [0, -20]); // Move text slightly up on scroll
  const buttonY = useTransform(scrollY, [0, 300], [0, -15]); // Move button slightly up on scroll
  const cubeY = useTransform(scrollY, [0, 500], [0, -150]); // Move cube upwards as you scroll

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Setup cube animation
    const cube = document.querySelector('.cube');
    if (cube) {
      // Initial rotation
      cube.style.transform = 'rotateX(-20deg) rotateY(30deg)';

      // Auto-rotate cube slightly
      let rotationX = -20;
      let rotationY = 30;
      let direction = 1;

      const autoCubeRotate = setInterval(() => {
        rotationY += 0.1 * direction;

        // Change direction occasionally
        if (Math.random() < 0.005) direction *= -1;

        // Add slight variation to X rotation
        rotationX = -20 + Math.sin(Date.now() / 3000) * 5;

        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      }, 16);

      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
        clearInterval(autoCubeRotate);
      };
    }
  }, []);

  // Animation variants for entrance effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const isMobileView = screenSize === 'mobile';
  const isTabletView = screenSize === 'tablet';

  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative py-16">
      {/* Company Name positioned at top */}
      <motion.div
        className="company-name w-full text-center mb-6 sm:mb-10 z-0"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          style={{ fontFamily: "AscentPro, sans-serif" }}
          className={`text-white font-bold italic ${isMobileView ? 'text-4xl' : isTabletView ? 'text-6xl' : 'text-8xl'}`}>
          Tech Verse Agency
        </div>
      </motion.div>

      {/* Main container for descriptions + cube */}
      <motion.div
        className={`flex ${isMobileView || isTabletView ? 'flex-col' : 'flex-row'} items-center justify-center gap-8 w-full max-w-6xl z-10`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left side: Second Description - only visible on desktop and potentially tablet */}
        {!isMobileView && (
          <motion.div
            className="flex flex-col items-center justify-center w-full text-center mr-30"
            variants={itemVariants}
            style={{ y: textY }}
          >
            <h2
              style={{ fontFamily: "CelabRegular, sans-serif" }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 w-full text-center">
              Amazing 3D Showcase
            </h2>
            <p
              style={{ fontFamily: "FootbarPro, sans-serif" }}

              className="text-sm sm:text-base lg:text-lg text-white w-full text-center">
              Explore our interactive cube that displays multiple perspectives with each scroll. Move your mouse and scroll to see the cube rotate.
            </p>
          </motion.div>
        )}

        {/* Center: Cube */}
        <motion.div
          className="flex flex-col items-center justify-center w-full"
          variants={itemVariants}
        >
          {/* Cube with dynamic size based on screen */}
          <motion.div
            className="cube-scene"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))',
              y: cubeY,
              transform: `scale(${isMobileView ? 0.7 : isTabletView ? 0.85 : 1})`, // Scale down on smaller screens
            }}
          >
            <div className="cube">
              <div className="cube-face cube-face-front">
                <img src={image1} alt="front" className="w-full h-full object-cover" />
              </div>
              <div className="cube-face cube-face-back">
                <img src={image2} alt="back" className="w-full h-full object-cover" />
              </div>
              <div className="cube-face cube-face-right">
                <img src={image3} alt="right" className="w-full h-full object-cover" />
              </div>
              <div className="cube-face cube-face-left">
                <img src={image4} alt="left" className="w-full h-full object-cover" />
              </div>
              <div className="cube-face cube-face-top">
                <img src={image1} alt="top" className="w-full h-full object-cover" />
              </div>
              <div className="cube-face cube-face-bottom">
                <img src={image1} alt="bottom" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Button with scroll animation */}
          <motion.div
            className="w-full flex justify-center mt-6 sm:mt-8 z-20"
            style={{ y: buttonY }}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href='#home'
              style={{ fontFamily: "CelabRegular, sans-serif" }}
              className="bg-transparent text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base cursor-pointer">
              click to discover
            </a>
          </motion.div>
        </motion.div>

        {/* Right side: First Description - only visible on desktop */}
        {!isMobileView && (
          <motion.div
            className="flex flex-col items-center justify-center w-full text-center ml-30"
            variants={itemVariants}
            style={{ y: textY }}
          >
            <h2
              style={{ fontFamily: "CelabRegular, sans-serif" }}

              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 w-full text-center">
              Innovative Technology
            </h2>
            <p
              style={{ fontFamily: "FootbarPro, sans-serif" }}

              className="text-sm sm:text-base lg:text-lg text-white w-full text-center">
              We leverage cutting-edge technologies to create immersive digital experiences. Our solutions are built with the latest frameworks and tools.
            </p>
          </motion.div>
        )}

        {/* Mobile descriptions (appear below cube) */}
        {isMobileView && (
          <>
            <motion.div
              className="flex flex-col items-center justify-center text-center w-full mt-6"
              variants={itemVariants}
              style={{ y: textY }}
            >
              <h2 className="text-xl font-bold text-white mb-2 text-center">
                Amazing 3D Showcase
              </h2>
              <p className="text-sm text-white text-center">
                Explore our interactive cube that displays multiple perspectives. Move your mouse to see the cube rotate.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center text-center w-full mt-6"
              variants={itemVariants}
              style={{ y: textY }}
            >
              <h2 className="text-xl font-bold text-white mb-2 text-center">
                Innovative Technology
              </h2>
              <p className="text-sm text-white text-center">
                We leverage cutting-edge technologies to create immersive digital experiences built for optimal performance.
              </p>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CubeShowcase;