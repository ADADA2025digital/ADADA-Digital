import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { motion, MotionConfig } from "framer-motion";

const BlogCarousel = ({ blogs }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCardsPerSlide = () => {
    if (windowWidth >= 992) return 3; // Desktop
    if (windowWidth >= 768) return 2; // Tablet
    return 1; // Mobile
  };

  const blogGroups = blogs.reduce((acc, blog, index) => {
    if (index % getCardsPerSlide() === 0) acc.push([]);
    acc[acc.length - 1].push(blog);
    return acc;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="blogsCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="10000"
      >
        <div className="carousel-inner">
          {blogGroups.map((group, groupIndex) => (
            <motion.div
              className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
              key={groupIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="row justify-content-center align-items-stretch">
                {group.map((blog, blogIndex) => (
                  <motion.div
                    className={`col-${12 / getCardsPerSlide()} mb-4 d-flex`}
                    key={blogIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + 0.1 * blogIndex,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <BlogCard {...blog} className="flex-fill h-100" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
};

export default BlogCarousel;
