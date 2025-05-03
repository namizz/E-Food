import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";
import { MouseEvent, useRef } from "react";

const MagnetButton = ({
  children = "Hover Me",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-20, 20], [10, -10]);
  const rotateY = useTransform(x, [-20, 20], [-10, 10]);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;

      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`text-h3 bg-gradient-to-tr from-[#ffb23e] to-[#f18740] px-8 py-4 border-double border-4 font-semibold text-white rounded-full transition-colors ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// Demo/Example Usage
const MagneticButton = () => {
  return (
    <div className="flex items-center justify-center">
      <MagnetButton>Order Now</MagnetButton>
    </div>
  );
};
export default MagneticButton;
