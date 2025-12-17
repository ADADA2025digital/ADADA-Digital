import React from "react";
import ButtonGlobal from "../Components/Button";
import { motion, MotionConfig } from "framer-motion";

// Variants for animation
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const ContentHeader = ({ title, subtitle, description, buttonPath }) => {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="row py-5 align-items-end mb-3"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          className="col-md-6 text-md-start text-center"
          variants={fadeInUp}
        >
          <motion.h5
            className="text-danger fw-bold text-uppercase heading custom-letter-spacing"
            variants={fadeInUp}
          >
            {subtitle}
          </motion.h5>
          <motion.h2 className="text-white fw-bold" variants={fadeInUp}>
            {title.split("\\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </motion.h2>
        </motion.div>

        <motion.div
          className="col-md-6 text-md-start text-center text-white px-md-5 PX-3"
          variants={fadeInUp}
        >
          <motion.p variants={fadeInUp}>{description}</motion.p>
          <motion.div variants={fadeInUp} whileTap={{ scale: 0.98 }}>
            <ButtonGlobal text="Explore More" to={buttonPath} />
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

export default ContentHeader;
