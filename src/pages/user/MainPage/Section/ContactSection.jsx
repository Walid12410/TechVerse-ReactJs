import TitleSection from "../../../../component/common/TitleSection";
import FacebookIcon from "../../../../assets/icon/facebook.png";
import InstaIcon from "../../../../assets/icon/insta.png";
import { motion } from "framer-motion";
import Button from "../../../../component/common/button/Button";
import { BsTiktok } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

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

const titleVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            delay: 0.2,
        },
    },
};

const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            delay: 0.4,
        },
    },
};

const ContactSection = ({setting}) => {
    return (
        <motion.div 
            className="h-screen relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="h-screen flex flex-col items-center justify-center space-y-6 px-4 sm:px-8 md:px-16 text-center">
                <TitleSection title={"CONTACT US"}/>

                <div className="w-1/2">
                    <motion.div
                        variants={titleVariants}
                        className="text-3xl sm:text-5xl md:text-7xl font-bold text-white"
                        style={{
                            fontFamily: "FootbarPro, sans-serif",
                            color: "var(--color-purple)"
                        }}
                    >
                        Unlock Your Brand's Full Potential
                    </motion.div>

                    <motion.p
                        variants={contentVariants}
                        className="text-sm font-bold text-white mt-2 mb-20"
                        style={{ fontFamily: "CelabRegular, sans-serif" }}
                    >
                        Ready to elevate your brand? Schedule a call to discuss your project and discover
                        how we can bring your vision to life.
                    </motion.p>
                </div>

                <Button children={"BOOK A CALL"} path={"/contact-us"} />


                {/* 🔹 Social Media Icons */}
                <motion.div 
                    className="flex items-center justify-center space-x-8 mt-10"
                    variants={socialVariants}
                >
                    <motion.a 
                        href={setting.facebook_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img src={FacebookIcon} alt="Facebook" className="w-4 h-8 transition-transform cursor-pointer" />
                    </motion.a>
                    <motion.a 
                        href={setting.instagram_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img src={InstaIcon} alt="Instagram" className="w-8 h-8 transition-transform cursor-pointer" />
                    </motion.a>
                    <motion.a 
                        href={setting.tiktok_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <BsTiktok className="text-white w-8 h-8 transition-transform cursor-pointer"/>
                    </motion.a>

                    <motion.a 
                        href={setting.linkedin_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaLinkedin className="text-white w-8 h-8 transition-transform cursor-pointer"/>
                    </motion.a>

                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactSection;
