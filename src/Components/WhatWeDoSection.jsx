// WhatWeDoSection.jsx
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import ContentHeader from "./ContentHeader";
import { whatwedoData } from "../Constants/Data";
import { motion } from "framer-motion";

const WhatWeDoSection = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) setSlidesToShow(1);
      else if (width < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slick settings (NO dots, NO default arrows)
  const settings = {
    dots: false, // ✅ removed
    arrows: false, // ✅ removed (we use custom arrows)
    infinite: true,
    speed: 1000,
    slidesToShow,
    slidesToScroll: 1, // ✅ smooth shift (all visible cards move together)
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    accessibility: true,
    beforeChange: (_current, next) => setCurrentSlide(next),
    afterChange: (idx) => setCurrentSlide(idx),
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section className="what-we-do py-5">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <ContentHeader
            title={"Delivering Tailored Digital\nSolutions for You"}
            subtitle="What We Do"
            description="We craft digital solutions, leveraging technology and strategy to drive innovation, efficiency, and success while transforming challenges into opportunities."
            buttonPath="/services"
          />
        </motion.div>

        {/* Slider */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <Slider ref={sliderRef} {...settings}>
            {whatwedoData.map((card, index) => (
              <motion.div
                key={index}
                variants={item}
                className="px-3 d-flex justify-content-center align-items-stretch"
              >
                <motion.div
                  className="purpose-card card border-0 shadow bg-transparent text-white w-100"
                  tabIndex={currentSlide === index ? 0 : -1}
                  aria-hidden={currentSlide === index ? "false" : "true"}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="card-inner position-relative h-100">
                    {/* Front */}
                    <div className="card-front rounded-4 w-100 h-100 position-absolute">
                      <div className="card-body text-center d-flex flex-column align-items-center justify-content-center p-3">
                        <motion.img
                          src={card.imgSrc}
                          className="card-img-top my-3"
                          alt={card.title}
                          width={100}
                          height={100}
                          style={{ objectFit: "contain" }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35 }}
                        />

                        <h4 className="card-title lh-base fw-bold">
                          {card.title}
                        </h4>
                        <p className="card-text brand lh-base text-center">
                          {card.description}
                        </p>

                        <motion.div
                          className="icon-container d-flex justify-content-center mt-4"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <img
                            src={card.iconSrc}
                            className="icon card-img-top rounded"
                            alt="Arrow Icon"
                            style={{ height: "60px" }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="card-back rounded-4 position-absolute top-0 start-0 w-100 h-100">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-3">
                        <img
                          src={card.imgSrc}
                          className="card-img-top my-3"
                          alt={card.title}
                          width={100}
                          height={100}
                          style={{ objectFit: "contain" }}
                        />

                        <h4 className="card-title lh-base fw-bold">
                          {card.title}
                        </h4>
                        <p className="card-text brand lh-base text-center">
                          {card.description}
                        </p>
                        <div className="icon-container d-flex justify-content-center mt-4">
                          <img
                            src={card.iconSrc}
                            className="icon card-img-top rounded"
                            alt="Arrow Icon"
                            style={{ height: "60px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </Slider>

          {/* ✅ Bottom Arrow Controls (Bootstrap Icons) */}
          <div className="slider-arrows d-flex justify-content-center gap-2 mt-4">
            <button
              type="button"
              className="btn bg-transparent border-0 text-danger"
              aria-label="Previous"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <i className="bi bi-arrow-left-square text-danger fs-1"></i>
            </button>

            <button
              type="button"
              className="btn bg-transparent border-0 text-danger"
              aria-label="Next"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <i className="bi bi-arrow-right-square text-danger fs-1"></i>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
