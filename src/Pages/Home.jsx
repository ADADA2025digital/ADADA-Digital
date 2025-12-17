import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  blogs,
  statsData,
  howitworksData,
  reviewData,
  whatwedoData,
  images,
  whyworkwithusData,
  portfolioData,
} from "../Constants/Data";
import ContentHeader from "../Components/ContentHeader";
import WhyWorkWithUs from "../Components/WhyWorkWithUs";
import FeatureCard from "../Components/FeatureCard";
import ButtonGlobal from "../Components/Button";
import PortfolioSection from "../Components/PortfolioSection";
import ContactUs from "../Components/ContactUs";
import SubscribeSection from "../Components/SubscribeSection";
import BlogCarousel from "../Components/BlogCarousel";
import WhatWeDoSection from "../Components/WhatWeDoSection";
import design1 from "../assets/Images/design1.png";
import design2 from "../assets/Images/design2.png";

function Home() {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const animatedDotsContainer = document.querySelector(".animated-dots");

    function createDot() {
      const dot = document.createElement("div");
      dot.classList.add("dot");

      const isMobile = window.innerWidth <= 768;
      const maxWidth = isMobile ? window.innerWidth * 0.8 : window.innerWidth;
      const maxHeight = isMobile
        ? window.innerHeight * 0.8
        : window.innerHeight;
      const dotSize = isMobile ? 5 : 5;

      const startX = Math.random() * maxWidth;
      const startY = Math.random() * maxHeight;

      const endX = Math.random() * maxWidth;
      const endY = Math.random() * maxHeight;

      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.left = `${startX}px`;
      dot.style.top = `${startY}px`;

      animatedDotsContainer.appendChild(dot);

      dot.animate(
        [
          { transform: `translate(0, 0)`, opacity: 1 },
          {
            transform: `translate(${endX - startX}px, ${endY - startY}px)`,
            opacity: 1,
          },
        ],
        {
          duration: isMobile ? 40000 : 80000,
          iterations: Infinity,
        }
      );
    }

    function updateDots() {
      animatedDotsContainer.innerHTML = "";

      const isMobile = window.innerWidth <= 768;
      const numDots = isMobile ? 30 : 60;

      for (let i = 0; i < numDots; i++) {
        createDot();
      }
    }

    updateDots();

    window.addEventListener("resize", updateDots);

    return () => {
      animatedDotsContainer.innerHTML = "";
      window.removeEventListener("resize", updateDots);
    };
  }, []);

  // Reusable variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const fadeFromLeft = {
    hidden: { opacity: 0, x: -32, rotate: -2 },
    show: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeFromRight = {
    hidden: { opacity: 0, x: 32, rotate: 2 },
    show: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
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

  return (
    <>
      <Helmet>
        <title>ADADA Digital | Web Development & Digital Agency Services</title>

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

      <div className="container-fluid p-0">
        {/* Hero Section */}
        <section className="hero-section vh-100 d-flex flex-column align-items-center text-white position-relative pt-5">
          {/* background dots */}
          <motion.div
            className="p-1 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="animated-dots overflow-hidden position-absolute top-0 start-0 w-100 h-100 z-1" />
          </motion.div>

          {/* right hero image*/}
          <motion.div
            className="position-relative web-development-badge d-flex justify-content-end mt-5"
            variants={fadeFromRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.img
              src={design2}
              alt="Hero"
              className="img-animation img-fluid rounded"
              animate={{ y: [0, -8, 0, 6, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* center */}
          <motion.div
            className="container px-3 px-md-0 text-center z-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.span className="text-danger heading fs-4" variants={fadeUp}>
              Innovative Solutions for a Digital World
            </motion.span>

            <motion.h1 className="my-4 display-3 fw-bold" variants={fadeUp}>
              Transforming Ideas into <br /> Digital Reality
            </motion.h1>

            <motion.p className="mb-3 fs-5 heading" variants={fadeUp}>
              Bringing your vision to life with innovative digital solutions,
              combining creativity and
              <br />
              technology to achieve outstanding results for your business.
            </motion.p>

            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            >
              <ButtonGlobal text="Explore Now" to="/about" />
            </motion.div>

            {/* scroll indicator */}
            <motion.div
              className="scroll-button-container position-absolute d-block mx-auto my-0"
              onClick={handleScroll}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div
                className="scroll-button cursor border border-2 rounded-4"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="wheel d-block bg-white position-relative border border-2"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="arrows d-block arrow1 mt-1"></span>
                <span className="arrows d-block arrow2"></span>
                <span className="arrows d-block arrow3"></span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* left hero image */}
          <motion.div
            className="position-relative ui-ux-badge d-flex justify-content-start"
            variants={fadeFromLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.img
              src={design1}
              alt="Hero"
              className="img-animation img-fluid rounded position-relative"
              animate={{ y: [0, 10, 0, -6, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* social rail */}
          <motion.div
            className="social-container d-none d-md-block flex-column align-items-center position-absolute z-2"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.45 } }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="vertical-text mb-3 fs-6">Follow us on</div>
            <div className="vertical-border my-0 mx-auto"></div>
            <div className="d-flex flex-column align-items-center">
              <motion.a
                href="https://www.facebook.com/adadadigital/"
                className="social-icon fs-4 my-2"
                whileHover={{ scale: 1.1 }}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/adadadigital/"
                className="social-icon fs-4 my-2"
                whileHover={{ scale: 1.1 }}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </motion.a>
              <motion.a
                href="https://au.linkedin.com/company/adada-digital"
                className="social-icon fs-4 my-2"
                whileHover={{ scale: 1.1 }}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </motion.a>
            </div>
          </motion.div>

          {/* rotating circle text */}
          <motion.div
            className="circle dark-red-bg position-absolute rounded-circle d-flex align-items-center justify-content-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5 },
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="rotating-text position-absolute align-items-center text-white"></div>
          </motion.div>
        </section>

        {/* Review Section */}
        <section className="py-md-5 py-3 mt-md-5 mt-0">
          <div className="container">
            <motion.div
              className="mt-5 d-flex justify-content-center"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="works-header text-center text-white my-3 px-3 px-md-0">
                <motion.h5
                  className="text-danger fw-bold text-uppercase heading custom-letter-spacing my-4"
                  variants={fadeUp}
                >
                  OUR TRUSTED CLIENTS
                </motion.h5>
                <motion.h2 className="fw-bold lh-base" variants={fadeUp}>
                  Driving{" "}
                  <span className="highlight">Digital Transformation</span>{" "}
                  <br />
                  Through Smart Technology
                </motion.h2>
              </div>
            </motion.div>

            {/* Logo marquee */}
            <div className="client-logos d-flex position-relative overflow-hidden py-5">
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

            {/* Testimonials */}
            <div className="row theme-background rounded-4 p-2 p-md-4">
              <motion.div
                className="d-flex flex-md-row flex-column review-row"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                {reviewData.map((stat) => (
                  <div
                    key={stat.id}
                    className="col-md-4 d-flex justify-content-center align-items-stretch p-md-3 p-0"
                  >
                    <motion.div
                      variants={fadeUp}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="text-white text-center d-flex flex-column justify-content-between align-items-center w-100 h-100 p-md-4 p-3 review-card"
                    >
                      <p className="mb-4">"{stat.description}"</p>
                      <p className="mb-md-4 mb-2 heading fw-bold fst-italic">
                        -{stat.client}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why work with us section */}
        <section className="whywork py-5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.45 } }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <WhyWorkWithUs />
            </motion.div>

            {/* ✅ Mobile Slider */}
            <div className="d-block d-md-none mt-4">
              <Slider {...mobileSliderSettings}>
                {whyworkwithusData.map((card, index) => (
                  <div key={index} className="px-1">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 20,
                      }}
                      className="d-flex"
                    >
                      <FeatureCard
                        imageSrc={card.imageSrc}
                        title={card.title}
                        text={card.text}
                        gradientBackground={card.gradientBackground}
                        customClass={card.customClass}
                        colClass={card.colClass}
                        backgroundImage={card.backgroundImage}
                      />
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* ✅ Desktop Grid (your current layout) */}
            <div className="d-none d-md-block">
              {/* Row 1 */}
              <motion.div
                className="row mb-3"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                {whyworkwithusData.slice(0, 3).map((card, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className={`${card.colClass} d-flex mb-3`}
                  >
                    <FeatureCard {...card} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Row 2 */}
              <motion.div
                className="row"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                {whyworkwithusData.slice(3).map((card, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className={`${card.colClass} d-flex mb-3`}
                  >
                    <FeatureCard {...card} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* What we do section */}
        <WhatWeDoSection />

        {/* Portfolio Section */}
        <PortfolioSection data={portfolioData.slice(0, 2)} />

        {/* How its work */}
        <section className="work py-5">
          <div className="container">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="row mt-5 justify-content-center">
                <div className="works-header col-md-8 text-center text-white">
                  <motion.h5
                    className="text-danger fw-bold text-uppercase heading custom-letter-spacing my-4"
                    variants={fadeUp}
                  >
                    How It Works
                  </motion.h5>
                  <motion.h2 className="fw-bold" variants={fadeUp}>
                    Turning Your Ideas into
                    <br /> Powerful Digital Solutions
                  </motion.h2>
                  <motion.p
                    className="py-3 heading lh-base"
                    style={{ color: "#a79d9d" }}
                    variants={fadeUp}
                  >
                    From strategy to execution, we follow a proven, transparent
                    process that transforms your business vision into scalable,
                    secure, and high-performance digital products.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* ✅ Mobile Slider */}
            <div className="d-block d-md-none mt-4">
              <Slider {...mobileSliderSettings}>
                {howitworksData.map((card) => (
                  <div key={card.id} className="px-1">
                    <motion.div
                      className="custom-card rounded-4 p-4"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 20,
                      }}
                    >
                      <div className="pb-3 d-flex justify-content-between align-items-center">
                        <motion.img
                          src={card.imgSrc}
                          className="card-img-left"
                          alt="Left"
                          style={{ height: "70px", width: "auto" }}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35 }}
                        />

                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <h6 className="fw-bold text-white mt-2">Stage</h6>
                          <span
                            className="text-white fw-bold"
                            style={{
                              padding: "0.4rem 0.9rem",
                              borderRadius: "8px",
                              background: "rgba(255,255,255,0.15)",
                              display: "inline-block",
                            }}
                          >
                            {card.id}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h5 className="py-1 text-white fw-bold">
                          {card.title}
                        </h5>
                        <p className="heading text-white">{card.description}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* ✅ Desktop Grid */}
            <div className="row d-none d-md-flex mt-4">
              {howitworksData.map((card) => (
                <div key={card.id} className="col-md-4 mb-4">
                  <motion.div
                    className="custom-card rounded-4 p-4"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  >
                    <div className="pb-3 d-flex justify-content-between align-items-center">
                      <motion.img
                        src={card.imgSrc}
                        className="card-img-left"
                        alt="Left"
                        style={{ height: "70px", width: "auto" }}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35 }}
                      />
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <h6 className="fw-bold text-white mt-2">Stage</h6>
                        <span
                          className="text-white fw-bold"
                          style={{
                            padding: "0.4rem 0.9rem",
                            borderRadius: "8px",
                            background: "rgba(255,255,255,0.15)",
                            display: "inline-block",
                          }}
                        >
                          {card.id}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h5 className="py-1 text-white fw-bold">{card.title}</h5>
                      <p className="heading text-white">{card.description}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats py-5">
          <div className="container p-0">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="row theme-background rounded-4 p-md-4 p-0 g-md-4 g-2 stats-row">
                {statsData.map((stat, index) => (
                  <div key={stat.id} className="col-12 col-md-6 col-lg-4">
                    <motion.div
                      variants={item}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 20,
                      }}
                      className="p-md-4 p-2 h-100 stats-card"
                    >
                      <div className="h-100">
                        <div className="d-flex gap-3 flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start my-2">
                          <motion.h3
                            className="my-2 text-white"
                            variants={item}
                          >
                            {stat.title}
                          </motion.h3>

                          <motion.h5
                            className="fw-semibold text-white m-md-2 m-0"
                            variants={item}
                          >
                            {stat.heading.split("\n").map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </motion.h5>
                        </div>

                        <motion.p
                          className="text-white heading py-2 text-center text-md-start"
                          variants={item}
                        >
                          {stat.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Section */}
        {/* <section className="blog-section pt-5">
          <div className="container">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.div variants={fadeUp}>
                <ContentHeader
                  title={"Insights and Trends\nfrom Our Experts"}
                  subtitle="Our Blogs"
                  description="Stay informed with expert insights on emerging digital trends. Our specialists deliver actionable strategies to help you adapt, innovate, and thrive in today's fast-changing business landscape."
                  buttonPath="/blog"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4 }}
            >
              <BlogCarousel blogs={blogs} />
            </motion.div>
          </div>
        </section> */}

        {/* Contact Section */}
        {/* <ContactUs /> */}

        {/* Subscription Section */}
        <SubscribeSection />
      </div>
    </>
  );
}

export default Home;
