import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import ContentHeader from "./ContentHeader";
import { whatwedoData } from "../Constants/Data";
import { motion } from "framer-motion";

const WhatWeDoSection = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef(null);

  // ---- config for custom dots ----
  const TOTAL_DOTS = 5; // always show 5 dots
  const groupSize = Math.ceil(whatwedoData.length / TOTAL_DOTS); // cards per dot

  // Handle responsive behavior manually
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        // Mobile
        setSlidesToShow(1);
      } else if (width < 1024) {
        // Tablet
        setSlidesToShow(2);
      } else {
        // Desktop
        setSlidesToShow(3);
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false, // turn off default slick dots
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow, // controlled by state
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: slidesToShow === 3, // only center on desktop
    centerPadding: "0px",
    beforeChange: (_current, next) => {
      // update active dot when slide changes
      const nextGroup = Math.floor(next / groupSize);
      setActiveDot(nextGroup);
    },
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

  const handleDotClick = (index) => {
    setActiveDot(index);
    const slideIndex = index * groupSize;
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(slideIndex);
    }
  };

  return (
    <section className="what-we-do py-5">
      <div className="container">
        {/* Header reveal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
          }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <ContentHeader
            title={"Delivering Tailored Digital\nSolutions for You"}
            subtitle="What We Do"
            description="We craft digital solutions, leveraging technology and strategy to drive innovation, efficiency, and success while transforming challenges into opportunities."
            buttonPath="/explore"
          />
        </motion.div>

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
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    rotateX: 1.5,
                    rotateY: -1.5,
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 20,
                  }}
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
                          style={{ height: "100px", width: "100px" }}
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

                    {/* Back (if you later add flip CSS) */}
                    <div className="card-back rounded-4 position-absolute top-0 start-0 w-100 h-100">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-3">
                        <img
                          src={card.imgSrc}
                          className="card-img-top my-3"
                          alt={card.title}
                          style={{ height: "100px", width: "100px" }}
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

          {/* ---- Custom 5 dots ---- */}
          <div className="custom-dots d-flex justify-content-center mt-5">
            {Array.from({ length: TOTAL_DOTS }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDotClick(index)}
                className={`mx-1 custom-dot rounded-circle border-0 ${
                  activeDot === index ? "bg-white" : "bg-secondary"
                }`}
                style={{
                  width: "10px",
                  height: "10px",
                  opacity: activeDot === index ? 1 : 0.5,
                  transition: "opacity 0.2s, transform 0.2s",
                  transform: activeDot === index ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
