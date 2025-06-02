import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
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

const ProjectCard = ({project}) => {
    return ( 
        <motion.section
            key={project.id}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 gap-6"
        >
            <motion.div 
                variants={imageVariants}
                className="w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] shadow-lg rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
            >
                <img
                    src={`${config.API_BASE_URL}/${project?.image_url}`}
                    alt={project?.view_title}
                    loading="lazy"
                    className="w-full h-full object-fill"
                />
            </motion.div>

            <motion.div 
                variants={contentVariants}
                className="w-full max-w-4xl space-y-4"
            >
                <motion.div 
                    variants={contentVariants}
                    className="flex items-center justify-center gap-3"
                >
                    <h2 
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
                        style={{ fontFamily: "FootbarPro, sans-serif" }}
                    >
                        {project?.view_title}
                    </h2>
                    {project?.view_link && (
                        <motion.a
                            variants={contentVariants}
                            href={project?.view_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-purple-400 transition-colors cursor-pointer"
                            aria-label="Visit project"
                            whileHover={{ scale: 1.1 }}
                        >
                            <ExternalLink className="w-6 h-6" />
                        </motion.a>
                    )}
                </motion.div>

                <motion.p 
                    variants={contentVariants}
                    className="text-base sm:text-lg text-white/90"
                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                >
                    {project?.view_description}
                </motion.p>

                <motion.p 
                    variants={contentVariants}
                    className="text-sm text-white/70"
                    style={{ fontFamily: "CelabRegular, sans-serif" }}
                >
                    {new Date(project?.create_time).toLocaleString()}
                </motion.p>
            </motion.div>
        </motion.section>
    );
}
 
export default ProjectCard;