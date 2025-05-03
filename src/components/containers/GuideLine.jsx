import React, { useRef } from "react";
import { useInView, motion } from "framer-motion";
const GuideLine = ({ data }) => {
  return (
    <div className="p-6 space-y-12 mx-20">
      {data.map((section, index) => (
        <div key={index} className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {index + 1}. {section.title}
          </h2>

          {section.steps.map((step, i) => (
            <AnimatedStep key={i} step={step} />
          ))}
        </div>
      ))}
    </div>
  );
};

const AnimatedStep = ({ step }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 150 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl bg-white rounded-lg shadow p-4"
    >
      <p className="text-sm text-gray-600 mb-2">{step.descripition}</p>
      {step.url && (
        <img
          src={step.url}
          alt="step"
          className="w-full h-auto object-cover rounded-md"
        />
      )}
    </motion.div>
  );
};
export default GuideLine;
