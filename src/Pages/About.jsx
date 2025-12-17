import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Slider from "react-slick";

import { cardData, data1, data2, images, Skills } from "../Constants/Data";

import SubscribeSection from "../Components/SubscribeSection";
import ImageComponent from "../Components/ImageComponent";
import IntroSection from "../Components/IntroSection";
import InfoCard from "../Components/Infocard";
import WhyWorkWithUsCard from "../Components/WhyWorkWithUsCard";
import WhyWorkWithUs from "../Components/WhyWorkWithUs";
import TeamSlider from "../Components/Team";

import Logo from "../assets/Images/logo.png";
import Infomodel from "../assets/Images/13.png";
import Teamworking from "../assets/Images/2.png";
import Collaboration from "../assets/Images/3.png";
import Teamdiscussion from "../assets/Images/4.png";

const sectionReveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const imgItem = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const headerReveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const gridStagger = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const logoItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const slideRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const mobileSliderSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  centerMode: false,
  centerPadding: "0",
};

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - ADADA Digital | Web Development & Digital Agency Services</title>

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

      {/* About Us */}
      <section className="about-us mt-5 py-md-5 p-0">
        <div className="container">
          <motion.div
            className="row my-md-5 my-0 py-5 d-flex align-items-center justify-content-center"
            style={{
              background:
                "url(../Images/Grid.png) no-repeat center center/cover",
            }}
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* Intro block reveal */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="col-12"
            >
              <IntroSection
                title="About Us"
                subtitle="Discover Our Story, Mission, and Vision for the Future"
                description="At Adada Digital, we are committed to delivering cutting-edge digital solutions that empower businesses in a fast-paced digital world. With a team of innovators, tech experts, and strategic thinkers, we craft tailored digital strategies that align seamlessly with your brand’s vision and objectives."
              />
            </motion.div>

            {/* Image gallery with stagger + hover */}
            <motion.div
              className="row image-gallery d-flex justify-content-center flex-wrap gap-4 mt-4"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* Left image */}
              <motion.div
                className="auto col-auto"
                variants={imgItem}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <ImageComponent
                  alt="Team working"
                  src={Teamworking}
                  className="gallery-image rounded-3"
                />
              </motion.div>

              {/* Center image with subtle floating loop */}
              <motion.div
                className="auto col-auto"
                variants={imgItem}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0, 3, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="d-none d-md-flex"
                >
                  <ImageComponent
                    alt="Collaboration"
                    src={Collaboration}
                    className="rounded-3 position-relative top-50 gallery-image center-image"
                  />
                </motion.div>
              </motion.div>

              {/* Right image */}
              <motion.div
                className="auto col-auto d-none d-md-flex"
                variants={imgItem}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <ImageComponent
                  alt="Team discussion"
                  src={Teamdiscussion}
                  className="gallery-image rounded-3"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="my-md-5 my-0 pt-md-5 pt-0">
        <div className="container p-0">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <WhyWorkWithUs />
          </motion.div>

          <div className="row my-md-5 my-2">
            <div className="col-12 text-center">
              {/* Desktop / Tablet view: normal grid */}
              <motion.div
                className="row d-none d-md-flex"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                {Skills.map((card) => (
                  <motion.div
                    key={card.id}
                    variants={cardItem}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 20,
                    }}
                    className="col-12 col-md-6 col-lg-4 mb-2 mb-md-4 d-flex"
                  >
                    <WhyWorkWithUsCard
                      imgSrc={card.imgSrc}
                      title={card.title}
                      description={card.description}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile view: slider */}
              <motion.div
                className="d-md-none mb-5 pb-5"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <Slider {...mobileSliderSettings}>
                  {Skills.map((card) => (
                    <motion.div
                      key={card.id}
                      variants={cardItem}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 20,
                      }}
                      className="px-2 mb-3"
                    >
                      <WhyWorkWithUsCard
                        imgSrc={card.imgSrc}
                        title={card.title}
                        description={card.description}
                      />
                    </motion.div>
                  ))}
                </Slider>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="row mb-4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            style={{ overflow: "visible" }}
          >
            <div className="col-12 text-center">
              <motion.div
                className="theme-background py-5 px-md-4 px-2 d-flex align-items-center rounded-4 justify-content-between w-100 text-white flex-wrap position-relative"
                style={{ textAlign: "justify", minHeight: 140, zIndex: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="row w-100 m-0">
                  <div
                    className="col-md-1 d-flex align-items-center justify-content-center rounded-3 mb-3 mb-md-0"
                    style={{ background: "#000" }}
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0, 2, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <img
                        src={Logo}
                        className="p-3"
                        alt="logo"
                        style={{ width: "120px" }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className="col-md-11 d-flex align-items-center justify-content-center mt-3 mt-md-0"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <p className="m-0">
                      At Adada Digital, we build modern, high performance
                      digital solutions that help businesses grow in a fast
                      evolving digital world. With a skilled team of designers,
                      developers, and strategists, we craft tailored digital
                      experiences that align perfectly with your vision and
                      goals, ensuring lasting impact and success.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="row my-md-5 my-3"
            variants={headerReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="col-12 text-center">
              <h5 className="text-uppercase heading my-4 text-danger fw-bold custom-letter-spacing">
                Our Values
              </h5>
              <h2 className="text-white fs-2 fw-bold">
                Guiding Principles <br />
                That Drive Our Success
              </h2>
            </div>
          </motion.div>

          {/* Desktop / Tablet: normal grid */}
          <motion.div
            className="row d-none d-md-flex"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {cardData.map((card) => (
              <motion.div
                key={card.id}
                variants={cardItem}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="col-12 col-md-4 d-flex"
              >
                <WhyWorkWithUsCard
                  imgSrc={card.imgSrc}
                  title={card.title}
                  description={card.description}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: slider like TeamSlider */}
          <motion.div
            className="d-md-none"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <Slider {...mobileSliderSettings}>
              {cardData.map((card) => (
                <motion.div
                  key={card.id}
                  variants={cardItem}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="px-2"
                >
                  <WhyWorkWithUsCard
                    imgSrc={card.imgSrc}
                    title={card.title}
                    description={card.description}
                  />
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-5">
        <div className="container p-0">
          <motion.div
            className="row my-md-5 my-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="col-12 text-center">
              <h5 className="text-uppercase heading my-4 text-danger fw-bold custom-letter-spacing px-3 p-md-0">
                Our Trusted Clients
              </h5>
              <h2 className="text-white fs-2 fw-bold px-3 p-md-0">
                Empowering <span className="outline">Global Businesses</span>{" "}
                with <br /> Reliable Payment Solutions
              </h2>

              <motion.div
                className="client-logos d-none d-flex flex-wrap justify-content-center align-items-center gap-5 mt-5"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {images.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`Client Logo ${index + 1}`}
                    className="client-logo img-fluid"
                    style={{ maxHeight: "150px", objectFit: "contain" }}
                    variants={logoItem}
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                ))}
              </motion.div>

              {/* Logo marquee */}
              <div className="client-logos d-flex d-md-none position-relative overflow-hidden py-5">
                <div className="logo-wrapper d-flex">
                  {[...images, ...images].map((imageSrc, index) => (
                    <img
                      src={imageSrc}
                      alt={`Client Logo ${index + 1}`}
                      key={`client-${index}`}
                      className="client-logo mx-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="row my-md-5 my-0 py-5">
            <motion.div
              className="col-md-4 d-flex align-items-center justify-content-center"
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <InfoCard data={data1} />
            </motion.div>

            <motion.div
              className="col-md-4 text-center info-image my-md-0 my-5 d-flex align-items-center justify-content-center position-relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              animate={{ y: [0, -6, 0, 4, 0] }}
              transition={{
                duration: 0.45,
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <img
                src={Infomodel}
                alt="Person holding a laptop"
                className="img-fluid"
                style={{ objectFit: "cover", height: "650px" }}
              />
            </motion.div>

            <motion.div
              className="col-md-4 d-flex align-items-center justify-content-center"
              variants={slideRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <InfoCard data={data2} />
            </motion.div>
          </div>
        </div>
      </section>

      <TeamSlider />

      {/* Subscription Section */}
      <SubscribeSection />
    </>
  );
};

export default About;
