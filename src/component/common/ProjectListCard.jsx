import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import config from "../../utils/config";

const ProjectListCard = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
                duration: 0.6,
                delay: 0.2 * index,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className="bg-black/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-[0_0_20px_white] transition-all duration-300"
        >
            <div className="flex flex-col md:flex-row">
                {/* Project Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
                    transition={{ delay: 0.3 * index + 0.2 }}
                    className="w-full md:w-1/3 relative group"
                >
                    <img 
                        src={`${config.API_BASE_URL}/${project?.image_url}`} 
                        alt={project?.view_title}
                        className="w-full h-[250px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <motion.a
                            href={project?.view_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-purple-400 transition-colors"
                            whileHover={{ scale: 1.1 }}
                        >
                            <ExternalLink className="w-8 h-8" />
                        </motion.a>
                    </div>
                </motion.div>

                {/* Project Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.3 * index + 0.3 }}
                    className="w-full md:w-2/3 p-6 flex flex-col justify-between"
                >
                    <div className="space-y-4">
                        <motion.h3 
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.3 * index + 0.4 }}
                            className="text-2xl font-bold"
                            style={{ fontFamily: "FootbarPro, sans-serif", color: "var(--color-purple)" }}
                        >
                            {project?.view_title}
                        </motion.h3>

                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.3 * index + 0.5 }}
                            className="text-white/80 line-clamp-3"
                            style={{ fontFamily: "CelabRegular, sans-serif" }}
                        >
                            {project?.view_description}
                        </motion.p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.3 * index + 0.6 }}
                        className="mt-4 flex items-center justify-between"
                    >
                        <span className="text-white/60 text-sm"
                            style={{ fontFamily: "CelabRegular, sans-serif" }}
                        >
                            {new Date(project?.create_time).toLocaleDateString()}
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ProjectListCard; 