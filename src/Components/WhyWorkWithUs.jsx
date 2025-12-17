import React from "react";
import { motion } from "framer-motion";
import { servicesListData } from "../Constants/Data";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const pillItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const WhyWorkWithUs = () => {
  return (
    <div className="row mb-4 pt-5">
      <div className="col-12">
        <div className="row align-items-start justify-content-between gx-4 gy-4">
          <div className="col-12 col-md-6 text-start">
            <motion.p
              className="fs-5 heading text-center text-md-start fw-bold my-4 text-danger text-uppercase"
              style={{ letterSpacing: "0.5rem" }}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              Why Work With Us
            </motion.p>
            <motion.h2
              className="text-white text-center text-md-start"
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              Crafting Digital Excellence,
              <br /> Together with You
            </motion.h2>
          </div>

          <div className="col-12 col-md-6">
            <div className="services-list d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              {servicesListData.map((service, index) => (
                <motion.span
                  key={index}
                  className="service-pill cursor bg-dark rounded-pill p-3 position-relative text-white heading z-1 text-center overflow-hidden"
                  variants={pillItem}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                >
                  {service}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyWorkWithUs;
