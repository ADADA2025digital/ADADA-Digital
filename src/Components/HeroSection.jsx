import React from "react";
import design1 from "../assets/Images/design1.png";
import design2 from "../assets/Images/design2.png";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HeroSection = ({ title, subtitle, imageRight }) => {
  return (
    <div className="container-fluid hero-section-inner">
      <div className="container py-5">
        <div className="row py-5 my-5 align-items-center">
          {/* Left column */}
          <motion.div
            className="col-md-6 m-0"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* Top floating design */}
            <motion.div
              className="position-relative design2 d-flex justify-content-end"
              animate={{ y: [0, -6, 0, 4, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={design2}
                alt="Hero"
                className="img-animation img-fluid rounded"
              />
            </motion.div>

            {/* Text */}
            <div className="content text-md-start text-center">
              <motion.span
                className="hero-subtitle fs-4 heading text-danger custom-letter-spacing text-uppercase py-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {subtitle}
              </motion.span>
              <motion.h1
                className="hero-title fw-bold text-white py-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {title}
              </motion.h1>
            </div>

            {/* Bottom floating design */}
            <motion.div
              className="position-relative design1 d-flex justify-content-start"
              animate={{ y: [0, 5, 0, -5, 0] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={design1}
                alt="Hero"
                className="img-animation img-fluid rounded position-relative"
              />
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="col-md-6 text-center"
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.img
              src={imageRight}
              alt="Hero"
              className="hero-img img-animation img-fluid rounded"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
