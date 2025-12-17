import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import ContactUs from "../Components/ContactUs";
import SubscribeSection from "../Components/SubscribeSection";
import IntroSection from "../Components/IntroSection";

import { contactData } from "../Constants/Data";

// Variants for animation
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - ADADA Digital | Web Development & Digital Agency Services</title>

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

      <section className="contact pt-5">
        <div className="container">
          <div className="row py-5 mt-5 justify-content-center">
            {/* Intro Section */}
            <motion.div
              className="col-12"
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <IntroSection
                title="Contact us"
                subtitle="We're Here to Help with All Your Needs"
                description="Need assistance or have inquiries? Our dedicated team is here to offer guidance and support whenever required. Whether seeking details, exploring services, or discussing new projects, feel free to connect. We ensure a smooth, hassle-free experience tailored to your needs. Reach out today, and expect a prompt response!"
              />
            </motion.div>

            {/* Cards */}
            <motion.div
              className="row justify-content-center p-0"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              {contactData.map((card) => (
                <motion.div
                  key={card.id}
                  variants={fadeInUp}
                  className="col-md-4 mb-4 d-flex justify-content-center align-items-center"
                >
                  <div
                    className="card custom-card bg-transparent rounded-4 p-4 w-100 d-flex flex-column justify-content-center align-items-center"
                    style={{ border: "1px solid #2f2e2e" }}
                  >
                    <img
                      src={card.imgSrc}
                      className="card-img-top"
                      alt={card.title}
                      style={{
                        height: "50px",
                        width: "50px",
                        marginBottom: "15px",
                      }}
                    />

                    <div className="card-body text-center">
                      <h4 className="card-title lh-base text-white fw-bold">
                        {card.title}
                      </h4>

                      <p className="card-text lh-base heading text-white text-center">
                        <a
                          href={card.link}
                          target={card.id === 3 ? "_blank" : undefined}
                          rel={
                            card.id === 3 ? "noopener noreferrer" : undefined
                          }
                          className="text-white text-decoration-none"
                        >
                          {card.description}
                        </a>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <ContactUs />

        {/* Subscription Section */}
        <SubscribeSection />
      </section>
    </>
  );
};

export default Contact;
