import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SubscribeSection from "../Components/SubscribeSection";
import HeroSection from "../Components/HeroSection";
import Image1Right from "../assets/Images/10.png";
import { servicesData } from "../Constants/Data";

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleCardExpansion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, ease: "easeOut" } },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const expandItem = {
    hidden: { opacity: 0, scale: 0.3 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <>
      <Helmet>
        <title>Services - ADADA Digital | Web Development & Digital Agency Services</title>

        <meta
          name="description"
          content="ADADA Digital Pvt Ltd is a full-service digital agency offering web development, e-commerce, mobile apps, SEO, branding, cloud, AI, and custom software solutions."
        />

        <meta
          name="keywords"
          content="
    web development company,
    digital agency,
    website design services,
    ecommerce development,
    mobile app development,
    SEO services,
    UI UX design,
    cloud hosting,
    business automation,
    custom software development,

    web development company australia,
    digital agency australia,
    website design company australia,
    ecommerce development australia,
    mobile app development australia,
    SEO services australia,
    digital marketing agency australia,
    UI UX design australia,
    branding agency australia,
    cloud devops services australia,
    custom software development australia,
    AI analytics solutions australia,
    cybersecurity services australia,
    IT consultancy australia,

    web development sydney,
    digital agency sydney,
    website designers melbourne,
    SEO company melbourne,
    mobile app developers australia,
    ecommerce website developers australia,
    software development company australia,
    startup digital agency australia
  "
        />

        <meta name="author" content="ADADA Digital Pty Ltd" />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://adada.com.au/" />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="ADADA Digital | Web Development & Digital Agency"
        />
        <meta
          property="og:description"
          content="ADADA Digital Pvt Ltd is a full-service digital agency offering web development, e-commerce, mobile apps, SEO, branding, cloud, AI, and custom software solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adada.com.au/" />
        <meta property="og:image" content="https://adada.com.au/og-image.jpg" />
        <meta property="og:site_name" content="ADADA Digital" />

        {/* Social Links */}
        <meta
          property="og:see_also"
          content="https://www.linkedin.com/company/adada-digital/"
        />
        <meta
          property="og:see_also"
          content="https://www.instagram.com/adadadigital/"
        />
        <meta
          property="og:see_also"
          content="https://www.facebook.com/adadadigital"
        />

        {/* Facebook  */}
        <meta
          property="fb:admins"
          content="https://www.facebook.com/adadadigital"
        />

        {/* Instagram */}
        <meta
          name="instagram:title"
          content="ADADA Digital | Web Development & Digital Agency"
        />
        <meta
          name="instagram:description"
          content="ADADA Digital Pvt Ltd is a full-service digital agency offering web development, e-commerce, mobile apps, SEO, branding, cloud, AI, and custom software solutions."
        />

        <meta name="instagram:site" content="@adadadigital" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ADADA Digital | Web Development & Digital Agency"
        />
        <meta
          name="twitter:description"
          content="ADADA Digital Pvt Ltd is a full-service digital agency offering web development, e-commerce, mobile apps, SEO, branding, cloud, AI, and custom software solutions."
        />
        <meta
          name="twitter:image"
          content="https://adada.com.au//twitter-image.jpg"
        />
        <meta name="twitter:site" content="@adadadigital" />
        <meta name="twitter:creator" content="@adadadigital" />

        {/* Local SEO */}
        <meta name="geo.region" content="AU" />
        <meta name="geo.placename" content="Australia" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection
        title="Tailored Digital Solutions to Elevate Your Brand"
        subtitle="Expert Digital Solutions for Growth"
        imageRight={Image1Right}
      />

      {/* Services Section */}
      <section className="py-5">
        <div className="container p-0">
          {/* Map over services data */}
          <motion.div
            variants={container}
            initial="visible"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {servicesData.map((card, index) => (
              <motion.div key={index} variants={cardItem}>
                <div className="service-card bg-transparent rounded-3 p-3 p-md-4 mb-3 w-100">
                  <div className="d-flex flex-column flex-md-row gap-3 gap-md-5 align-items-center justify-content-between">
                    {/* Left image container */}
                    <div
                      className="p-3 p-md-5 d-flex align-items-center justify-content-center"
                      style={{
                        background: "#14161D",
                        borderRadius: "15px",
                      }}
                    >
                      <img
                        src={card.image}
                        alt="left-img"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Description */}
                    <div className="service-description flex-grow-1 text-center text-md-start">
                      <h5 className="fw-bold fs-5 fs-md-3 text-white">
                        {card.title}
                      </h5>
                      <p className="card-text brand lh-base text-secondary">
                        {card.description}
                      </p>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div className="text-center text-md-end w-100 w-md-auto">
                      <motion.i
                        className={`bi highlight fs-2 fs-md-1 ${
                          expandedIndex === index
                            ? "bi-dash-square-fill"
                            : "bi-plus-square-fill"
                        }`}
                        onClick={() => toggleCardExpansion(index)}
                        style={{ cursor: "pointer" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 250,
                          damping: 20,
                        }}
                      />
                    </div>
                  </div>

                  {/* Expanded section */}
                  {expandedIndex === index && (
                    <motion.div
                      className="row p-3 align-items-center"
                      variants={expandItem}
                      initial="hidden"
                      animate="show"
                    >
                      {/* Image (optional) */}
                      {card.extraImages?.length > 0 && (
                        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                          <img
                            src={card.extraImages[0]}
                            alt="extra"
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}

                      <div
                        className={`col-12 ${
                          card.extraImages?.length > 0 ? "col-md-8" : ""
                        }`}
                      >
                        <h5 className="fw-bold text-danger">
                          {card.expanded?.title || "More Details"}
                        </h5>

                        {card.expanded?.text && (
                          <p className="card-text brand lh-base text-white">
                            {card.expanded.text}
                          </p>
                        )}

                        {card.expanded?.points?.length > 0 && (
                          <ul className="text-white mb-0">
                            {card.expanded.points.map((point, i) => (
                              <li
                                key={i}
                                className="brand lh-base text-secondary"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subscription Section */}
      <SubscribeSection />
    </>
  );
};

export default Services;
