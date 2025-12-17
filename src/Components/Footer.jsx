import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Logo from "../assets/Images/logo.png";
import Dropdown from "bootstrap/js/dist/dropdown";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.4, ease: "easeOut" },
  }),
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Footer = () => {
  const btnRef = useRef(null);

  useEffect(() => {
    if (btnRef.current) {
      Dropdown.getOrCreateInstance(btnRef.current);
    }
  }, []);

  return (
    <footer className="container-fluid px-0 text-white p-0 pt-md-5 text-dark footer-background w-100">
      {/* First Row */}
      <motion.div
        className="container w-100"
        variants={fadeInUp}
        custom={0}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="row w-100 pt-3 pb-0 pb-md-5 mb-md-5 mx-0">
          {/* Logo + About */}
          <motion.div
            className="col-12 col-md-3 my-md-4 my-0 d-flex flex-column text-center text-md-start align-items-center align-items-md-start"
            variants={fadeInUp}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div>
              <img
                src={Logo}
                alt="logo"
                className="my-2"
                style={{ width: "180px" }}
              />
            </div>

            <p className="my-3 heading lh-lg text-justify">
              ADADA Digital is an experienced Creative agency with deep
              experience in direct response website design, application
              development, SEO/SEM, Social media, Marketing & Advertising,
              Video, interactive and all digital design as well as UX/UI for all
              devices.
            </p>

            <motion.div
              className="social-icons d-flex justify-content-center justify-content-md-start gap-3 my-4"
              variants={scaleUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <a
                href="https://www.facebook.com/adadadigital/"
                className="d-flex justify-content-center align-items-center fs-5 text-white text-decoration-none rounded"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://www.instagram.com/adadadigital/"
                className="d-flex justify-content-center align-items-center fs-5 text-white text-decoration-none rounded"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="https://au.linkedin.com/company/adada-digital"
                className="d-flex justify-content-center align-items-center fs-5 text-white text-decoration-none rounded"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </motion.div>
          </motion.div>

          {/* Company */}
          <motion.div
            className="col-12 col-md-3 my-md-4 my-0 d-flex flex-column text-center text-md-start align-items-center align-items-md-start"
            variants={fadeInUp}
            custom={0.15}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h4 className="my-4 text-white fw-bold">Company</h4>
            <ul className="list-unstyled heading">
              <li className="mb-2">About Us</li>
              <li className="mb-2">Services</li>
              <li className="mb-2">Careers</li>
              <li className="mb-2">Blog</li>
              <li className="mb-2">Awards and Recognition</li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="col-12 col-md-3 my-md-4 my-0 d-flex flex-column text-center text-md-start align-items-center align-items-md-start"
            variants={fadeInUp}
            custom={0.3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h4 className="my-4 text-white fw-bold">Services</h4>
            <ul className="list-unstyled heading">
              <li>Website Design &amp; Development</li>
              <li>UI/UX &amp; Product Design</li>
              <li>E-Commerce Development</li>
              <li>Custom Software Development</li>
              <li>SEO &amp; Digital Marketing</li>
              <li>Social Media Marketing</li>
              <li>Cloud Hosting &amp; DevOps</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="col-12 col-md-3 my-md-4 my-0 d-flex flex-column text-center text-md-start align-items-center align-items-md-start"
            variants={fadeInUp}
            custom={0.45}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h4 className="my-4 text-white fw-bold">Contact</h4>
            <ul className="list-unstyled heading">
              <li className="lh-base mb-3">
                Email:
                <br />
                <a
                  href="mailto:info@adada.com.au"
                  className="text-decoration-none"
                  style={{ color: "#bbb" }}
                >
                  info@adada.com.au
                </a>
              </li>

              <li className="lh-base mb-3">
                Phone:
                <br />
                <a
                  href="tel:+612344783432"
                  className="text-decoration-none"
                  style={{ color: "#bbb" }}
                >
                  +61 234 4783 432
                </a>
              </li>

              <li className="lh-base mb-3">
                Address:
                <br /> NSW, Sydney, Au
              </li>

              <li>Security</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Second Row */}
      <motion.div
        className="w-100 text-center"
        style={{ background: "#0a0b0f" }}
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="container">
          <div className="row justify-content-between align-items-center py-4">
            <div className="col-12 col-md-6 text-center text-md-start">
              <p className="text-white heading m-0">
                &copy; {new Date().getFullYear()} ADADA DIGITAL. All rights
                reserved.
              </p>
            </div>

            {/* Country Dropdown */}
            <div className="col-12 col-md-6 text-center text-md-end mt-4 mt-md-0">
              <div className="dropdown">
                <button
                  ref={btnRef}
                  type="button"
                  className="btn btn-dark dropdown-toggle p-3 border-0 small text-white"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Australia
                </button>

                <ul className="dropdown-menu text-center">
                  <li>
                    <button className="dropdown-item" type="button">
                      Australia
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button">
                      Sri Lanka
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
