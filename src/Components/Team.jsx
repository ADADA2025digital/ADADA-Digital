import React from "react";
import Slider from "react-slick";
import ContentHeader from "./ContentHeader";
import { team } from "../Constants/Data";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const TeamSlider = ({ purpose }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
    mobileFirst: true,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
    ],
  };

  return (
    <section className="what-we-do mb-5 pb-5">
      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <ContentHeader
            title="Meet the team behind our creative and technological excellence"
            subtitle="Meet Our Team"
            description="Meet our team of talented designers, developers, and strategists who bring ideas to life with precision and creativity. With deep expertise in technology and problem-solving, we work together to deliver digital solutions that help businesses grow and succeed."
          />
        </motion.div>

        <div className="row align-items-center justify-content-center">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="w-100"
          >
            <Slider {...settings}>
              {team.map((member, index) => (
                // Each slide
                <motion.div
                  key={index}
                  variants={cardItem}
                  className="d-flex justify-content-center align-items-center my-0 px-3"
                >
                  <motion.div
                    className="custom-card rounded-4 bg-transparent w-100"
                    style={{ border: "1px solid rgb(47, 46, 46)" }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  >
                    <div className="team-card w-100 h-100 position-relative">
                      <div className="card-body text-center p-3">
                        <motion.img
                          src={member.imgSrc}
                          className="card-img-top mb-3 rounded-3"
                          alt={member.title}
                          style={{ height: "250px", objectFit: "cover" }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35 }}
                        />
                        <h4 className="card-title lh-base text-white fw-bold">
                          {member.title}
                        </h4>
                        <p className="card-text heading lh-base text-white text-center">
                          {member.position}
                        </p>

                        <div className="social-icons d-flex justify-content-center gap-4 my-4">
                          <motion.a
                            href={member.email}
                            className="d-flex justify-content-center align-items-center fs-5 text-white text-decoration-none rounded"
                            aria-label="Email"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="bi bi-envelope-fill"></i>
                          </motion.a>
                          <motion.a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="d-flex justify-content-center align-items-center fs-5 text-white text-decoration-none rounded"
                            aria-label="LinkedIn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="bi bi-linkedin"></i>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSlider;
