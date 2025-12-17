import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SubscribeSection from "../Components/SubscribeSection";
import HeroSection from "../Components/HeroSection";
import Image1Right from "../assets/Images/11.png";
import { blogs } from "../Constants/Data";
import BlogCarousel from "../Components/BlogCarousel";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blogs - ADADA Digital | Web Development & Digital Agency Services</title>

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
        title="Insights, Tips, and Trends for Digital Success"
        subtitle="Expert Insights and Tips for Success"
        imageRight={Image1Right}
      />

      {/* Blog Section */}
      <section className="blog py-5">
        <div className="container p-0">
          <motion.div
            className="row py-5 align-items-end mb-3"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="col-md-6 text-md-start text-center">
              <motion.h5
                className="text-danger text-uppercase fs-4 brand"
                variants={fadeInUp}
              >
                OUR BLOGS
              </motion.h5>
              <motion.h2
                className="text-white display-5 fw-bold"
                variants={fadeInUp}
              >
                Insights and Trends from Our Experts
              </motion.h2>
            </div>

            <div className="col-md-6 brand text-md-start text-white px-5">
              <motion.p className="fs-5" variants={fadeInUp}>
                Stay informed with emerging digital trends, expert insights, and
                strategies shared by our knowledgeable industry professionals
              </motion.p>
              <motion.div variants={scaleUp}>
                <i
                  className="bi bi-arrow-left-circle text-danger me-4"
                  style={{ fontSize: "2.5rem", cursor: "pointer" }}
                  data-bs-target="#blogsCarousel"
                  data-bs-slide="prev"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                ></i>
                <i
                  className="bi bi-arrow-right-circle text-danger"
                  style={{ fontSize: "2.5rem", cursor: "pointer" }}
                  data-bs-target="#blogsCarousel"
                  data-bs-slide="next"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                ></i>
              </motion.div>
            </div>
          </motion.div>

          <BlogCarousel blogs={blogs} interval={10000} />
        </div>
      </section>

      {/* Subscription Section */}
      <SubscribeSection />
    </>
  );
};

export default Blog;
