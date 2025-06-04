import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../../../../component/user/ProjectCard";
import TitleSection from "../../../../component/user/TitleSection";
import Button from "../../../../component/user/Button";

const ProjectSection = ({ projectView, totalRecords }) => {
  if (!projectView || projectView.length === 0) {
    return (
      <div className="relative overflow-hidden py-16 flex items-center justify-center">
        <div className="text-center p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4"
            style={{ fontFamily: "CelabRegular, sans-serif" }}

          >Projects Coming Soon</h2>
          <p className="text-white/80"
            style={{ fontFamily: "CelabRegular, sans-serif" }}
          >We're currently updating our projects. Please check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Header - PROJECT - */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center justify-center space-y-6 px-4 sm:px-8 md:px-16 text-center"
      >

        <TitleSection title={"PROJECT"} />

        {projectView.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {totalRecords > 3 && (
          <div className="w-full flex justify-center py-5">
            <Button children={"ALL PROJECT"} path={"/project"}/>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectSection;
